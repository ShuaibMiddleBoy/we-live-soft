document.addEventListener("DOMContentLoaded", function () {
const addressesContainer = document.getElementById("addresses");
const socialLinksContainer = document.getElementById("socialLinks");
const imageInput = document.getElementById("image");
document.getElementById("addAddress").addEventListener("click", function() {
addAddressField();
});

document.getElementById("addSocialLink").addEventListener("click", function() {
addSocialLinkField();
});

document.getElementById("createHome").addEventListener("click", function() {
submitForm();
});

function addAddressField(title = '', value = '') {
const addressDiv = document.createElement("div");
addressDiv.classList.add("address");

addressDiv.innerHTML = `
<div>
  <label>Address Title:</label>
  <input type="text" class="addressTitle" value="${title}" required>
  </div>
  <div>
  <label>Address Value:</label>
  <input type="text" class="addressValue" value="${value}" required>
  </div>
  <button type="button" class="removeAddress">Remove Address</button>
 
`;

addressDiv.querySelector(".removeAddress").addEventListener("click", function() {
  addressesContainer.removeChild(addressDiv);
});

addressesContainer.appendChild(addressDiv);
}

function addSocialLinkField(title = '', link = '') {
  const socialLinkDiv = document.createElement("div");
  socialLinkDiv.classList.add("socialLink");

  socialLinkDiv.innerHTML = `
  <div>
      <label>Title:</label>
      <input type="text" class="socialLinkTitle" value="${title}" required>
  </div>
  <div>
      <label>Link:</label>
      <input type="text" class="socialLinkLink" value="${link}" required>
  </div>
  <button type="button" class="removeSocialLink">Remove Social Link</button>
  `;

  socialLinkDiv.querySelector(".removeSocialLink").addEventListener("click", function() {
      socialLinksContainer.removeChild(socialLinkDiv);
  });

  socialLinksContainer.appendChild(socialLinkDiv);
}

async function submitForm() {
const formData = new FormData();
if (imageInput.files.length > 0) {
formData.append("image", imageInput.files[0]);
}
formData.append("name", document.getElementById("name").value);
formData.append("skills", document.getElementById("skills").value);
formData.append("aboutMe", document.getElementById("aboutMe").value);
formData.append("resumeLink", document.getElementById("resumeLink").value);

addressesContainer.querySelectorAll(".address").forEach((addressDiv, index) => {
  formData.append(`address[${index}][title]`, addressDiv.querySelector(".addressTitle").value);
  formData.append(`address[${index}][value]`, addressDiv.querySelector(".addressValue").value);
});

socialLinksContainer.querySelectorAll(".socialLink").forEach((linkDiv, index) => {
  formData.append(`socialLinks[${index}][title]`, linkDiv.querySelector(".socialLinkTitle").value);
  formData.append(`socialLinks[${index}][link]`, linkDiv.querySelector(".socialLinkLink").value);
});
try {
  const response = await fetch("http://localhost:8000/api/home", {
    method: "POST",
    body: formData,
  });

  if (response.status === 201 || response.status === 200) {
    alert("Home created/updated successfully.");
  } else {
    alert("Error creating/updating home.");
  }
} catch (error) {
  console.error(error);
  alert("Error creating/updating home.", error);
}
}
fetchAndPopulateHome()
async function fetchAndPopulateHome() {
try {
  const response = await fetch(`http://localhost:8000/api/home`);
  if (response.ok) {
    const homeData = await response.json();
    console.log(homeData);
    populateForm(homeData);
  } else {
    console.error("Error fetching home data: ", response.statusText);
  }
} catch (error) {
  console.error("Error fetching home data: ", error);
}
}

function populateForm(homeData) {
document.getElementById("name").value = homeData[0].name || '';
document.getElementById("skills").value = homeData[0].skills || '';
document.getElementById("aboutMe").value = homeData[0].aboutMe || '';
document.getElementById("resumeLink").value = homeData[0].resumeLink || '';

addressesContainer.innerHTML = '';
homeData[0].address.forEach(address => {
  console.log(address);
  addAddressField(address.title, address.value);
});
socialLinksContainer.innerHTML = '';
homeData[0].socialLinks.forEach(link => {
  addSocialLinkField(link.title, link.link);
});

if (homeData[0].image) {
  console.log(homeData[0].image);
// Add an image element to show the current image
// For example, if you have a div with id 'currentImageContainer'
const currentImageContainer = document.getElementById('currentImageContainer');
currentImageContainer.innerHTML = `<img src="http://localhost:8000/public/images/${homeData[0].image}" alt="Current Image" style="max-width: 200px;">`;
// Update 'path/to/images/' with the actual path where images are stored
}
}

// Uncomment the line below and replace 'some-home-id' with a real ID to test fetching and populating data
// fetchAndPopulateHome('some-home-id');

// Initialize form with one address and one social link field
addAddressField();
addSocialLinkField();
});



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