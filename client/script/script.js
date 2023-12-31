
const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.navbar-right');

hamburgerMenu.addEventListener('click', function () {
    menu.classList.toggle('open');
    menu.classList.toggle('closed');
});
// add dynamic data to menu 
const locateMenuData = (data) => {
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
        const res = await fetch('http://localhost:8000/api/menu');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateMenuData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


// add dynamic data to contact page  
const locateContactData = (data) => {
    const mapContainer = document.querySelector('.map');
    const map = document.createElement('iframe');
    map.setAttribute('src', `${data.map}`);
    map.setAttribute('width', '100%');
    map.setAttribute('height', '100%');
    map.setAttribute('style', 'border:0;');
    map.setAttribute('loading', 'lazy');
    map.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    map.classList.add('mapIframe');
    mapContainer.appendChild(map);

    const infoContainer = document.querySelector('.info-list-w-icons');
    data.contactData.forEach(info => {
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `<h5><i class="${info.icon}"></i>${info.info}</h5>`
        infoContainer.append(infoDiv);
    })
}
// get data from backend  of contact
const getContactData = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/contactInfo');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateContactData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}



// add dynamic data to resume 
const locateResumeData = (data) => {
    const educationContainer = document.querySelector('.educationContainer')
    data.education.forEach(edu => {
        const educationDiv = document.createElement('div');
        educationDiv.classList.add('timeline-item');
        educationDiv.innerHTML = `<h4 class="item-title">${edu.title}</h4> <span
         class="item-period">${edu.date}</span> <span class="item-small">${edu.institute}</span>
         <p>${edu.description}</p>`
        educationContainer.appendChild(educationDiv)
    })

    const experienceContainer = document.querySelector('.experienceContainer')
    data.experience.forEach(exp => {
        const experienceDiv = document.createElement('div');
        experienceDiv.classList.add('timeline-item');
        experienceDiv.innerHTML = `<h4 class="item-title">${exp.position}</h4> <span
         class="item-period">${exp.timeline}</span> <span class="item-small">${exp.company}</span>
         <p>${exp.description}</p>`
        experienceContainer.appendChild(experienceDiv)
    })

    const codingContainer = document.querySelector('.codingContainer')
    data.coding.forEach(language => {
        const codingSpan = document.createElement('span');
        codingSpan.innerHTML = `<h4>${language.name}</h4>
        <div data-value="${language.percentage}" class="skill-container">
            <div class="skill-percentage"></div>
        </div>`
        codingContainer.appendChild(codingSpan)
    })

    const resumeDownloader = document.querySelector('.resumeDownloader')
    const Resume = document.createElement('span');
    Resume.innerHTML = `
    <a href="./dashboard/Images/${data.resume}" class="btn btn-secondary" download>Download Resume</a>`
    resumeDownloader.appendChild(Resume);
}

// get data from backend 
const getResumeData = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/resume');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateResumeData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


const locateServicesData = (data) => {
    const servicesContainer = document.querySelector('.servicesContainer');
    data.services.forEach(service => {
        const serviceDiv = document.createElement('div');
        serviceDiv.classList.add('col');
        serviceDiv.innerHTML = `
            <div class="image">
            <img src="http://localhost:8000/public/images/${service.serviceImage}" alt="image">
            </div>
            <h4>${service.serviceTitle}</h4>
            <p>${service.serviceDesc}.</p>`
        servicesContainer.appendChild(serviceDiv);
    })

    const clientsContainter = document.querySelector('.clientsContainter');
    data.clients.forEach(client => {
        const clientDiv = document.createElement('div');
        clientDiv.classList.add('col');
        clientDiv.innerHTML = `
        <a href="">
        <img src="http://localhost:8000/public/images/${client.clientImage}"
            alt="client">
        </a>`
        clientsContainter.appendChild(clientDiv);
    })

    const feedbacksContainer = document.querySelector('.feedbacksContainer');
    data.feedbacks.forEach(feedback => {
        const feedbackDiv = document.createElement('div');
        feedbackDiv.classList.add('col');
        feedbackDiv.innerHTML = `
        <div class="testimonail-credits">
        <div class="testimonail-picture">
        <img src="http://localhost:8000/public/images/${feedback.image}" alt="">
        </div>
        <div class="testimonail-author-info">
            <h5>${feedback.reviewer}</h5>
            <p>${feedback.company}</p>
        </div>
        </div>
        <div class="testimonail-content">
        <p>${feedback.description}</p>
        </div>`
        feedbacksContainer.appendChild(feedbackDiv);
    })

    const plansContainer = document.querySelector('.plansContainer');
    data.plans.forEach(plan => {
        const planDiv = document.createElement('div');
        planDiv.classList.add('col');
        planDiv.innerHTML = `
         <p>${plan.name}</p>
         <h4>${plan.price}</h4>
         <button>FREE TRIAL</button>
         <P>${plan.description}</P>`
        plansContainer.appendChild(planDiv);
    })
}

// get data from backend of services
async function getServicesData() {
    try {
        const res = await fetch('http://localhost:8000/api/services');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateServicesData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}


const locatePortfolioData = (data) => {
    const portfolioFilters = document.querySelector('.portfolio-filters');
    const uniqueCategory = new Set();
    data.projects.forEach(proj => {
        uniqueCategory.add(proj.category);
    });
    const categories = Array.from(uniqueCategory);
    categories.forEach(cat => {
        const category = document.createElement('li');
        category.innerHTML = `
        <a class="filter btn btn-sm btn-link" data-group="${cat}">${cat}</a>`
        portfolioFilters.appendChild(category);
    })

    const projectsContainer = document.querySelector('.projectsContainer');
    data.projects.forEach(proj => {
        const project = document.createElement('span');
        project.innerHTML = `
            <figure class="item standard" data-groups='["all", &quot;${proj.category}&quot;]'>
            <img width="1280" height="230" src="http://localhost:8000/public/images/${proj.image}"
            class="attachment-portfolio-image-three-c size-portfolio-image-three-c wp-post-image"
            alt="project" decoding="async"/>
            <div class="portfolio-preview-desc">
            <div class="portfolio-preview-desc-inner">
                <h5 class="name">${proj.title}</h5>
                <small><a class="lightbox" data-lightbox-gallery="fancybox-item-72" title="Illustration Project 2"
                 href="${proj.previewLink}">Preview</a></small>
                <i><a class="lightbox" data-lightbox-gallery="fancybox-item-72" title="Illustration Project 2"
                     href="${proj.details}">Details</a></i>
            </div>
            </div>
            </figure>`
        projectsContainer.appendChild(project)
    });
}
// get data from backend of portfolio
async function getPortfolioData() {
    try {
        const res = await fetch('http://localhost:8000/api/portfolio');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        // console.log(data);
        locatePortfolioData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

window.addEventListener('load', () => {
    getMenuData()
    getContactData();
    getResumeData();
    getServicesData();
    getPortfolioData();
});


// Function for progress bars (Resume page)
function updateProgressBars() {
    const skillContainers = document.querySelectorAll('.skill-container');
    skillContainers.forEach((container) => {
        const skillValue = container.getAttribute('data-value');
        const progressBar = container.querySelector('.skill-percentage');
        progressBar.style.width = skillValue + '%';
    });
}
setInterval(updateProgressBars, 10);



// for filteration of portfolio projects
 const filterPortfolio = () => {
    // Get all filter links
    const filterLinks = document.querySelectorAll(".portfolio-filters li a");
    const portfolioItems = document.querySelectorAll(".portfolio-grid figure");

    // Add a click event listener to each filter link
    filterLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            // Remove the "active" class from all filter items
            filterLinks.forEach(function (filterItem) {
                filterItem.parentElement.classList.remove("active");
            });

            // Add the "active" class to the clicked filter item (li)
            this.parentElement.classList.add("active");

            // Get the data-group attribute value of the clicked link
            const filterValue = this.getAttribute("data-group");

            // Loop through all portfolio items
            portfolioItems.forEach(function (item) {
                const dataGroups = item.getAttribute("data-groups");
                // Convert the data-groups attribute to an array
                const groupsArray = dataGroups.replace(/&quot;/, '"');
                const groups = JSON.parse(groupsArray);

                // If the filterValue is "all" or the item belongs to the clicked filter, show it; otherwise, hide it.
                if (filterValue === "all" || groups.includes(filterValue)) {
                    item.style.display = "block";
                } else {
                    item.style.display = "none";
                }
            });
        });
    });
};

setInterval(filterPortfolio, 100);


// preloader code 
function preoloaderFunc() {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
}

// map skeleton loading effect 
const mapContainer = document.querySelector('.map');
const map = document.querySelector('.mapIframe');
const gRecapttcha = document.querySelector('.g-recaptcha');
const recaptchaContainer = document.querySelector('.recaptchaContainer');
// map.setAttribute('src', "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus")

gRecapttcha.setAttribute('data-sitekey', "YOUR_SITE_KEY")
mapContainer.classList.remove('loading')
recaptchaContainer.classList.remove('loading')





// Work with APIs
const URL = "http://localhost:8000/api";

// POST METHOD Using Fetch Api For Contact Form
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const message = messageInput.value;

    const formData = {
        name,
        email,
        message,
    };

    try {
        const response = await fetch(`${URL}/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Specify JSON content type
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                // Show success toast
                Toastify({
                    text: "Form submitted successfully!",
                    className: "custom-toast",
                    close: true,
                    duration: 3000
                }).showToast();

                // Clear the form
                form.reset();
            } else {
                // Show error toast for server-side validation failure
                Toastify({
                    text: data.message || "Submission failed",
                    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                    className: "error",
                }).showToast();
            }
        } else {
            // Show error toast for non-OK HTTP response
            Toastify({
                text: "Error submitting form",
                backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
                className: "error",
            }).showToast();
        }
    } catch (error) {
        // Show error toast for network or other errors
        console.log(error);
        Toastify({
            text: "Network error",
            backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
            className: "error",
        }).showToast();
    }
});
