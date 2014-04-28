
;(function(){

/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("matthewp~attr@master", function (exports, module) {
/*
** Fallback for older IE without get/setAttribute
 */
function fetch(el, attr) {
  var attrs = el.attributes;
  for(var i = 0; i < attrs.length; i++) {
    if (attr[i] !== undefined) {
      if(attr[i].nodeName === attr) {
        return attr[i];
      }
    }
  }
  return null;
}

function Attr(el) {
  this.el = el;
}

Attr.prototype.get = function(attr) {
  return (this.el.getAttribute && this.el.getAttribute(attr))
    || (fetch(this.el, attr) === null ? null : fetch(this.el, attr).value);
};

Attr.prototype.set = function(attr, val) {
  if(this.el.setAttribute) {
    this.el.setAttribute(attr, val);
  } else {
    fetch(this.el, attr).value = val;
  }

  return this;
};

Attr.prototype.has = function(attr) {
  return (this.el.hasAttribute && this.el.hasAttribute(attr))
    || fetch(this.el, attr) !== null;
};

module.exports = function(el) {
  return new Attr(el);
};

module.exports.Attr = Attr;

});

require.register("oz-attr", function (exports, module) {
/**
 * Module dependencies
 */
var attr = require("matthewp~attr@master");

/**
 * Export plugin
 */
module.exports = function (Oz) {
  Oz.tag('oz-attr', render);
};

module.exports.render = render;

/**
 * Render an attribute
 * template: <img oz-attr="src:mysrc;class:myclass" />
 * context: { mysrc: "something.jpg", myclass: "photo" }
 * output: <img src="something.jpg" class="photo" />
 */

function render (el, ctx, prop, scope, next) {
  var self = this;

  this.split(prop, function (name, val) {
    val = val != null ? self.get(ctx, val) : null;

    if(attr(el).get(name) !== val) attr(el).set(name, val);
  });

  next();
}

});

if (typeof exports == "object") {
  module.exports = require("oz-attr");
} else if (typeof define == "function" && define.amd) {
  define([], function(){ return require("oz-attr"); });
} else {
  this["oz-attr"] = require("oz-attr");
}
})()
