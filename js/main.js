(function() {
    $(document).ready(init)
})()

function init() {
    $('.cat-img').click(handleImgClick)
}

function handleImgClick() {
    var name = $(this).attr('name')
    var photoBox = $(this).parent()
    var catImg = $(this)

    var catDetail = $('.cat-details[name='+name+']')
    var catAll = $('.cat-details')
    var catDetails = $('.cat-details')

    var wasHidden = !catDetail.hasClass('active')

    if (wasHidden)
        catDetails = catDetails.filter(function(i) {
            return $(catDetails[i]).attr('name') != name
        })

    var colorImg = $('.cat-img[name='+name+']').find('img.color')
    var colorImgsAll = $('.cat-img').find('img.color')

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
    catTitlesAll.removeClass('active')
    catDetails.removeClass('active')
    catDetails.css({'height': 0})
    // ***this makes things go away if you click too fast***
    setTimeout(function() {
        catDetails.hide()
    }, 300)

    // only show if it wasn't showing
    if (wasHidden) {
        whiteOuts.addClass('opaque')
        whiteOut.removeClass('opaque')
        catTitlesAll.addClass('active')
        $('html').velocity('scroll', {
            container: photoBox,
            axis: 'x',
            duration: Math.abs(scrollOffset),
            offset: scrollOffset
        })
        colorImg.addClass('active')
        catDetail.show()
        catDetail.css({'height': 'auto'})
        catHeight = catDetail.height()
        catDetail.css({
            'height': 0,
            'transition': 'padding 300ms, opacity 300ms, height 300ms'
        })
        setTimeout(function() {
            catDetail.addClass('active')
            catDetail.css({
                'height': catHeight + 16
            })
        }, 5)
    }
}