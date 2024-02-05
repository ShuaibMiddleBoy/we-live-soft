   // ======================================== 
// Scroll to Top 
 //======================================== 

 const scrollTop = document.querySelector('.scrollTop');
 const homeWrapper = document.querySelector('.home-wrapper')

const scrollTopFunc = () => {
  homeWrapper.scrollIntoView({behavior:"smooth"});
}
 scrollTop.addEventListener('click', scrollTopFunc);

    
    
    // ======================================== 
// for copyright year 
 //======================================== 
 const copyright = document.querySelectorAll('.currentYear');
copyright.forEach((ele)=>{
  console.log(ele);
  ele.innerHTML =  new Date().getFullYear();
})
console.log(copyright);

 
 // ======================================== 
// landing page active menu code
 //======================================== 
 let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};


// ======================================== 
 // active Menu Code 
 //======================================== 

 var menuItems = document.querySelectorAll('.menu a');

 menuItems.forEach((item)=>{
  item.addEventListener("click", function(){
    menuItems.forEach(function (item) {
      item.classList.remove('active');
  });
  this.classList.add('active')
  })
 })


// ======================================== 
// Creating a Sticky Navbar
 //======================================== 
 const homeHeader = document.querySelector('.home-header');

 const observer = new IntersectionObserver(
    (entries) => {
      const ent = entries[0];
      console.log(ent);
      !ent.isIntersecting
        ? document.body.classList.add("sticky")
        : document.body.classList.remove("sticky");
    },
    {
      root: null,
      threshold: 0,
    }
  );
 observer.observe(homeHeader);
 


// ======================================== 
 // Hamburger Menu Code 
 //======================================== 

const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.navbar-right');

hamburgerMenu.addEventListener('click', function () {
    menu.classList.toggle('open');
    menu.classList.toggle('closed');
});


  
// ======================================== 
 // Preloader Code 
 //======================================== 


function preoloaderFunc() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}




// ======================================== 
// services tabs functionality 
 //======================================== 

  const openTab = (e, project) => {
    const tabContents = document.querySelectorAll('.tab-contents');
    tabContents.forEach((tabCon)=>{
      tabCon.style.display = 'none';
    })
    
  const tabBtns = document.querySelectorAll('.tabBtn');
  tabBtns.forEach((tabBtn)=>{
   tabBtn.className= tabBtn.className.replace(" active", "");
  })

  document.getElementById(project).style.display = "flex";
  e.currentTarget.className += " active";
  }




 // ======================================== 
// Work Counter Code
 //========================================  
const workCounterSection = document.getElementById('workCounter');

const counterObserver = new IntersectionObserver((entries, observer)=>{
    const [ent] = entries;
    
    if(!ent.isIntersecting) return;
    const countNum = document.querySelectorAll('.counter-numbers');
const speed = 2;
countNum.forEach((curElem)=>{
    const updatedNum = () => {
        const targetNum = parseInt(curElem.dataset.number);
        const initialNum = parseInt(curElem.innerText);
        // const incrementNum = Math.trunc(targetNum/speed);
        if(initialNum < targetNum){
            // curElem.innerText = initialNum + incrementNum;
            curElem.innerText = `${initialNum+1}+`;
            setTimeout(updatedNum, 100)
        }
    }
    updatedNum()
})


},{
    root:null,
    threshold:0
})

counterObserver.observe(workCounterSection);






 // ======================================== 
// Miantenance Code
 //========================================  

//  var popup = document.getElementById('maintenance');
//  var closeBtn = document.querySelector('.close-btn');

//  // Function to show the popup
//  function showPopup() {
//      popup.style.display = 'block';
//  }

//  // Function to hide the popup
//  function hidePopup() {
//      popup.style.display = 'none';
//  }

//  // Show the popup every minute
//  setInterval(showPopup, 20000); // 60000 milliseconds = 1 minute

//  // Close the popup on clicking the close button
//  closeBtn.addEventListener('click', hidePopup);