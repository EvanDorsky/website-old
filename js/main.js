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
    var catDetails = $('.cat-details')

    var colorImg = $('.cat-img[name='+name+']').find('img.color')
    var colorImgsAll = $('.cat-img').find('img.color')

    var catImgsHere = photoBox.find('.cat-img')
    var whiteOutsHere = photoBox.find('.whiteout')

    var wasHidden = catDetail.css('display') == 'none'

    var whiteOutsAll = $('.whiteout')

    var scrollOffset = 0
    for (var i=0; $(catImgsHere[i]).attr('name') != name; i++)
        scrollOffset += $(catImgsHere[i]).width()
    // defined variables

    // reset everything
    whiteOutsAll.removeClass('opaque')
    colorImgsAll.removeClass('active')
    catDetails.hide()

    // only show if it wasn't showing
    if (wasHidden) {
        whiteOutsAll.addClass('opaque')
        whiteOutsHere.removeClass('opaque')
        photoBox.scrollLeft(scrollOffset)
        // $('html').velocity('scroll', {
        //     container: photoBox,
        //     axis: 'x',
        //     duration: 200,
        //     offset: scrollOffset+1
        // })
        colorImg.addClass('active')
        catDetail.show()
    }
}