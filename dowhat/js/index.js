$(document).ready(function() {
    $(window).on('load', function() {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var headerHeight = $('.header').height() + (2 * ($('.header').css('padding-top').slice(0, 2)));
        console.log($('.header').height() + '/ ' + (2 * ($('.header').css('padding-top').slice(0, 2))));

        var moviePaddingTop = ((windowHeight - headerHeight + 10) / windowWidth) * 100;

        $('.intro').css({
            paddingTop : headerHeight + 'px'
        });

        $('.intro__area-movie').css({
            paddingTop : moviePaddingTop + '%'
        });

    });

    /* 이용후기 슬라이더 */
    var reviewSlider = $('.slider-review .slider-review__list');
    var sliderBtn = $('.slider-review .button-slider-arrow');
    var reviewSlide = $('.slider-review .slider-review__item'); // 큰 이용후기 슬라이드에서 쓰임
    var currentCount = 0;
    var nextCount = 0;
    var slideLength = Math.ceil($('.slider-review .slider-review__item').length / 4);

    sliderBtn.click(function() {
        if ($(this).hasClass('button-slider-arrow--left')) {
            moveSlide(currentCount, 'left');
        } else if ($(this).hasClass('button-slider-arrow--right')) {
            moveSlide(currentCount, 'right');
        }
    });

    reviewSlide.hover(function() {
        $(this).find('.slider-review__desc').addClass('view');
    }, function() {
        $(this).find('.slider-review__desc').removeClass('view');
    });

    function moveSlide(currentIndex, direction) {
        var currentSlider = reviewSlider;
        if (direction === 'left') {
            nextCount = currentIndex - 1;
            if (nextCount < 0) {
                nextCount = slideLength;
            }
            currentSlider.css({
                transform: 'translate(-' + (25 * nextCount) + '%, 0)',
            });
        } else if (direction === 'right') {
            nextCount = currentIndex + 1;
            if (nextCount > slideLength) {
                nextCount = 0;
            }
            currentSlider.css({
                transform: 'translate(-' + (25 * nextCount) + '%, 0)',
            });
        } else {
            alert('잘못된 동작입니다');
            return;
        }
        currentCount = nextCount;
    }

    /* 이용후기 큰 슬라이더 */
    var reviewSliderBig = $('.slider-review--big');
    var reviewSliderBigBtn = $('.slider-review--big .button-slider-arrow');
    var reviewSlideBig = $('.slider-review--big .slider-review__item');
    var currentCountBig = 0;
    var nextCountBig = 0;
    var sliderBigLength = $('.slider-review--big .slider-review__item').length; // 6

    reviewSliderBigBtn.on('click', function() {
        if ($(this).hasClass('button-slider-arrow--left')) {    
            moveSliderBig(currentCountBig, 'left');
        } else if ($(this).hasClass('button-slider-arrow--right')) {
            moveSliderBig(currentCountBig, 'right');
        }
    });

    function moveSliderBig(currentIndexBig, directionBig) {
        if (directionBig === 'left') {            
            if (currentIndexBig <= 0) {
                nextCountBig = sliderBigLength - 1;
            } else {
                nextCountBig = currentIndexBig - 1;
            }
            reviewSlideBig.eq(currentIndexBig).animate({
                left: '100%',
                zIndex: '10'
            });
            reviewSlideBig.eq(nextCountBig).css({
                left: '-100%',
                zIndex: '10'
            }).stop().animate({
                left: '0',
                zIndex: '11'
            }, 500);
        } else if (directionBig === 'right') {            
            if (currentIndexBig >= sliderBigLength - 1) {
                nextCountBig = 0;
            } else {
                nextCountBig = currentIndexBig + 1;
            }
            reviewSlideBig.eq(currentIndexBig).animate({
                left: '-100%',
                zIndex: '10'
            });
            reviewSlideBig.eq(nextCountBig).css({
                left: ' 100%',
                zIndex: '10'
            }).stop().animate({
                left: '0',
                zIndex: '11'
            }, 500);
        } else {
            alert('잘못된 동작입니다');
        }

        changeSliderBigText(nextCountBig);
        currentCountBig = nextCountBig;
    }


    // 슬라이드 클릭시 큰 슬라이더 화면에 띄움
    var slideBigWidth = 0;
    var slideBigHeight = 0;
    var slideBigIndex = 0;

    reviewSlide.on('click', function () {
        slideBigIndex = reviewSlide.index(this);
        currentCountBig = slideBigIndex;
        reviewSliderBigShow(slideBigIndex);
    });

    function reviewSliderBigShow(index) {
        changeSliderBigText(index);

        reviewSliderBig.show();
        reviewSlideBig.css({
            left: '100%',
            zIndex: '10'
        });
        reviewSlideBig.eq(index).css({
            left: '0',
            zIndex: '11'
        });

        // 슬라이더 가로, 세로 크기 새로 할당 (안그러면 내용이 가운데로 안감)
        slideBigWidth = $('.slider-review--big .slider-review__item img').width();
        slideBigHeight = $('.slider-review--big .slider-review__item img').height();

        $('.slider-review--big .slider-review__list').css({
            width: slideBigWidth + 'px',
            height: slideBigHeight + 'px'
        });
    }

    var sliderBigTitle = '';

    function changeSliderBigText(index) {
        sliderBigTitle = reviewSlide.eq(index).find('.slider-review-desc__title').text();
        $('.slider-review__title').text(sliderBigTitle);
    }

    // 큰 슬라이더 닫기
    // $('.slider-review--big .button-slider-close, .slider-review--big').on('click', function() { // 검은 배경만 눌러도 닫히는거 추후 고려 (그냥 주석풀면 안되고 구조 바꿔야 할 듯)
    $('.slider-review--big .button-slider-close').on('click', function() {
        reviewSliderBig.hide();
    });

    // 페이지 제일 위로 가기
    $('.goto-top').on('click', function() {
        $('html, body').animate({
            scrollTop: '0'
        }, 1000);
    });

    /* 스크롤에 따라 애니메이션 동작하기 */
    // 1. 애니메이션 동작이 있는 모든 요소를 ani-element 클래스를 주어 지정이 가능하게 한다.
    // 2. 사전에 필요한 애니메이션 동작을 css에 keyframes로 정의해두고 요소에 필요한 동작 애니메이션을 ani_애니메이션이름 형식 클래스로 붙여놓는다 (ex) ani_fadeUp)
    // 3. 스크롤에 따라 애니메이션이 동작할 ani-elment 클래스 요소에 ani-elment-on 클래스를 더하고 ani_ 클래스에서 가져온 애니메이션을 동적으로 지정한다.
    // 4. ani-element 클래스 요소를 순회할 때는 ani-elment-on 클래스가 붙은 요소는 순회하지 않는다. (이미 실행한 요소는 또 실행할 필요가 없으므로)
    var winHeight = $(window).height();
    var aniElement = $('.ani-element');
    var offset = 0;
    var scrollTop = 0;
    var aniElementClassArr = null;
    var aniName = null;

    $(window).scroll(function() {
        scrollTop = $(window).scrollTop();
        aniElement = aniElement.not('.ani-element-on'); // ani-element-on 클래스가 있는 요소는 제외

        aniElement.each(function () {
            aniElementClassList = $(this).attr('class');
            offset = $(this).offset().top - winHeight;
            var thisEl = $(this);
            if ((aniElementClassList.indexOf('ani_') !== -1) && (scrollTop > offset) ) {
                aniElementClassArr = aniElementClassList.split(' ');
                for (var i in aniElementClassArr) {
                    if (aniElementClassArr[i].indexOf('ani_') !== -1) {
                        thisEl.addClass('ani-element-on');
                        aniName = aniElementClassArr[i].substr(4); // 클래스 이름에서 앞에 'ani_' 잘라내고 나머지 가져옴
                        thisEl.css({
                            animationName: aniName
                        });
                    }
                }
            }
        });
    });
});