const Base = "http://localhost:8000";

// get data from backend of services
async function getServicesData() {
  try {
    const res = await fetch(`${Base}/api/v1/services`);
    if (!res.status === 200) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    locateServicesData(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

getServicesData();

// add dynamic data to services
const locateServicesData = (data) => {
  const servicesContainer = document.querySelector(".servicesContainer");
  data.services.forEach((service) => {
    const serviceDiv = document.createElement("div");
    serviceDiv.classList.add("col");
    serviceDiv.innerHTML = `
            <div class="image">
            <img src="${Base}/public/images/${service.serviceImage}" alt="image">
            </div>
            <h4>${service.serviceTitle}</h4>
            <p>${service.serviceDesc}.</p>`;
    servicesContainer.appendChild(serviceDiv);
  });

  const clientsContainter = document.querySelector(".clientsContainter");
  data.clients.forEach((client) => {
    const clientDiv = document.createElement("div");
    clientDiv.classList.add("col");
    clientDiv.innerHTML = `
        <a href="">
        <img src="${Base}/public/images/${client.clientImage}"
            alt="client">
        </a>`;
    clientsContainter.appendChild(clientDiv);
  });

  const feedbacksContainer = document.querySelector(".feedbacksContainer");
  data.feedbacks.forEach((feedback) => {
    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("col");
    feedbackDiv.innerHTML = `
        <div class="testimonail-credits">
        <div class="testimonail-picture">
        <img src="${Base}/public/images/${feedback.image}" alt="">
        </div>
        <div class="testimonail-author-info">
            <h5>${feedback.reviewer}</h5>
            <p>${feedback.company}</p>
        </div>
        </div>
        <div class="testimonail-content">
        <p>${feedback.description}</p>
        </div>`;
    feedbacksContainer.appendChild(feedbackDiv);
  });

  const plansContainer = document.querySelector(".plansContainer");
  data.plans.forEach((plan) => {
    const planDiv = document.createElement("div");
    planDiv.classList.add("col");
    planDiv.innerHTML = `
         <p>${plan.name}</p>
         <h4>${plan.price}</h4>
         <button>FREE TRIAL</button>
         <P>${plan.description}</P>`;
    plansContainer.appendChild(planDiv);
  });
};
