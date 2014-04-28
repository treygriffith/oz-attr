/**
 * Module dependencies
 */
var attr = require('attr');

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
  var self = this
    , Oz = this.constructor;

  Oz.propSplit(prop, this.separator, this.equals, function (name, val) {
    val = val != null ? Oz.get(ctx, val, self.thisSymbol) : null;

    if(attr(el).get(name) !== val) attr(el).set(name, val);
  });

  next();
}
