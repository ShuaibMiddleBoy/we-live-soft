const BaseAPI = 'http://localhost:8000';
const loginPopup = document.querySelector(".popup-container");
const registerPopup = document.querySelector(".popup-register-container");
const loginBtn = document.querySelector(".login-btn");
const logoutBtn = document.querySelector(".logout-btn");

function showLoginPopup() {
  loginPopup.style.display = "flex";
}

function hideLoginPopup() {
  loginPopup.style.display = "none";
}


function hideRegisterPopup() {
  registerPopup.style.display = "none";
}

function toggleRegisterForm() {
  loginPopup.style.display = "none";
  registerPopup.style.display = "flex";
}


function handleLoginSubmit(event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const formData = {email, password}

    fetch(`${BaseAPI}/api/v1/auth/login`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("Response from server:", data);
       if (data.success) {
       localStorage.setItem('userData', JSON.stringify(data));
        window.location.href = '/client'     
}else{
  Toastify({
    text: data.message ,
    backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
    className: "error",
}).showToast();
} })
  .catch((err) => {
    console.log('Error sending data:', err);
  });
}


function handleRegisterSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value;
  const phone = document.getElementById('phone').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;
  const confirmPassword = document.getElementById('confirmPassword').value;

  const formData = {name, phone, email, password, confirmPassword}

  fetch(`${BaseAPI}/api/v1/auth/register`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
    
  })
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    console.log("Response from server:", data);
    if(data.success){
      localStorage.setItem('userData', JSON.stringify(data));
      window.location.href = '/client'     
    }else{
      Toastify({
        text: data.message ,
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        className: "error",
    }).showToast();
    }
  })
  .catch((err) => {
    console.log('Error sending data:', err);
  });
}




const userData = JSON.parse(localStorage.getItem('userData'));
// Check if userData is not null or undefined
if (userData) {
  var userName = userData.user.name;
  userName = userName.toLowerCase();
}


// Check if user data and role exist
if (userData && userData.user && userData.user.role === 1) {
  // Display the dashboard link
  const dashboardLink = document.createElement('div');
  dashboardLink.className = 'dashboard';
  dashboardLink.innerHTML = '<a href="./dashboard/">Dashboard</a>';
  document.body.prepend(dashboardLink);
}


function updateNavbar() {
  var navbar = document.getElementById('navbar');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const isLoggedIn = userData && userData.token; // Assuming 'token' indicates a logged-in user

  var button = document.createElement('div');
  button.setAttribute('class', 'loginlogout');
  if (isLoggedIn) {
    button.innerHTML = ` <b>Welcome ${userName}</b> <i class="logout-btn fa fa-power-off" onclick="logoutFunc()"></i>`;
  } else {
    button.innerHTML = '<i class="login-btn fa fa-lock" onclick="showLoginPopup()"></i>';
  }

  navbar.appendChild(button);
}




function logoutFunc() {
    localStorage.removeItem('userData');
  console.log('Logged out');
  window.location.href = '/client'
}

updateNavbar();


