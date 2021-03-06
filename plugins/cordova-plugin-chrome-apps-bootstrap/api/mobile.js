// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var cordova = require('cordova');
var channel = require('cordova/channel');
var runtime = require('cordova-plugin-chrome-apps-runtime.runtime');
var app_runtime = require('cordova-plugin-chrome-apps-runtime.app.runtime');
var storage = require('cordova-plugin-chrome-apps-storage.Storage');
var backgroundapp = require('cordova-plugin-background-app.backgroundapp');
// Make sure the "isChromeApp" var gets set before replaceState().
require('cordova-plugin-chrome-apps-common.helpers');

exports.fgWindow = window;
exports.bgWindow = null;
exports.eventIframe = null;

// Add a sticky Cordova event to indicate that the background page has
// loaded, and the JS has executed.
exports.onBackgroundPageLoaded = channel.createSticky('onBackgroundPageLoaded');

// List of functions that will fire events. If none, then onLaunched will be fired.
exports.lifeCycleEventFuncs = [];

function createBgChrome() {
  return {
    __proto__: window.chrome,
    app: {
      __proto__: window.chrome.app,
      window: {
        __proto__: window.chrome.app.window,
        current: function() { return null; }
      }
    }
  };
}

function restoreWindowOpen(context) {
  // Remove's InAppBrowser's override when present.
  delete context.open;
}

exports.fgInit = function() {
  // Add a deviceready listener that initializes the Chrome wrapper.
  channel.onCordovaReady.subscribe(function() {
    // Delay bootstrap until all deviceready event dependancies fire, minus DOMContentLoaded, since that one is purposely being blocked by bootstrap
    // We do this delay so that plugins have a chance to initialize using the bridge before we load the chrome app background scripts/event page
    var channelsToWaitFor = channel.deviceReadyChannelsArray.filter(function(c) { return c.type !== 'onDOMContentLoaded'; });
    channel.join(function() {
      // If background app plugin is included, handle event to switch from
      // background execution
      document.addEventListener('resume', function() {
        if (backgroundapp.resumeType == 'normal-launch') {
          fireOnLaunched();
        }
      });

      // Undo the clobber of window.open by InAppBrowser
      restoreWindowOpen(exports.fgWindow);

      // Assigning innerHTML here has the side-effect of removing the
      // chrome-content-loaded script tag. Removing it is required so that the
      // page re-writting logic does not try and re-evaluate it.
      document.body.innerHTML = '<iframe src="chromebgpage.html" style="display:none">';

      exports.eventIframe = document.body.firstChild;
    }, channelsToWaitFor);
  });
};

exports.bgInit = function(bgWnd) {
  exports.bgWindow = bgWnd;

  bgWnd.addEventListener('unload', function() {
    throw new Error('Chrome background page has been unloaded! Likely caused by <iframe> being detached from the <body>');
  });

  bgWnd.navigator = navigator;
  require('cordova/modulemapper').mapModules(bgWnd.window);

  // Undo the clobber of window.open by InAppBrowser
  restoreWindowOpen(exports.bgWindow);
  bgWnd.chrome = createBgChrome();
  exports.fgWindow.opener = exports.bgWindow;

  var manifestJson = runtime.getManifest();
  function onLoad() {
    bgWnd.removeEventListener('load', onLoad, false);
    setTimeout(function() {
      exports.onBackgroundPageLoaded.fire();
      fireLifecycleEvents(manifestJson);
    }, 0);
  }
  bgWnd.addEventListener('load', onLoad, false);

  var urlBase = location.href.replace(/\/plugins\/.*?$/, '/');
  var urlPrefix = cordova.platformId == 'android' ? urlBase : '';
  bgWnd.history.replaceState(null, null, runtime.getURL('_generated_background_page.html'));

  var scripts = manifestJson.app.background.scripts;
  var toWrite = '';
  for (var i = 0, src; src = scripts[i]; ++i) {
    toWrite += '<script src="' + urlPrefix + encodeURI(src) + '"></script>\n';
  }
  bgWnd.document.write(toWrite);
};

function fireLifecycleEvents(manifestJson) {
  var version = manifestJson.version;

  storage.internal.get(['version', 'shutdownClean'], function(data) {
    var installDetails;
    if (data.version != version) {
      if (data.version) {
        installDetails = {
          reason: "update",
          previousVersion: data.version
        };
      } else {
        installDetails = {
          reason: "install"
        };
      }
    }
    // If it was not cleanly shut down, and it was not just installed, then
    // this is a restart.
    var restart = !data.shutdownClean && data.version;

    // Clear the clean shutdown flag on startup
    storage.internal.set({'version': version, 'shutdownClean': false}, function() {
      // Add some additional startup events if the app was not shut down properly
      // last time, or if it has been upgraded, or if it has just been intstalled.
      if (restart) {
        app_runtime.onRestarted._fireInternal();
      }
      if (installDetails) {
        runtime.onInstalled._fireInternal(installDetails);
      }
      // If launching for UI, fire onLaunched event
      if (backgroundapp.resumeType) {
        fireOnLaunched();
      }
      for (var i = 0; i < exports.lifeCycleEventFuncs.length; ++i) {
        exports.lifeCycleEventFuncs[i]();
      }
      exports.lifeCycleEventFuncs = null;
    });
  });
}

function fireOnLaunched() {
  // Execute this only once.
  fireOnLaunched = function() {};
  var app_window = require('cordova-plugin-chrome-apps-bootstrap.app.window');
  // Don't fire if create() has already been called.
  if (app_window.current()) {
    return;
  }
  app_runtime.onLaunched._fireInternal();
  // Log a warning if no window is created after a bit of a grace period.
  setTimeout(function() {
    if (!app_window.current()) {
      console.warn('No page loaded because chrome.app.window.create() was never called.');
    }
  }, 500);
}

