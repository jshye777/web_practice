// var navbar = document.getElementById('navbar');

// window.onscroll = function(){
//   if(window.pageYOffset > 200){
//     navbar.style.background = "#fe918d";
//     navbar.style.height = "60px";
//   } else{
//     navbar.style.background = "transparent";
//   }
// }

'use strict';

//navbar투명 후  스크롤 후  색 넣기
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', ()=> {
  console.log(window.scrollY);
  console.log(`navbarHeight: ${navbarHeight}`);

  if(window.scrollY > navbarHeight){
    navbar.classList.add('navbar--dark');
  }else{
    navbar.classList.remove('navbar--dark');
  }
})