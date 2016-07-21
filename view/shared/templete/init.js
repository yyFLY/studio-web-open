$(function () {
    var imageUrl = getQueryStr("image");
    if (imageUrl) {
        $(document.body).css("background-image", "url('" + imageUrl + "')")
    }
});