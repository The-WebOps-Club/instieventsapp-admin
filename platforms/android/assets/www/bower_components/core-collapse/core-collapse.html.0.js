

  Polymer('core-collapse', Polymer.mixin({

    /**
     * Fired when the `core-collapse`'s `opened` property changes.
     *
     * @event core-collapse-open
     */

    /**
     * Fired when the target element has been resized as a result of the opened
     * state changing.
     *
     * @event core-resize
     */

    /**
     * The target element that will be opened when the `core-collapse` is
     * opened. If unspecified, the `core-collapse` itself is the target.
     *
     * @attribute target
     * @type Object
     * @default null
     */
    target: null,

    /**
     * If true, the orientation is horizontal; otherwise is vertical.
     *
     * @attribute horizontal
     * @type boolean
     * @default false
     */
    horizontal: false,

    /**
     * Set opened to true to show the collapse element and to false to hide it.
     *
     * @attribute opened
     * @type boolean
     * @default false
     */
    opened: false,

    /**
     * Collapsing/expanding animation duration in second.
     *
     * @attribute duration
     * @type number
     * @default 0.33
     */
    duration: 0.33,

    /**
     * If true, the size of the target element is fixed and is set
     * on the element.  Otherwise it will try to
     * use auto to determine the natural size to use
     * for collapsing/expanding.
     *
     * @attribute fixedSize
     * @type boolean
     * @default false
     */
    fixedSize: false,

    /**
     * By default the collapsible element is set to overflow hidden. This helps
     * avoid element bleeding outside the region and provides consistent overflow
     * style across opened and closed states. Set this property to true to allow
     * the collapsible element to overflow when it's opened.
     *
     * @attribute allowOverflow
     * @type boolean
     * @default false
     */
    allowOverflow: false,

    created: function() {
      this.transitionEndListener = this.transitionEnd.bind(this);
    },

    ready: function() {
      this.target = this.target || this;
    },

    domReady: function() {
      this.async(function() {
        this.afterInitialUpdate = true;
      });
    },

    attached: function() {
      this.resizerAttachedHandler();
    },

    detached: function() {
      if (this.target) {
        this.removeListeners(this.target);
      }
      this.resizableDetachedHandler();
    },

    targetChanged: function(old) {
      if (old) {
        this.removeListeners(old);
      }
      if (!this.target) {
        return;
      }
      this.isTargetReady = !!this.target;
      this.classList.toggle('core-collapse-closed', this.target !== this);
      this.toggleOpenedStyle(false);
      this.horizontalChanged();
      this.addListeners(this.target);
      // set core-collapse-closed class initially to hide the target
      this.toggleClosedClass(true);
      this.update();
    },

    addListeners: function(node) {
      node.addEventListener('transitionend', this.transitionEndListener);
    },

    removeListeners: function(node) {
      node.removeEventListener('transitionend', this.transitionEndListener);
    },

    horizontalChanged: function() {
      this.dimension = this.horizontal ? 'width' : 'height';
    },

    openedChanged: function() {
      this.update();
      this.fire('core-collapse-open', this.opened);
    },

    /**
     * Toggle the opened state.
     *
     * @method toggle
     */
    toggle: function() {
      this.opened = !this.opened;
    },

    setTransitionDuration: function(duration) {
      var s = this.target.style;
      s.transition = duration ? (this.dimension + ' ' + duration + 's') : null;
      if (duration === 0) {
        this.async('transitionEnd');
      }
    },

    transitionEnd: function() {
      if (this.opened && !this.fixedSize) {
        this.updateSize('auto', null);
      }
      this.setTransitionDuration(null);
      this.toggleOpenedStyle(this.opened);
      this.toggleClosedClass(!this.opened);
      this.asyncFire('core-resize', null, this.target);
      this.notifyResize();
    },

    toggleClosedClass: function(closed) {
      this.hasClosedClass = closed;
      this.target.classList.toggle('core-collapse-closed', closed);
    },

    toggleOpenedStyle: function(opened) {
      this.target.style.overflow = this.allowOverflow && opened ? '' : 'hidden';
    },

    updateSize: function(size, duration, forceEnd) {
      this.setTransitionDuration(duration);
      this.calcSize();
      var s = this.target.style;
      var nochange = s[this.dimension] === size;
      s[this.dimension] = size;
      // transitonEnd will not be called if the size has not changed
      if (forceEnd && nochange) {
        this.transitionEnd();
      }
    },

    update: function() {
      if (!this.target) {
        return;
      }
      if (!this.isTargetReady) {
        this.targetChanged();
      }
      this.horizontalChanged();
      this[this.opened ? 'show' : 'hide']();
      this.notifyResize();
    },

    calcSize: function() {
      return this.target.getBoundingClientRect()[this.dimension] + 'px';
    },

    getComputedSize: function() {
      return getComputedStyle(this.target)[this.dimension];
    },

    show: function() {
      this.toggleClosedClass(false);
      // for initial update, skip the expanding animation to optimize
      // performance e.g. skip calcSize
      if (!this.afterInitialUpdate) {
        this.transitionEnd();
        return;
      }
      if (!this.fixedSize) {
        this.updateSize('auto', null);
        var s = this.calcSize();
        if (s == '0px') {
          this.transitionEnd();
          return;
        }
        this.updateSize(0, null);
      }
      this.async(function() {
        this.updateSize(this.size || s, this.duration, true);
      });
    },

    hide: function() {
      this.toggleOpenedStyle(false);
      // don't need to do anything if it's already hidden
      if (this.hasClosedClass && !this.fixedSize) {
        return;
      }
      if (this.fixedSize) {
        // save the size before hiding it
        this.size = this.getComputedSize();
      } else {
        this.updateSize(this.calcSize(), null);
      }
      this.async(function() {
        this.updateSize(0, this.duration);
      });
    }

  }, Polymer.CoreResizer));

