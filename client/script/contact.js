const Base = 'http://localhost:8000';

// add dynamic data to contact page
const locateContactData = (data) => {
  const mapContainer = document.querySelector(".map");
  const map = document.createElement("iframe");
  map.setAttribute("src", `${data.map}`);
  map.setAttribute("width", "100%");
  map.setAttribute("height", "100%");
  map.setAttribute("style", "border:0;");
  map.setAttribute("loading", "lazy");
  map.setAttribute("referrerpolicy", "no-referrer-when-downgrade");
  map.classList.add("mapIframe");
  mapContainer.appendChild(map);

  const infoContainer = document.querySelector(".info-list-w-icons");
  data.contactData.forEach((info) => {
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h5><i class="${info.icon}"></i>${info.info}</h5>`;
    infoContainer.append(infoDiv);
  });
};
// get data from backend  of contact
const getContactData = async () => {
  try {
    const res = await fetch(`${Base}/api/v1/contactInfo`);
    if (!res.status === 200) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    locateContactData(data);
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
};

getContactData();

// POST METHOD Using Fetch Api For Contact Form
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

form.addEventListener("submit", async (e) => {
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
    const response = await fetch(`${Base}/api/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        // Show success toast
        Toastify({
          text: "Form submitted successfully!",
          className: "custom-toast",
          close: true,
          duration: 3000,
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

// map skeleton loading effect
const mapContainer = document.querySelector(".map");
const map = document.querySelector(".mapIframe");
const gRecapttcha = document.querySelector(".g-recaptcha");
const recaptchaContainer = document.querySelector(".recaptchaContainer");
// map.setAttribute('src', "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2990.274257380938!2d-70.56068388481569!3d41.45496659976631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e52963ac45bbcb%3A0xf05e8d125e82af10!2sDos%20Mas!5e0!3m2!1sen!2sus!4v1671220374408!5m2!1sen!2sus")

gRecapttcha.setAttribute("data-sitekey", "YOUR_SITE_KEY");
mapContainer.classList.remove("loading");
recaptchaContainer.classList.remove("loading");
