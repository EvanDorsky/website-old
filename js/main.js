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

    console.log('==============')
    catAll.each(function(i) {
        el = catAll[i]
        if ($(el).height()){
            console.log($(el).attr('name')+' '+$(el).height())
        }
    })
    // reset everything
    whiteOuts.removeClass('opaque')
    colorImgsAll.removeClass('active')
    catTitlesAll.removeClass('active')
    catDetails.removeClass('active')
    setTimeout(function() {
        catDetails.removeClass('visible')
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
        catDetail.addClass('active visible')
        catAll.each(function(i) {
            el = catAll[i]
            if ($(el).height()){
                console.log($(el).attr('name')+' '+$(el).height())
            }
        })
        setTimeout(function() {
            console.log('After settling=======')
            catAll.each(function(i) {
                el = catAll[i]
                if ($(el).height()){
                    console.log($(el).attr('name')+' '+$(el).height())
                }
            })
        }, 1000)
    }
}