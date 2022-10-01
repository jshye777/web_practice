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

  navbarMenu.classList.remove('show');

});

//navbar toggle
const navbarToggle = document.querySelector('.navbar__toggle-btn');

navbarToggle.addEventListener('click', ()=> {
  navbarMenu.classList.toggle('show');
});

//navbar intersectionobserver
// 1. 모든 섹션 요소들을 가져온다. 메뉴아이템들도 가져온다.
// 2. intersectionobserver를 이용해서 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당되는 메뉴아이템을 활성화한다.
// const navbarItem = document.querySelectorAll('.navbar__menu__item');

//1)
//section이 해당되는 아이디들을 배열로만들어준다. (해당 하는 모든 section 요소)
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact']

// 이 배열들을 어디에 해당되는 곳에 널을 수 있도록 설정한다. (배열을 받아서 id에 넣을 수있게 map)
const sections = sectionIds.map(id => document.querySelector(id));
// console.log(section);

//section에 해당되는 navitem을 가져와야한다. (data-link)
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`))
// console.log(navItems);

//2)
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const options ={
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const callback = (entries, observer) => {
  // console.log(entries);
  entries.forEach(entry => {
    // console.log(entry.target);

    // 진입했다가 나갈때
    if(!entry.isIntersecting && entry.intersectionRatio>0 ){
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      
      // 스크롤창이 아래로 되어서 페이지가 올라올때
      if (entry.boundingClientRect.y < 0){
        selectedNavIndex = index+1;
      }else{
        selectedNavIndex = index-1;
      }
    }
  });
};
const observer = new IntersectionObserver(callback, options);

sections.forEach(section=> observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY ===0 ){
    selectedNavIndex = 0;
  }else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight){
    selectedNavIndex = navItems.length-1;
  }
  selectNavItem(navItems[selectedNavIndex]);
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

  navbarMenu.classList.remove('show');

  scrollIntoView(link);
  selectNavItem(target);
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

// work projects
const workBtnContainer = document.querySelector('.work__category');
const projectContainer = document.querySelector('.work__projects');

// 이 프로젝트들을 배열로 받아온다.
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', (e)=>{
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  // console.log(filter);

  if(filter == null){
    return;
  }
  // 버튼 클릭 시 전에 클릭됐던 값들은 없애고 현재클릭된 아이들로 색깔이 나타나도록
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  
  // 현재 span 태그에 눌렀을 때 null이 나오니까 해당 처리를 해줘야함. 
  const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');

  setTimeout(() => {
    projects.forEach((project)=>{
      // console.log(project);
      // console.log(project.dataset.type);
      if(filter === '*' || project.dataset.type === filter ){
        project.classList.remove('invisible');
      }else{
        project.classList.add('invisible');
      }
    });

    projectContainer.classList.remove('anim-out');
  }, 300);
});

// 계속적으로 쓸 수 있는 확률이 있기때문에 해당 내용들은 함수로 정의해준다.
function scrollIntoView(selector){
  const scrollTo = document.querySelector(selector);

  scrollTo.scrollIntoView({behavior:'smooth'});
  selectNavItem (navItems[sectionIds.indexOf(selector)]);
};