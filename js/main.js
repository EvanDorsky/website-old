(function() {
    $(document).ready(init)
})()

var focusTime = 450 // ms
var hideDetails

function init() {
    var loc = window.location.href.split('/')

    $('.cat-img').click(handleImgClick)

    if (loc.includes('categories')) {
        setTimeout(lastChildMargin, 20)
        window.onresize = lastChildMargin
    }
}

function handleDetailDisplay(detail) {
    // this breaks courses
    detail.insertBefore($(detail).parent().find('div:first-child'))

    detail.show()
    detail.css({'height': 'auto'})
    catHeight = detail.height()
    detail.css({
        'height': 0,
        'transition': 'padding '+focusTime+'ms, opacity '+focusTime+'ms, height '+focusTime+'ms'
    })
    setTimeout(function() {
        detail.addClass('active')
        detail.css({
            'height': catHeight + 16
        })
    }, 5)
}

function handleImgClick() {
    var name = $(this).attr('name')
    var photoBox = $(this).parent()
    var catImg = $(this)

    var catDetail = $('.cat-details[name='+name+']')
    var catAll = $('.cat-details')
    var catDetails = $('.cat-details')

    var colorImg = $('.cat-img[name='+name+']').find('img.color')
    var openImg = $('.cat-img[name='+name+']').find('img.open')
    var colorImgsAll = $('.cat-img').find('img.color')
    var openImgsAll = $('.cat-img').find('img.open')

    var wasHidden = !colorImg.hasClass('active')

    if (wasHidden)
        catDetails = catDetails.filter(function(i) {
            return $(catDetails[i]).attr('name') != name
        })

    var catTitlesAll = $('.cat-title')

    var catImgsHere = photoBox.find('.cat-img')

    var whiteOuts = $('.whiteout')
    var whiteOut = catImg.find('.whiteout')

    var scrollOffset = 0
    for (var i=0; $(catImgsHere[i]).attr('name') != name; i++)
        scrollOffset += $(catImgsHere[i]).width()
    scrollOffset -= photoBox.scrollLeft()
    // defined variables

    // reset everything
    whiteOuts.removeClass('opaque')
    colorImgsAll.removeClass('active')
    openImgsAll.removeClass('active')
    catTitlesAll.removeClass('active')
    catDetails.removeClass('active')
    catDetails.css({'height': 0})
    
    clearTimeout(hideDetails)
    hideDetails = setTimeout(function() {
        catDetails.hide()
    }, focusTime)

    // only show if it wasn't showing -- and isn't a course
    if (wasHidden && !photoBox.parent().hasClass('courses')) {
        whiteOuts.addClass('opaque')
        whiteOut.removeClass('opaque')
        catTitlesAll.addClass('active')
        $('html').velocity('scroll', {
            container: photoBox,
            axis: 'x',
            duration: 1.2*Math.abs(scrollOffset),
            offset: scrollOffset
        })
        if (openImg) {
          openImg.addClass('active')
        }
        colorImg.addClass('active')

        handleDetailDisplay(catDetail)
    }
}

function add(x, y) {
    return x+y
}

function lastChildMargin() {
    var lastCat = $('.cat-img:last-child')

    var photoWidth = $('.photo-box').width()

    var photoRows = []
    var row = 0
    var lastOffset = 0
    $('.cat-img').each(function() {
        var offset = $(this).offset().left
        if (offset <= lastOffset)
            row++

        if (row in photoRows)
            photoRows[row].push($(this).width())
        else
            photoRows[row] = [$(this).width()]
        lastOffset = offset
    })

    var lastRowCount = photoRows[row].length

    var maxRowWidth = Math.max.apply(null, photoRows.map(function(a) {
        return a.reduce(add)
    }))

    var catFits = false
    if (lastRowCount == 1 && row > 0) {
        var secLastRowWidth = photoRows[row-1].reduce(add)
        if (secLastRowWidth + photoRows[row][lastRowCount-1] > photoWidth)
            catFits = false
        else
            catFits = true
    }

    if (!catFits) {
        var lastWidth = photoRows.pop().reduce(add)
        var margin = maxRowWidth - lastWidth

        lastCat.css({
            'margin-right': margin
        })
    } else
        lastCat.css({
            'margin-right': 0
        })
}
