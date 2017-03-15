#!/usr/bin/env node

(function() {
    const pug = require('pug'),
    fs = require('fs')

    var basicHandler = function(err, data) {
        if (err) console.error(err)
    }

    module.exports = {
        renderIndex: function() {
            fs.readFile('js/coolstuff.json', 'utf8', function(err, data) {
                basicHandler(err, data)

                var indexPage = pug.compileFile('pug/index.pug')

                fs.writeFile('index.html', indexPage(JSON.parse(data)), basicHandler)
            })
        },
        renderCats: function() {
            fs.readFile('js/coolstuff.json', 'utf8', function(err, data) {
                data = JSON.parse(data)

                for (cat in data.categories) {
                    var catPage = pug.compileFile('pug/cat.pug')

                    fs.writeFile(cat+'.html', catPage({
                        name: cat,
                        cat: data.categories[cat]
                    }), basicHandler)
                }
            })
        }
    }

    if (!module.parent) {
        var func = process.argv[2]
        if (func in module.exports)
            module.exports[process.argv[2]]()
        else
            console.error('Invalid call')
    }
})()