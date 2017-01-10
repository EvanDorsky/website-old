$(document).ready(function() {

    $('.cat').click(function() {
        var cat = $(this).attr('cat')
        var images = categories[cat].images
        
        $('.photo-box').empty()
        for (i in images) {
            var img = images[i]
            var imgUrl = '"img/'+cat+'/'+img+'"'
            $('.photo-box').append('<img src='+imgUrl+'/>')
        }
    })

})