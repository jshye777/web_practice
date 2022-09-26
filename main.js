// var navbar = document.getElementById('navbar');

// window.onscroll = function(){
//   if(window.pageYOffset > 200){
//     navbar.style.background = "#fe918d";
//     navbar.style.height = "60px";
//   } else{
//     navbar.style.background = "transparent";
//   }
// }

// function moveHome(){
//   window.scrollTo({top:0,left:0, behavior:'smooth'});
// }
// function moveAbout(){
//   window.scrollTo({top:588,left:0, behavior:'smooth'});
// }
// function moveSkills(){
//   window.scrollTo({top:1346,left:0, behavior:'smooth'});
// }
// function moveWorks(){
//   window.scrollTo({top:2048,left:0, behavior:'smooth'});
// }
// function moveTesti(){
//   window.scrollTo({top:3150,left:0, behavior:'smooth'});
// }
// function moveContact(){
//   window.scrollTo({top:3233,left:0, behavior:'smooth'});
// }

'use strict';

//navbar투명 후  스크롤 후  색 넣기
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// const homeScroll = document.querySelector('#home').scrollTop;
// const aboutScroll = document.querySelector('#about').scrollTop;

//1)스크롤위치를 파악해야함 (각 섹션별로)

document.addEventListener('scroll', ()=> {
  // console.log(window.scrollY);
  // console.log(window.scrollX);
  // console.log(`navbarHeight: ${navbarHeight}`);

  // console.log(`homescroll: ${homeScroll}`);
  // console.log(`aboutscroll: ${aboutScroll}`);


  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  };

});

// handle scrolling navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  console.log(event.target.dataset.link);
  
  //해당 콘솔로그를 찍었을 때 빈 공간이 찍히면 undefined가 나와서 해당 부분 처리
  const target = event.target;
  const link = target.dataset.link;

  //해당 link가 아무것도 없으면 하지않음.
  if (link == null){
    return;
  }

  scrollIntoView(link);
});

const contact = document.querySelector('.home__contact');
contact.addEventListener('click', () => {
  scrollIntoView('#contact')
})

// 계속적으로 쓸 수 있는 확률이 있기때문에 해당 내용들은 함수로 정의해준다.
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);

  scrollTo.scrollIntoView({behavior:'smooth'});
}