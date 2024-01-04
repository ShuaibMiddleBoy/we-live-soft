const API_BASE_URL = 'http://localhost:8000';
// add dynamic data to menu 
const locateMenuData = (data) => {
    console.log(data);
    const logoImage = document.querySelector('.logo');
    const img = document.createElement('span');
    img.innerHTML = `<img src="http://localhost:8000/public/images/${data.logoImage}" alt="${logoImage}" width="15%" class="logoImg">`
    logoImage.appendChild(img);

    const menuContainer = document.querySelector('.menu');
    data.menuItems.forEach(item => {
        const menuItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.link;
        link.textContent = item.title;
        menuItem.appendChild(link);
        menuContainer.appendChild(menuItem);
    });
}
// get data from backend of menu
async function getMenuData() {
    try {
        const res = await fetch('http://localhost:8000/api/v1/menu');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateMenuData(data);
        console.log(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

getMenuData()
getContactData();


// Hamburger Menu Code 

const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.navbar-right');

hamburgerMenu.addEventListener('click', function () {
    menu.classList.toggle('open');
    menu.classList.toggle('closed');
});


  
// preloader code 
function preoloaderFunc() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}




