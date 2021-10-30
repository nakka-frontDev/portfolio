# dowhat
---
## 개요
- 포트폴리오 목적으로 만든 페이지입니다.
- ```HTML5```, ```CSS3```, ```jQuery```를 사용하였습니다.
- 스크립트 동작은 **다른 플러그인을 사용하지 않고 직접 구현**하였습니다.
<br>

## 특징
- 마크업시 클래스를 ```BEM (Block. Element. Modifier)``` 방식으로 하였습니다.
- 레이아웃 가로 정렬시 ```float``` 사용을 최대한 배제하고자 하였습니다.
>```float``` 방식이 정렬하기 편한 방식임은 분명하나 세부적인 조절 옵션이 없는 단점이 있습니다.
그리고 ```float```는 요소를 띄울 수 있어서 레이아웃에 많이 쓰였으나 CSS가 발전함에 따라 레이아웃을 위한 속성도 나왔기 때문에 길게 봤을 때는 목적에 맞는 방식을 사용하는 것이 좋다고 생각하여 ```display: flex```와 ```display: table``` 방식을 사용하였습니다.
- **애니메이션 효과를 새로 추가**하였고 스크립트로 **직접 구현**하였습니다.
- 모바일/태블릿 **반응형**을 지원합니다
<br>

## 기존 페이지에 비해 개선된 점

- **웹접근성과 SEO**를 개선시켰습니다.
    - HTML Heading outline 수정
	- 시맨틱한 태그 사용 (```<figure>```, ```<address>```, ```<a>```/```<button>``` 태그 사용 구분 등)
	- ```button``` 태그에 ```aria``` 속성 추가
	- Skip Navigation 추가
    - 웹접근성/SEO 측정 도구의 점수 상승
        - 크롬 lighthouse 보고서 (2021.10.20 기준)
            - 웹접근성 : 82 → **97**
            - SEO : 71 → **97**
        - OpenWAX (2021.10.28 기준)
            - Score : 50.8 → **100**
<br>
- **스크립트를 개선**시켰습니다.
    - 애니메이션 동작
        - 애니메이션 동작이 여러 동작이라 여러 동작을 ```CSS```에서 정의해두고 마크업할 때 정의한 애니메이션의 이름을 클래스로 넣어주면 이후 ```CSS```에서 애니메이션 이름을 따로 붙이는 수고가 줄어들고 신경쓸 것 줄어들어 작업효율이 높아질 것이라고 생각했고 그렇개 구현했습니다.
        - 애니메이션 동작이 있는 요소에 ani-element라는 클래스를 붙이고 ```CSS```에 정의해둔 피룡한 애니메이션 이름을 마크업할때 같이 넣어줍니다.
        - 스크롤에 따라 ani-element라는 클래스만 순회하되, 애니메이션 동작이 끝나면 ani-element-on 클래스를 추가하여 아직 애니메이션이 동작하지 않은 요소와 구분하도록 했습니다.

```js
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

        // 모바일에서 스크롤 대응을 위해 분기
        if (window.innerWidth > 768) {
            offset = $(this).offset().top - winHeight;
        } else if (window.innerWidth <= 768) {
            offset = $(this).offset().top - (winHeight * 1.3); // 모바일 스크롤 대응을 위한 임시 하드코딩 수정 (추후 개선 필요)
            if (!offset) {
                offset = 0;
            }
        }
        
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
```

    - 기기 화면 크기에 따라 슬라이더 조절
        - 기기의 가로 길이에 따라 한 화면에 표현되는 슬라이드의 숫자 및 슬라이더의 크기 등을 조절하게 하여 기기에 맞게 표현되도록 하였습니다.
```js
/* 기기 화면 크기에 따라 슬라이더 조절 */
function reSizeSlider(device) {
    switch (device) {
        case 'LAPTOP':
            $('.slider-review__box').css({
                width: '85.5rem',
                margin: '0 auto'
            });
            slideLength = Math.ceil($('.slider-review .slider-review__item').length / 3);
            break;
        case 'TABLET':
            $('.slider-review__box').css({
                width: '57rem',
                margin: '0 auto'
            });
            slideLength = Math.ceil($('.slider-review .slider-review__item').length / 2);
            break;
        case 'MOBILE': // 가로가 630px 보다 작을때
            $('.slider-review__box').css({
                width: '28.5rem',
                margin: '0 auto'
            });
            slideLength = Math.ceil($('.slider-review .slider-review__item').length);
            break;
        default: // 기본은 PC 일 떄
            $('.slider-review__box').css({
                width: '',
                margin: ''
            });
            slideLength = Math.ceil($('.slider-review .slider-review__item').length / 4);
            break;
    }
}
```

    - 소소한 부분들을 수정, 개선하였습니다.
        - 첫화면 화면 인트로 영상을 화면 가로세로 100% 채우게 설정
        - 하단 ```background: fixed```가  ```iOS``` 계열에서 동작하도록 수정 등