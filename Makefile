index.html : pug/index.pug js/coolstuff.json stylesheets/style.css
	pug pug/index.pug -O js/coolstuff.json -o .

stylesheets/style.css: stylus/*
	stylus stylus/style.styl -o stylesheets

.PHONY:clean img

img:
	python process_img.py

clean:
	rm -f stylesheets/*
	rm -f index.html
	rm -f **/**/*_*.jpg
	rm -f **/*_*.jpg
