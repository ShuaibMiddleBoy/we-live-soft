   // to set backend data in fields (to not lose data by refreshing)
   function setFormFields(data) {

    const resumeContainer = document.getElementById("resume");
    const { coding, education, experience, resume } = data;

    // display coding values from backend
    coding.forEach((language) => {
        const languageDiv = document.createElement("div");
        languageDiv.innerHTML = `
        <label for="languagename">Language Name:</label>
        <input type="text" name="coding[name][]" value="${language.name}" required><br><br>
        <label for="languagepercent">Percentage:</label>
        <input type="text" name="coding[percentage][]" value="${language.percentage}" required><br><br>
        <button type="button" class="removeLanguage">Remove Language</button><br><br>
    `;
        codingContainer.appendChild(languageDiv);
        // Add an event listener to the remove button
        const removeLanguageButton = languageDiv.querySelector(".removeLanguage");
        removeLanguageButton.addEventListener("click", () => {
            codingContainer.removeChild(languageDiv);
        });
    });


    // display education values from backend 
    education.forEach((Institute) => {
        const educationDiv = document.createElement("div");
        educationDiv.innerHTML = `
        <label for="educationtitle">Education Title:</label>
        <input type="text" name="education[title][]" value="${Institute.title}" required><br><br>
        <label for="graduationdate">Graduation Date:</label>
        <input type="text" name="education[date][]" value="${Institute.date}" required><br><br>
        <label for="institutename">Institute Name:</label>
        <input type="text" name="education[institute][]" value="${Institute.institute}" required><br><br>
        <label for="educationdescription">Education Description:</label>
        <textarea name="education[description][]" cols="30" rows="5" required>${Institute.description}</textarea><br><br>
        <button type="button" class="removeEducation">Remove Education</button><br><br>
    `;
        educationContainer.appendChild(educationDiv);


        // Add an event listener to the remove button
        const removeEducationButton = educationDiv.querySelector(".removeEducation");
        removeEducationButton.addEventListener("click", () => {
            educationContainer.removeChild(educationDiv);
        });
    });


    // display experience values from backend  
    experience.forEach((position) => {
        const experienceDiv = document.createElement("div");
        experienceDiv.innerHTML = `
        <label for="position">Position Title:</label>
        <input type="text" name="experience[position][]" value="${position.position}" required><br><br>
        <label for="Timeline">Timeline:</label>
        <input type="text" name="experience[timeline][]" value="${position.timeline}" required><br><br>
        <label for="company">Company Name:</label>
        <input type="text" name="experience[company][]" value="${position.company}" required><br><br>
        <label for="description">Experience Description:</label>
        <textarea name="experience[description][]" cols="30" rows="5" required>${position.description}</textarea><br><br>
        <button type="button" class="removeExperience">Remove Experience</button><br><br>
    `;
        experienceContainer.appendChild(experienceDiv);
        // Add an event listener to the remove button
        const removeExperienceButton = experienceDiv.querySelector(".removeExperience");
        removeExperienceButton.addEventListener("click", () => {
            experienceContainer.removeChild(experienceDiv);
        });
    });

    const resumeDiv = document.createElement("div");
    resumeDiv.innerHTML = `
        <label for="resume">Resume:</label>
        <p>${resume}</p>
        <input type="file" id="resume" name="resume" ><br><br>
    `;
    resumeContainer.appendChild(resumeDiv);
}



// on click add dynamic education
const addEducationButton = document.getElementById("addEducation");
const educationContainer = document.getElementById("education");
function addEducation() {
    const educationDiv = document.createElement("div");
    educationDiv.innerHTML = `
        <label for="educationtitle">Education Title:</label>
        <input type="text" name="education[title][]" required><br><br>
        <label for="graduationdate">Graduation Date:</label>
        <input type="text" name="education[date][]" required><br><br>
        <label for="institutename">Institute Name:</label>
        <input type="text" name="education[institute][]" required><br><br>
        <label for="educationdescription">Education Description:</label>
        <textarea name="education[description][]" cols="30" rows="5" required></textarea><br><br>
        <button type="button" class="removeEducation">Remove Education</button><br><br>
    `;
    educationContainer.appendChild(educationDiv);
    // Add an event listener to the remove button
    const removeEducationButton = educationDiv.querySelector(".removeEducation");
    removeEducationButton.addEventListener("click", () => {
        educationContainer.removeChild(educationDiv);
    });
}
addEducationButton.addEventListener("click", addEducation);


// on click add dynamic experience
const addExperienceButton = document.getElementById("addExperience");
const experienceContainer = document.getElementById("experience");
function addExperience() {
    const experienceDiv = document.createElement("div");
    experienceDiv.innerHTML = `
        <label for="position">Position Title:</label>
        <input type="text" name="experience[position][]" required><br><br>
        <label for="Timeline">Timeline:</label>
        <input type="text" name="experience[timeline][]" required><br><br>
        <label for="company">Company Name:</label>
        <input type="text" name="experience[company][]" required><br><br>
        <label for="description">Experience Description:</label>
        <textarea name="experience[description][]" cols="30" rows="5" required></textarea><br><br>
        <button type="button" class="removeExperience">Remove Experience</button><br><br>
    `;
    experienceContainer.appendChild(experienceDiv);
    // Add an event listener to the remove button
    const removeExperienceButton = experienceDiv.querySelector(".removeExperience");
    removeExperienceButton.addEventListener("click", () => {
        experienceContainer.removeChild(experienceDiv);
    });
}
addExperienceButton.addEventListener("click", addExperience);


// on click add dynamic coding 
const addLanuageButton = document.getElementById("addLanguage");
const codingContainer = document.getElementById("coding");
function addCoding() {
    const languageDiv = document.createElement("div");
    languageDiv.innerHTML = `
        <label for="languagename">Language Name:</label>
        <input type="text" name="coding[name][]" required><br><br>
        <label for="languagepercent">Percentage:</label>
        <input type="text" name="coding[percentage][]" required><br><br>
        <button type="button" class="removeLanguage">Remove Language</button><br><br>
    `;
    codingContainer.appendChild(languageDiv);
    // Add an event listener to the remove button
    const removeLanguageButton = languageDiv.querySelector(".removeLanguage");
    removeLanguageButton.addEventListener("click", () => {
        codingContainer.removeChild(languageDiv);
    });
}
addLanuageButton.addEventListener("click", addCoding);


// Handle form submission
// Function to manually send form data to the server
async function sendDataToServer() {
    const resumeForm = document.getElementById("resumeForm");
    const formData = new FormData(resumeForm); // Use FormData to collect form data

    try {
        const response = await fetch('http://localhost:8000/api/resume', {
            method: 'POST',
            body: formData, // Send FormData directly instead of JSON.stringify
        });

        if (response.status === 200) {
            alert('Resume uploaded successfully.');
        } else {
            alert('Error uploading resume.');
        }
    } catch (error) {
        console.error(error);
        alert('Error uploading resume.', error);
    }
}

// Attach a submit event listener to the form
const resumeForm = document.getElementById("resumeForm");
resumeForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    sendDataToServer(); // Call the function to send data to the server manually
});


// get data from backend 
async function getResumeData() {
    try {
        const res = await fetch('http://localhost:8000/api/resume');

        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log(data);
        setFormFields(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}
window.addEventListener('load', getResumeData);


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