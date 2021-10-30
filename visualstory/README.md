# visualstory
---
## 개요
- 포트폴리오 목적으로 만든 페이지입니다.
- 구성은 index와 portfolio 페이지로 총 2페이지 입니다.
  - index 페이지 : 
  - portfolio 페이지 : 
- portfolio 페이지는 <u>반복되는 부분은 기술적으로 큰 차이가 없다고 판단</u>해서 구현 그 자체에 중점을 두었습니다.
- ```HTML5```, ```CSS3```, ```jQuery```를 사용하였습니다.
- 스크립트 동작은 **다른 플러그인을 사용하지 않고 직접 구현**하였습니다.
- 직접 구현하는 것과 큰 차이가 없는 스크립트의 경우 개선방법을 찾아 변경시켜 적용하였습니다.
<br>

## 특징
- 마크업시 클래스를 ```BEM (Block. Element. Modifier)``` 방식으로 하였습니다.
- 레이아웃 가로 정렬시 ```float``` 사용을 최대한 배제하고자 하였습니다.
>```float``` 방식이 정렬하기 편한 방식임은 분명하나 세부적인 조절 옵션이 없는 단점이 있습니다.
그리고 ```float```는 요소를 띄울 수 있어서 레이아웃에 많이 쓰였으나 CSS가 발전함에 따라 레이아웃을 위한 속성도 나왔기 때문에 길게 봤을 때는 목적에 맞는 방식을 사용하는 것이 좋다고 생각하여 ```display: flex```와 ```display: table``` 방식을 사용하였습니다.
- 애니메이션 효과를 **스크립트로 직접 구현**하였으며 기존 페이지와 다른 방식으로 작업하였습니다.
- 모바일/태블릿 **반응형**을 지원합니다
<br>

## 기존 페이지에 비해 개선된 점

- **웹접근성과 SEO**를 개선시켰습니다.
	- HTML Heading outline 수정
	- 시맨틱한 태그 사용 (```<address>```, ```<a>``` / ```<button>``` 태그 사용 구분 등)
	- ```<button>``` 태그에 ```aria``` 속성 추가
	- Skip Navigation 추가
    - 웹접근성/SEO 측정 도구의 점수 상승
        - 크롬 lighthouse 보고서 (2021년 10월초 기준)
            - 메인 페이지
                - 웹접근성 : 77 → **100**
                - SEO : 77 → **90**
            - 포트폴리오 페이지
                - 웹접근성 : 56 → **100**
                - SEO : 85 → **92**
        - OpenWAX (2021.10.28 기준)
            - 메인 페이지
                - Score : 70.7 → **100**
            - 포트폴리오 페이지
                - Score : 70.1 → **100**
<br>
- **스크립트를 개선**시켰습니다.
    - 애니메이션 설정 방식 개선
        - 기존 소스는 스크롤되면 '특정 클래스를 일괄적으로' 추가(```jQuery```의 ```addClass()``` 이용)하는 방식이었습니다.
    이렇게 되었을 때 요소마다 각각 다른 동작을 하려면 CSS에서 같은 클래스 이름(on)의 다른 동작을 요소마다 만들어야 하는데 <u>같은 클래스 이름에 동작이 다른 점이 혼동을 줄 수 있고</u> 다른 사람이 작업하기도 어려워 좋지 않다고 생각했습니다. 그래서 요소마다 클래스가 적용되는 상황이 다를 것이라고 보고 통일된 형태로 하지 않았습니다
    그리고 요소가 필요한 애니메이션이 있으면 CSS에서 정의하고 JavaScript에서 해당 애니메이션이 동작하도록 정의했습니다.

        - 스크롤할 때마다 모든 애니메이션 요소를 다 검사하기 떄문에 이미 애니메이션이 실행된 요소도 다시 검사하sms 비효율적인 동작이 있었습니다. 그래서 처음 메인 문구는 flag 변수를 이용하여 한번 실행되면 다시 확인하지 않도록 수정했습니다.


```js
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

	// 메인 문구는 처음 한번만 동작하도록
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
```

- hover시 동작 등 소소한 부분들을 수정하였습니다.
