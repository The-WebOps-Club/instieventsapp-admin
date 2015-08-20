cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-background-app/backgroundapp.js",
        "id": "cordova-plugin-background-app.backgroundapp",
        "clobbers": [
            "cordova.backgroundapp"
        ]
    },
    {
        "file": "plugins/cordova-plugin-blob-constructor-polyfill/Blob.js",
        "id": "cordova-plugin-blob-constructor-polyfill.blob-constructor",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-bootstrap/api/app/window.js",
        "id": "cordova-plugin-chrome-apps-bootstrap.app.window",
        "clobbers": [
            "chrome.app.window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-bootstrap/api/mobile.js",
        "id": "cordova-plugin-chrome-apps-bootstrap.mobile.impl",
        "clobbers": [
            "chrome.mobile.impl"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-bootstrap/api/helpers/ChromeExtensionURLs.android.js",
        "id": "cordova-plugin-chrome-apps-bootstrap.helpers.ChromeExtensionURLs"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-i18n/i18n.js",
        "id": "cordova-plugin-chrome-apps-i18n.I18n",
        "clobbers": [
            "chrome.i18n"
        ]
    },
    {
        "file": "plugins/cordova-plugin-customevent-polyfill/customEvent.js",
        "id": "cordova-plugin-customevent-polyfill.customEvent",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryEntry.js",
        "id": "cordova-plugin-file.DirectoryEntry",
        "clobbers": [
            "window.DirectoryEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/DirectoryReader.js",
        "id": "cordova-plugin-file.DirectoryReader",
        "clobbers": [
            "window.DirectoryReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Entry.js",
        "id": "cordova-plugin-file.Entry",
        "clobbers": [
            "window.Entry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/File.js",
        "id": "cordova-plugin-file.File",
        "clobbers": [
            "window.File"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileEntry.js",
        "id": "cordova-plugin-file.FileEntry",
        "clobbers": [
            "window.FileEntry"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileError.js",
        "id": "cordova-plugin-file.FileError",
        "clobbers": [
            "window.FileError"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileReader.js",
        "id": "cordova-plugin-file.FileReader",
        "clobbers": [
            "window.FileReader"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileSystem.js",
        "id": "cordova-plugin-file.FileSystem",
        "clobbers": [
            "window.FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadOptions.js",
        "id": "cordova-plugin-file.FileUploadOptions",
        "clobbers": [
            "window.FileUploadOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileUploadResult.js",
        "id": "cordova-plugin-file.FileUploadResult",
        "clobbers": [
            "window.FileUploadResult"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/FileWriter.js",
        "id": "cordova-plugin-file.FileWriter",
        "clobbers": [
            "window.FileWriter"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Flags.js",
        "id": "cordova-plugin-file.Flags",
        "clobbers": [
            "window.Flags"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/LocalFileSystem.js",
        "id": "cordova-plugin-file.LocalFileSystem",
        "clobbers": [
            "window.LocalFileSystem"
        ],
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/Metadata.js",
        "id": "cordova-plugin-file.Metadata",
        "clobbers": [
            "window.Metadata"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/ProgressEvent.js",
        "id": "cordova-plugin-file.ProgressEvent",
        "clobbers": [
            "window.ProgressEvent"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems.js",
        "id": "cordova-plugin-file.fileSystems"
    },
    {
        "file": "plugins/cordova-plugin-file/www/requestFileSystem.js",
        "id": "cordova-plugin-file.requestFileSystem",
        "clobbers": [
            "window.requestFileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/resolveLocalFileSystemURI.js",
        "id": "cordova-plugin-file.resolveLocalFileSystemURI",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/android/FileSystem.js",
        "id": "cordova-plugin-file.androidFileSystem",
        "merges": [
            "FileSystem"
        ]
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystems-roots.js",
        "id": "cordova-plugin-file.fileSystems-roots",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-file/www/fileSystemPaths.js",
        "id": "cordova-plugin-file.fileSystemPaths",
        "merges": [
            "cordova"
        ],
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open",
            "window.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "id": "cordova-plugin-statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-xhr-blob-polyfill/xhr-blob.js",
        "id": "cordova-plugin-xhr-blob-polyfill.xhr-blob",
        "merges": [
            "window"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "id": "cordova-plugin-chrome-apps-common.events",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "id": "cordova-plugin-chrome-apps-common.errors"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "id": "cordova-plugin-chrome-apps-common.stubs"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "id": "cordova-plugin-chrome-apps-common.helpers"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-storage/storage.js",
        "id": "cordova-plugin-chrome-apps-storage.Storage",
        "clobbers": [
            "chrome.storage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/api/app/runtime.js",
        "id": "cordova-plugin-chrome-apps-runtime.app.runtime",
        "clobbers": [
            "chrome.app.runtime"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/api/runtime.js",
        "id": "cordova-plugin-chrome-apps-runtime.runtime",
        "clobbers": [
            "chrome.runtime"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/lib/CryptoJS/sha256.js",
        "id": "cordova-plugin-chrome-apps-runtime.CryptoJS-sha256"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/lib/CryptoJS/enc-base64-min.js",
        "id": "cordova-plugin-chrome-apps-runtime.CryptoJS-enc-base64-min"
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-background-app": "2.0.2",
    "cordova-plugin-blob-constructor-polyfill": "1.0.2",
    "cordova-plugin-chrome-apps-bootstrap": "2.0.7",
    "cordova-plugin-chrome-apps-i18n": "2.0.1",
    "cordova-plugin-chrome-apps-navigation": "1.0.3",
    "cordova-plugin-crosswalk-webview": "1.2.0",
    "cordova-plugin-customevent-polyfill": "1.0.5-dev",
    "cordova-plugin-file": "2.0.0",
    "cordova-plugin-inappbrowser": "1.0.0",
    "cordova-plugin-network-information": "1.0.0",
    "cordova-plugin-statusbar": "1.0.0",
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-xhr-blob-polyfill": "1.0.3",
    "org.chromium.cca-hooks": "0.0.0",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-storage": "1.0.4",
    "cordova-plugin-chrome-apps-runtime": "1.1.1"
}
// BOTTOM OF METADATA
});