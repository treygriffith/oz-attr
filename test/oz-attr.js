
var Oz = require('oz');
var attrTag = require('oz-attr');
var assert = require('assert');
var children = require('children');

Oz.use(attrTag);

describe('Rendering', function(){

  it('should set attributes without changing context', function(){
    var el = children(Oz.render('<div oz-attr-class="name"><p oz-text="text"></p></div>', { name: 'Tobi', text: 'something'}));
    assert('Tobi' == el[0].className);
  });

  it('should render multiple attributes in one element', function(){
    var el = children(Oz.render('<div oz-attr-class="name" oz-attr-data-active="active"></div>', { name: 'Tobi', active: true})); 
    assert('Tobi' == el[0].className);
    assert('true' == el[0].getAttribute('data-active'));
  });

});

describe("Updating", function() {

  it('should update multiple attributes in one element', function(){
    var template = Oz('<div oz-attr-class="name" oz-attr-data-active="active"></div>');
    var el = children(template.render({ name: 'Tobi', active: true}));
    assert('Tobi' == el[0].className);
    assert('true' == el[0].getAttribute('data-active'));

    template.update({ name: 'Paul', active: false});
    assert('Paul' == el[0].className);
    assert('false' == el[0].getAttribute('data-active'));
  });

});
