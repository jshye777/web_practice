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

//1)스크롤위치를 파악해야함 (각 섹션별로)

document.addEventListener('scroll', ()=> {
  // console.log(window.scrollY);
  // console.log(window.scrollX);
  // console.log(`navbarHeight: ${navbarHeight}`);
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
  scrollIntoView('#contact');
});

// 스크롤이 진행되면 해당 home에 내용들을 투명색으로 바꿔줌.
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener('scroll', ()=>{
  // console.log(`homeHeight: ${homeHeight}`);
  // console.log(1-window.scrollY / homeHeight);
  home.style.opacity = 1-window.scrollY / homeHeight;

});

// 스크롤 시 버튼이 보이도록
const topBtn = document.querySelector('.top');

document.addEventListener('scroll', ()=>{
  if(window.scrollY>homeHeight / 2){
    topBtn.classList.add('visible');
  }else{
    topBtn.classList.remove('visible');
  }
});

topBtn.addEventListener('click', ()=>{
  scrollIntoView('#home');
});



// 계속적으로 쓸 수 있는 확률이 있기때문에 해당 내용들은 함수로 정의해준다.
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);

  scrollTo.scrollIntoView({behavior:'smooth'});
};