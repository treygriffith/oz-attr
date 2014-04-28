oz-attr
========

Attribute tags for [Oz](http://github.com/treygriffith/oz).


Installation
------------

Using component:

```
$ component install treygriffith/oz-attr
```

Using a script tag (UMD compatible)

```
<script src="./oz-attr.min.js"></script>
```

Usage
-----

Bind an attribute's value to the value of the named property.

Notation:

```html
<img oz-attr="src:photo.jpg;class:avatar"></div>
```

Example:

```javascript
var context = {
  imageUrl: "https://www.google.com/images/srpr/logo11w.png"
};
```

```html
<img oz-attr="src:imageUrl" src="https://www.google.com/images/srpr/logo11w.png">
```


License
-------
MIT
