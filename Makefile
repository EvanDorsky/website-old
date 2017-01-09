index.html : pug/index.pug pug/coolstuff.json stylesheets/style.css
	pug pug/index.pug -O pug/coolstuff.json -o .

stylesheets/style.css : stylus/*
	stylus stylus/style.styl -o stylesheets
