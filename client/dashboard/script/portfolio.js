  // to set backend data in fields (to not lose data by refreshing)
  function setFormFields(data) {

    const portfolioContainer = document.getElementById("portfolio");
    const projects = data.projects;

    projects.forEach((project) => {
        const projectDiv = document.createElement("div");
        projectDiv.innerHTML = ` 
        <label for="projecttitle">Project Title:</label>
            <input type="text" name="project[title][]" value="${project.title}" required><br><br>

            <label for="projectimage">Project Image:</label>
            <img src="http://localhost:8000/public/images/${project.image}" style="max-width: 180px;" alt="Resume" ><br><br>
            <input type="file" name="projectImage" value="${project.image}"><br><br>

            <label for="projectDetails">Project Details:</label>
            <textarea name="project[details][]" cols="30" rows="5">${project.details}</textarea><br><br>

            <label for="projectcategory">Project Category:</label>
            <input type="text" name="project[category][]" value="${project.category}" required><br><br>

            <label for="projectPreview">Project Preview (Link):</label>
            <input type="text" name="project[preview][]" value="${project.previewLink}" required><br><br>

            <button type="button" class="removeProject">Remove Project</button><br><br>
        `;
        portfolioContainer.appendChild(projectDiv);

        // Add an event listener to the remove button
        const removeProjectButton = projectDiv.querySelector(".removeProject");
        removeProjectButton.addEventListener("click", () => {
            portfolioContainer.removeChild(projectDiv);
        });
    });
}


// add project on click 
const addProjectButton = document.getElementById("addProject");
const portfolioContainer = document.getElementById("portfolio");

function addProject() {
    const projectDiv = document.createElement("div");

    projectDiv.innerHTML = `
        <label for="projecttitle">Project Title:</label>
        <input type="text" name="project[title][]" required><br><br>

        <label for="projectimage">Project Image:</label>
        <input type="file" name="projectImage"><br><br>

        <label for="projectDetails">Project Details:</label>
        <textarea name="project[details][]" cols="30" rows="5"></textarea><br><br>

        <label for="projectcategory">Project Category:</label>
        <input type="text" name="project[category][]" required><br><br>

        <label for="projectPreview">Project Preview (Link):</label>
        <input type="text" name="project[preview][]" required><br><br>
        
        <button type="button" class="removeProject">Remove Project</button><br><br>
    `;
    portfolioContainer.appendChild(projectDiv);

    // Add an event listener to the remove button
    const removeProjectButton = projectDiv.querySelector(".removeProject");
    removeProjectButton.addEventListener("click", () => {
        portfolioContainer.removeChild(projectDiv);
    });
}
addProjectButton.addEventListener("click", addProject);

// Handle form submission
async function sendDataToServer() {
    const portfolioForm = document.getElementById("portfolioForm");
    const formData = new FormData(portfolioForm); // Use FormData to collect form data

    try {
        const response = await fetch('http://localhost:8000/api/portfolio', {
            method: 'POST',
            body: formData, // Send FormData directly instead of JSON.stringify
        });

        if (response.status === 200) {
            alert('Portfolio uploaded successfully.');
        } else {
            alert('Error uploading portfolio.');
        }
    } catch (error) {
        console.error(error);
        alert('Error uploading portfolio.', error);
    }
}


// Attach a submit event listener to the form
const portfolioForm = document.getElementById("portfolioForm");
portfolioForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    sendDataToServer(); // Call the function to send data to the server manually
});


// get data from backend 
async function getPortfolioData() {
    try {
        const res = await fetch('http://localhost:8000/api/portfolio');
        
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        // console.log(data);
        setFormFields(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

window.addEventListener('load', getPortfolioData);

// code for toggle sidebar and header login 

function toggleDropdown(e) {
    e.preventDefault();
    var dropdown = document.getElementById("myDropdown");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
    }
    
    function toggleSidebar() {
    var menu = document.querySelector("#sidebar");
    var toggleBtn = document.querySelector(".toggleBtn");
    var main = document.querySelector("#main");
    main.classList.toggle("showSidebar");
    toggleBtn.classList.toggle("cross");
    menu.classList.toggle("show");
    var icon = document.getElementById("menuIcon");
    icon.classList.toggle("fa-times");
    icon.classList.toggle("fa-bars");
    }