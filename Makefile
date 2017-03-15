index.html: pug/*.pug js/coolstuff.json css/style.css
	node build/build.js renderIndex
	node build/build.js renderCats
	cp node_modules/zepto/dist/zepto.min.js js
	cp node_modules/velocity-animate/velocity.min.js js

css/style.css: stylus/*
	stylus stylus/style.styl -o css

.PHONY:clean img

img:
	python process_img.py

clean:
	rm -f css/*
	rm -f index.html
	rm -f **/**/*_*.jpg
	rm -f **/*_*.jpg
