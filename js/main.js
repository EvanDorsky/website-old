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
    // make all the selections and variable definitions
    var name = $(this).attr('name')
    var photoBox = $(this).parent()
    var catImg = $(this)

    var catDetail = $('.cat-details[name='+name+']')
    var catAll = $('.cat-details')
    var catDetails = $('.cat-details')

    var allImgs = $('.cat-img').find('img')
    var allImgsHere = $('.cat-img[name='+name+']').find('img')
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

    // reset everything
    whiteOuts.removeClass('opaque')
    colorImgsAll.removeClass('active')
    openImgsAll.removeClass('active')
    catTitlesAll.removeClass('active')
    catDetails.removeClass('active')
    allImgs.removeClass('large')
    $('.right-pad').remove()
    catDetails.css({'height': 0})
    
    // It looks like this code isn't necessary?
    // (height: 0 may be enough to hide the element)

    // clearTimeout(hideDetails)
    // hideDetails = setTimeout(function() {
    //     catDetails.hide()
    // }, focusTime)

    // TODO: The scrollOffset calculation is wrong if there was an open cat-img
    // to the left of the cat-img that's opening now, because the width
    // of the cat-img to the left changes *after* this calculation is made

    // Calculate the width of each element by calculating the aspect ratio
    // and multiplying by the height of the image that was clicked

    // This will work because if the clicked image has already been expanded,
    // no scrolling will happen
    var scrollOffset = 0
    for (var i=0; $(catImgsHere[i]).attr('name') != name; i++)
        scrollOffset += $(catImgsHere[i]).width()
    scrollOffset -= photoBox.scrollLeft()

    // TODO: Only remove the right-pad element at the right time --
    // otherwise there's jank when i.e. opening a cat-img in a
    // photo-box that already has another active cat-img (because the 
    // padding element briefly disappears, then reappears)

    // The conditional should be effectively "only remove the right-pad
    // element if all the cat-img elements in this photo-box will be 
    // closed after this function is done"

    // TODO: Also, when right-pad is going to be removed, first animate
    // a scroll back to the furthest right position that would be possible
    // without right-pad (to prevent jumping or getting stuck in an impossible
    // scroll position)

    // TODO: The right-pad element has to be sized correctly, or the 
    // max scroll position limited (I prefer the first) to prevent the
    // ability to scroll a ridiculous distance to the right

    // Only show if it wasn't showing -- and isn't a course
    if (wasHidden && !photoBox.parent().hasClass('courses')) {
        whiteOuts.addClass('opaque')
        whiteOut.removeClass('opaque')
        catTitlesAll.addClass('active')
        photoBox.append('<div class="right-pad"></div>')
        $('html').velocity('scroll', {
            container: photoBox,
            axis: 'x',
            duration: 1.2*Math.abs(scrollOffset),
            offset: scrollOffset
        })
        if (openImg) {
          openImg.addClass('active')
        }
        allImgsHere.addClass('large')
        colorImg.addClass('active')

        handleDetailDisplay(catDetail)
    }
}

function add(x, y) {
    return x+y
}

// Calculate the margin-right of the last child in a row-wrapping
// flexbox so that the last row of items flows the same as 
// all the previous rows
// (In retrospect, it probably would have been better to just 
// do this with dummy elements)
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
