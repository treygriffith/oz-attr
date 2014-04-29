/**
 * Module dependencies
 */
var attr = require('attr');

/**
 * Export plugin
 */
module.exports = function (Oz) {
  Oz.tag('oz-attr-*', render);
};

module.exports.render = render;

/**
 * Render an attribute
 * template: <img oz-attr-src="mysrc" oz-attr-class="myclass" />
 * context: { mysrc: "something.jpg", myclass: "photo" }
 * output: <img src="something.jpg" class="photo" />
 */

function render (el, val, scope, raw) {
  var name = raw.name.slice('oz-attr-'.length);

  if(attr(el).get(name) !== val) {
    attr(el).set(name, val);
  }
}
