// scroller 설정
const $scroller = $('.scroller');
const bodyScrollBar = Scrollbar.init($scroller[0], {
  speed: 10,
  damping: 0.07,
  mobile: {
    speed: 0.6
  }
});

// AOS 초기화 Scrollbar 연동
AOS.init({
  easing: 'ease-out-quart',
  duration: 1200,
  once: true
});

bodyScrollBar.addListener(({ offset }) => {
  window.scrollY = window.pageYOffset = offset.y;
  AOS.refreshHard();
});






let lastScrollTop = 0;
let scrolled = false;  // 스크롤 상태를 추적할 변수

bodyScrollBar.addListener(function () {
    const delta = 15;
    const st = bodyScrollBar.scrollTop;  // 현재 스크롤 위치

    if (Math.abs(lastScrollTop - st) <= delta) return;  // 작은 차이는 무시

    
   // 스크롤 내리기
    if (st > lastScrollTop && st > delta) {
        $('.header').addClass('scroll-down').removeClass('scroll-up');
        // 스크롤 내렸을 때
    } 
    // 스크롤 올리기
    else if (st < lastScrollTop && st > delta) {
        $('.header').removeClass('scroll-down').addClass('scroll-up');
        // 스크롤 올렸을 때
    }
    

    // 스크롤이 맨 위 (top: 0)일 때, 헤더 상태 초기화
    if (st <= delta) { //st === 0 으로 하면 아주 정확하게 스크롤 해야하기 때문에 delta값으로 비교함
        $('.header').removeClass('scroll-down scroll-up');
        $('.header .logo .logo-box').removeClass('active');
        $('.header .menu-box').removeClass('active');        
        $('.header .nav-bg').removeClass('color');
        scrolled = false;
    } 
    else {
        // 스크롤이 맨 위가 아니면 헤더에 상태 추가
        $('.header .nav-bg').addClass('color');
        $('.header .logo .logo-box').addClass('active');
        $('.header .menu-box').addClass('active');
        scrolled = true;  // 스크롤 상태를 활성화
    }

    lastScrollTop = st;  // 마지막 스크롤 위치 업데이트
});


// mouseenter / mouseleave 처리
$('.header .menu-box > ul > li').mouseenter(function () {    
    $('.header .logo .logo-box').addClass('active');
    $('.header .menu-box').addClass('active');
    $('.header .nav-bg').addClass('active');    
});

$('.header .menu-box > ul > li').mouseleave(function () {
    if (!scrolled) {  // 만약 스크롤이 되지 않았다면
        $('.header .logo .logo-box').removeClass('active');
        $('.header .menu-box').removeClass('active');
        $('.header .nav-bg').removeClass('active');
    }

    else {        
        $('.header .nav-bg').removeClass('active');        
    }
});

// 서브 버튼 클릭 이벤트
$('.header .sub-btn').click(function () {
    $('.header .sub-btn .img1').toggle();
    $('.header .sub-btn .img2').toggle();
});







//visual이미지 효과
$('.visual').css('background-image', 'url(/아이엘셀리온images/bg_main_img1.png)');
$('.visual').css('background-size', '100%');



var ii = 0; // 이미지 변수
var mcnt = 0;  


setInterval(() => {      
    
    ii++;  //순차적으로 증가
    
    if(ii >= 3) ii = 0;    
    
    mcnt++;
    
    // 배경 이미지 변경
    $('.visual').css('background-image','url(/아이엘셀리온images/bg_main_img' + (ii + 1) + '.png)'); 
    
        
    
    if (mcnt % 2 == 1) {
        // 홀수 번째 이미지 (1, 3, ...) 커짐 (100% -> 120%)
        $('.visual').css('background-size', '120%');
    } 
    else {
        // 짝수 번째 이미지 (2, 4, ...) 작아짐 (120% -> 100%)
        $('.visual').css('background-size', '100%');
    }    
    

}, 4500);  // 4.5초마다 배경 이미지 변경






//visual visual_title 효과
var titleIndex = 0;

$('.visual .visual_title').hide();
$('.visual .visual_title:eq(0)').show();

setInterval(() => {
    titleIndex++;  //순차적으로 증가

    if(titleIndex >= 3) titleIndex = 0; 

    $('.visual .visual_title').hide();
    $('.visual .visual_title:eq(' + titleIndex + ')').show();

    gsap.from('.visual .visual_title', {
        y: '15%',
        opacity: 0,
        duration: 1,
        ease: 'Power1.easeIn',
    });
}, 4500);









//visual big-logo-text효과    
gsap.from('.visual .big-logo-text > span', {
    y: "100%",  // 아래에서 위로 올라오는 애니메이션
    duration: 0.2,
    ease: 'power1.in',
    stagger: 0.13,
});




gsap.registerPlugin(ScrollTrigger);


// section-1 fade
gsap.to('.section-1 .img-box', {
    scrollTrigger: {
        trigger: '.section-1 .img-box',
        start: 'top center',
        end: 'bottom center',
        once: true,
    },
});






// section-2 pin




// footer site
$('footer .f-top .site').click(function(){
    $(this).toggleClass('active');
    $('footer .f-top .site > ul').toggleClass('active');
    $('footer .f-top .site .icon .img1').toggle();
    $('footer .f-top .site .icon .img2').toggle();    
});




// section-3
const $cards   = $('.s-3_info .card');
const $trigger = $('.s-3_info');

const $textBoxes = $('.s-3_info li .text-box');
$textBoxes.css({ opacity: 0 });
$textBoxes.first().css({ opacity: 1 });

// GSAP 등록
gsap.registerPlugin(ScrollTrigger);

// smooth-scrollbar 연동
ScrollTrigger.scrollerProxy($scroller[0], {
  scrollTop(value) {
    if (arguments.length) bodyScrollBar.scrollTop = value;
    return bodyScrollBar.scrollTop;
  },
  getBoundingClientRect() {
    return {
      top:    0,
      left:   0,
      width:  window.innerWidth,
      height: window.innerHeight
    };
  }
});
bodyScrollBar.addListener(ScrollTrigger.update);
ScrollTrigger.defaults({ scroller: $scroller[0] });

// 카드 스택 애니메이션
const animation = gsap.timeline();
$cards.each(function(i) {
  if (i > 0) {
    gsap.set(this, { y: i * 920 });
    animation.to(this, {
      y:       0,
      duration: i * 0.3,
      ease:     'power1.in'
    }, 0);
  }
});

// 메인 ScrollTrigger (pin & scrub)
ScrollTrigger.create({
  trigger:   $trigger,
  start:     'top top',
  end:       `+=${$cards.length * 920}`,
  scrub:     true,
  pin:       true,
  animation: animation,
  ease:     'power1.in',
  scroller:  $scroller[0]
});

// 카드가 이전 카드의 중앙을 지날 때 텍스트 전환 (정확한 동작)
bodyScrollBar.addListener(() => {
  let activeIndex = 0;

  for (let i = 1; i < $cards.length; i++) {
    const prevCard = $cards[i - 1];
    const prevRect = prevCard.getBoundingClientRect();
    const prevCenter = prevRect.top + prevRect.height / 2;

    const currCard = $cards[i];
    const currRect = currCard.getBoundingClientRect();

    if (currRect.top <= prevCenter) {
      activeIndex = i;
    } else {
      break;
    }
  }

  $textBoxes.each((i, el) => {
    gsap.to(el, {
      opacity: i === activeIndex ? 1 : 0,
      duration: 0.3,
      ease: 'power1.out'
    });
  });
});

ScrollTrigger.refresh();
