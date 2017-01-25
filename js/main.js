(function() {
    $(document).ready(init)
})()

function init() {
    $('.cat-img').click(handleImgClick)
}

function handleImgClick() {
    var name = $(this).attr('name')
    var catDetail = $('.cat-details[name='+name+']')
    var catDetails = $('.cat-details')

    var colorImg = $('.cat-img[name='+name+']').find('img.color')
    var colorImgs = $('.cat-img').find('img.color')

    var wasHidden = catDetail.css('display') == 'none'

    colorImgs.removeClass('active')
    catDetails.hide()

    if (wasHidden) {
        colorImg.addClass('active')
        catDetail.show()
    }
}