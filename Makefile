index.html : pug/index.pug pug/coolstuff.json stylesheets/style.css
	cp node_modules/zepto/dist/zepto.min.js js
	pug pug/index.pug -O pug/coolstuff.json -o .

stylesheets/style.css : stylus/*
	stylus stylus/style.styl -o stylesheets
