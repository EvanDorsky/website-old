index.html : pug/index.pug stylesheets/style.css
	pug pug/index.pug -o .

stylesheets/style.css : stylus/style.styl
	stylus stylus/style.styl -o stylesheets
