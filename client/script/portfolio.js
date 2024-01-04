const Base = "http://localhost:8000";

// get data from backend of portfolio
async function getPortfolioData() {
    try {
        const res = await fetch(`${Base}/api/v1/portfolio`);
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

getPortfolioData();

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
