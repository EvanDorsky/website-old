#!/usr/bin/env node

(() => {
    const pug = require('pug'),
    fs = require('fs')

    var basicHandler = (err, data) => {
        if (err) console.error(err)
    }

    var processJson = (data, callback) => {
        data = JSON.parse(data)
        data.dirRoot = '.'

        fs.readdir('img/film', (err, files) => {
            data.categories.film.entries = files
                .filter(file => !file.includes('_'))
                .map(function(file) {
                    return {name: file.split('.')[0]}
                })

            callback(data)
        })
    }

    module.exports = {
        renderIndex: () => {
            fs.readFile('js/coolstuff.json', 'utf8', (err, data) => {
                basicHandler(err, data)

                processJson(data, (processed) => {
                    var indexPage = pug.compileFile('pug/index.pug')

                    fs.writeFile('index.html', indexPage(processed), basicHandler)
                })
            })
        },
        renderCats: () => {
            fs.readFile('js/coolstuff.json', 'utf8', (err, data) => {
                basicHandler(err, data)

                processJson(data, (processed) => {
                    for (cat in processed.categories) {
                        console.log('cat')
                        console.log(cat)
                        var catPage = pug.compileFile('pug/cat.pug')

                        fs.writeFile('categories/'+cat+'.html', catPage({
                            dirRoot: '..',
                            name: cat,
                            cat: processed.categories[cat]
                        }), basicHandler)
                    }
                })

            })
        }
    }

    if (!module.parent) {
        var func = process.argv[2]
        if (func in module.exports)
            module.exports[func]()
        else
            console.error('Invalid call')
    }
})()