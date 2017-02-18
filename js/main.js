(function() {
    $(document).ready(init)
})()

var focusTime = 450 // ms
var hideDetails

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
        colorImg.addClass('active')

        // this breaks courses
        catDetail.insertBefore($(catDetail).parent().find('div:first-child'))

        catDetail.show()
        catDetail.css({'height': 'auto'})
        catHeight = catDetail.height()
        catDetail.css({
            'height': 0,
            'transition': 'padding '+focusTime+'ms, opacity '+focusTime+'ms, height '+focusTime+'ms'
        })
        setTimeout(function() {
            catDetail.addClass('active')
            catDetail.css({
                'height': catHeight + 16
            })
        }, 5)
    }
}
