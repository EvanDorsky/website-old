(function() {
    $(document).ready(init)
})()

function init() {
    $('.cat-img').click(function() {
        console.log($('.cat-details').find(['name="yowona"']))
    })
}