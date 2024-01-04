// get resume data from backend 
const getResumeData = async () => {
    try {
        const res = await fetch('http://localhost:8000/api/v1/resume');
        if (!res.status === 200) {
            throw new Error('Network response was not ok');
        }
        const data = await res.json();
        locateResumeData(data);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

getResumeData();


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
