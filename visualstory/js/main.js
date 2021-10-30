$(document).ready(function() { 
    /* 애니메이션 설정 */
    // 기존 소스는 스크롤되면 '특정 클래스를 일괄적으로' add하는 방식이었음
    // 이렇게 되었을 때 요소마다 각각 다른 동작을 하려면 css에서 같은 클래스 이름(on)의 다른 동작을 요소마다 만들어야 하는데
    // 같은 이름에 동작이 다른 것이 혼동을 줄 수 있고 다른 사람이 작업하기도 어려워 좋지 않다고 생각했음.
    // 그래서 요소마다 클래스가 적용되는 상황이 다를 것이라고 보고 통일된 형태로 하지 않았음
    // 그리고 요소가 필요한 애니메이션이 있으면 css에서 정의하고 js에서 해당 애니메이션이 동작하도록 정의했음
    var aniElements = $('.main-portfolio__item');
    var winHeight = $(window).height();
    var mainPraiseFlag = false;
    var scrollTop = 0;

    function animateElements() {
        scrollTop = $(window).scrollTop();
        var offset = $(".main-portfolio-contents .inner").offset().top - (winHeight * 0.5);

        // 매인 문구는 한번만 실행
        if (!mainPraiseFlag && scrollTop >= offset) {
            $('.main-praise--big').addClass('main-praise--big-moving');
            $('.main-praise--big').removeClass('main-praise--big-center');
            mainPraiseFlag = true;
        }

        aniElements.each(function () {
            topPos = $(this).offset().top; // 각 요소가 원래 자리해야 하는 위치 (좌표)

            // 각 요소의 위치가 창의 절반을 막 지날 때
            if (scrollTop >= (topPos - (winHeight * 0.5))) { // 현재 스크롤 탑이 각 요소의 기존 좌표에서 현재 창의 절반만큼 이전(앞)인 위치를 지날때
                $(this).addClass('ani-fade-in');
            } 
        });
    }

    $(window).scroll(function() {
        animateElements();
    });


    /* 포트폴리오 슬라이더 */
    var portfolioSlide = $('.slider-portfolio__item');
    var sliderBtn = $('.slider-portfolio__arrow');
    var currentCount = 0;
    var nextCount = 0;
    var slideLength = $('.slider-portfolio__item').length;

    sliderBtn.click(function() {
        if ($(this).hasClass('slider-portfolio__arrow--left')) {
            moveSlide(currentCount, 'left');
        } else if ($(this).hasClass('slider-portfolio__arrow--right')) {
            moveSlide(currentCount, 'right');
        }
    });

    function moveSlide(currentIndex, direction) {
        var currentSlide = portfolioSlide.eq(currentIndex);
        if (direction === 'left') {
            nextCount = currentIndex - 1;
            if (nextCount < 0) {
                nextCount = slideLength - 1;
            }
            currentSlide.animate({
                left: '100%',
                zIndex: '1'
            }, 300);
            portfolioSlide.eq(nextCount).css({
                left: '-100%',
                zIndex: '2'
            }).animate({
                left: 0
            }, 300);
        } else if (direction === 'right') {
            nextCount = currentIndex + 1;
            if (nextCount >= slideLength) {
                nextCount = 0;
            }
            currentSlide.animate({
                left: '-100%',
                zIndex: '1'
            }, 300);
            portfolioSlide.eq(nextCount).css({
                left: '100%',
                zIndex: '2'
            }).animate({
                left: 0
            }, 300);
        } else { // 예외 상황시 처리
            alert('잘못된 동작입니다');
            return;
        }
        currentCount = nextCount;
    }

    /* 슬라이더 동작 6초마다 실행 */
    var sliderStart = setInterval(function() {
        moveSlide(currentCount, 'right');
    }, 6000);

    /* 마우스 올리면 멈추고 멀어지면 다시 시작 */
    portfolioSlide.hover(function () {
        clearInterval(sliderStart);
    }, function() {
        sliderStart = setInterval(function() {
            moveSlide(currentCount, 'right');
        }, 6000);
    });
    
    $(window).on('load', function() {
        sizeResponsible();
    
        /* 맨 처음 시작시 문구 움직임 */
        var offset = $(".main-portfolio-contents .inner").offset().top;
        setTimeout(function() {
            $('html, body').animate({
                scrollTop: offset
            },1000);
        }, 500);
    });

    $(window).on('resize', function() {
        sizeResponsible();
    });

    function sizeResponsible() {
        /* 슬라이더 높이 동적으로 */
        var portfolioHeight = portfolioSlide.height();
        $('.slider-portfolio__contents').css({
            height: portfolioHeight - 1 + 'px'
        });
    }
});

