$(document).ready(function() {
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        centeredSlides: true,
        slidesPerView: 'auto',
        loop: true,
        spaceBetween: 5

    });
    $(".img-box").hover(function() {
        $(this).find(".img-title").velocity("stop").velocity("transition.slideUpIn", { duration: 150 });
    }, function() {
        $(this).find(".img-title").velocity("stop").velocity("transition.slideDownOut", { duration: 150 });
    })

})
