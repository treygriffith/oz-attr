
build: components index.js
				@component build --dev

dist: components
				@component build --standalone oz-attr --name oz-attr --out dist
				@uglifyjs dist/oz-attr.js -o dist/oz-attr.min.js

components: component.json
				@component install --dev

clean:
				rm -fr build components template.js dist

test: build
				component-test phantom

.PHONY: clean oz-attr test
