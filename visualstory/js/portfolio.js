$(document).ready(function() {
    /* 포트폴리오 탭메뉴 구분에 따라 보이게 */
    $('.sec-portfolio__tabpanel').hide();
    $('.sec-portfolio__tabpanel').eq(0).show();
    $('.sec-portfolio__tabbutton').on('click', function() {
        var index = $('.sec-portfolio__tabbutton').index(this);
        $('.sec-portfolio__tabpanel').hide();
        $('.sec-portfolio__tabpanel').eq(index).fadeIn(800);
    });
});