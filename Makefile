index.html : pug/index.pug stylesheets/style.css
	pug pug/index.pug -o .

stylesheets/style.css : stylus/*
	stylus stylus/style.styl -o stylesheets
