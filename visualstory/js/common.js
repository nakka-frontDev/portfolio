$(document).ready(function() {
    /* 알림 모달창 */
    var cookieData = document.cookie;

    // 처음 모달창 뜰때 스크롤 막기
    if(cookieData.indexOf('vsmodal=Y') < 0) {
        $('.modal').show();
        $('html, body').addClass('not-scroll');
    } else {
        $('.modal').hide();
    }

    $('.modal-close-button, .modal__background').on('click', function() {
        $('html, body').removeClass('not-scroll');
        $('.modal').hide();
        setCookie('vsmodal', 'Y', 1);
    });

    function setCookie(name, value, expiredays) {
        var todayDate = new Date();
        todayDate.setDate( todayDate.getDate() + expiredays );
        document.cookie = name + "=" + escape(value) + "; path=/; expires=" + todayDate.toGMTString() + ";"
    }

    $(window).on('load', function() {
        // 로딩시 맨 위로 올리기
        if (current_pos !== 0) {
            $('html, body').animate({
                scrollTop: 0
            }, 1000);
        }
    })

    /* 메인 메뉴 버튼 눌렀을 때 */
    $('.header-menu__button').on('click', function() {
        $('.header .gnb .gnb-item').addClass('on'); // 참고 사이트에서 메뉴 띄워지면 처음에는 무조관 효과 활성화되게 되어있어서 동일하게 함
        if ($('.header-menu').hasClass('on')) {
            $('.header-menu').removeClass('on');
            $('.header .gnb .gnb-item').removeClass('on'); // 메뉴 효과 사라지게
        } else {
            $('.header-menu').addClass('on');
        }
    });

    /* 메인 메뉴 마우스 올렸을 때 효과 */
    $('.gnb-item').addClass('on'); // 참고 사이트에서 메뉴 띄워지면 처음에는 무조관 효과 활성화되게 되어있어서 동일하게 함
    $('.gnb-item').hover(function() { // 마우스 enter/leave라 hover가 직관적이라고 판단
        $('.gnb-item').removeClass('on');
        $(this).addClass('on');
    }, function() {
        $('.gnb-item').addClass('on'); // 참고 사이트에서 메뉴 띄워지면 처음에는 무조관 효과 활성화되게 되어있어서 동일하게 함
    });

    /* 배경 요소 스크롤시 움직임 재작업 */
    // 기존 소스는 transform을 활용 했는데 위치 이동이면 top을 직접 바꾸는 방식으로 해도 가능하지 않을까 싶어서 다른 방식 고려
    // 1. position: absolute; 와 top 속성을 활용해서 jQuery animate() 함수 이용
    // -> 움직임 시간을 원본과 똑같이 줘도 왠지 움직임이 느린 느낌. 정확하게 얘기하면 스크롤 하면 늦게 움직이기 시작하는 느낌.
    // 개발자도구 확인 결과 rendering과 painting 시간이 원본 방식에서 보다 훨씬 길었음
    // 2. jQuery css() 값 주고 요소의 css에 transition 속성 적용
    // -> 1번에 비해 많이 개선됨
    // 개발자 도구 확인 별과 rendering, painting 시간 모두 1번 보다 절반 이상 단축
    // 
    // [결론]
    // 같은 애니메이션이라도 어떤 방식으로 하느냐에 따라 최적화 방법은 달라질 수 있음.
    // jQuery animate() 함수가 jQuery CSS() 함수보다 처리해야 하는 연산이 많을 것으로 보임.
    // [참고]
    // top 속성은 positioning, 요소를 특정 위치에 둔다는 개념. '다른 요소에 영향을 끼침' -> 처리해야하는 연산 증가
    // translate(transform)은 motion, 움직이는 것. 좌표공간을 변형하여 '다른 요소에 영향을 끼치지 않고' 위치 변경 가능 -> 연산 감소
    // 그리고 translate는 CPU가 아닌 GPU에서 처리 -> 더 빠를 수 밖에 없음
    // 참고 https://mygumi.tistory.com/238

    var movingImg1 = $('.moving-background').eq(0);
    var movingImg2 = $('.moving-background').eq(1);

    var current_pos = 0;
    var movingImg1_start = movingImg1.offset().top; // 움직이는 요소의 맨 위 영역이 0보다 앞 혹은 뒤에 있는 경우도 있으므로 위치 따로 저장
    var movingImg2_start = movingImg2.offset().top; // 움직이는 요소의 맨 위 영역이 0보다 앞 혹은 뒤에 있는 경우도 있으므로 위치 따로 저장

    var movingImg1_pos = 0;
    var movingImg2_pos = 0;

    $(window).scroll(function () {
        current_pos = $(this).scrollTop() * 0.95; //현재 화면스크롤의 위치

        movingImg1_pos = current_pos + movingImg1_start;
        movingImg2_pos = current_pos + movingImg2_start;

        // 1. jQuery animate() 활용
        // movingImg1.stop().animate({
        //     top: movingImg1_pos + 'px'
        // }, 3000);
        // movingImg2.stop().animate({
        //     top: movingImg2_pos + 'px'
        // }, 1500);      

        // 2. jQuery CSS() 활용 + CSS에 transition 적용 방식
        movingImg1.css({
            'top' : movingImg1_pos + 'px'
        });
        movingImg2.css({
            'top' : movingImg2_pos + 'px'
        });  
    });

    /* 페이지 제일 위로 가는 동작 */
    $('.top-button').on('click', function() {
        $('html, body').animate({
            scrollTop : 0
        }, 400);
    })
});