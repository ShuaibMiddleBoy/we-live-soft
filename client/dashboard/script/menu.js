  // to set backend data in fields (to not lose data by refreshing)
  function setFormFields(data) {

    const logoContainer = document.getElementById("logo");
    const { logoImage, menuItems } = data;

    const logoDiv = document.createElement("div");
    logoDiv.innerHTML = `
    <label for="logoImage">Logo Image:</label>
    <img src="http://localhost:8000/public/images/${logoImage}" style="max-width: 180px;" alt="Resume" ><br><br>
    <input type="file" id="logoImage" name="logoImage" accept="image/*" ><br><br>
    `;
    logoContainer.appendChild(logoDiv);

    menuItems.forEach((menuItem) => {
        const menuItemDiv = document.createElement("div");
        menuItemDiv.innerHTML = `
        <label for="menuItemTitle">Menu Item Title:</label>
        <input type="text" name="menuItems[title][]" value="${menuItem.title}" required><br><br>
        <label for="menuItemUrl">Menu Item URL:</label>
        <input type="text" name="menuItems[url][]" value="${menuItem.link}" required><br><br>
        <button type="button" class="removeMenuItem">Remove Menu Item</button><br><br>
    `;
        menuItemsContainer.appendChild(menuItemDiv);
        // Add an event listener to the remove button
        const removeMenuItemButton = menuItemDiv.querySelector(".removeMenuItem");
        removeMenuItemButton.addEventListener("click", () => {
            menuItemsContainer.removeChild(menuItemDiv);
        });
    });
}


// JavaScript code to dynamically add menu item fields
const addMenuItemButton = document.getElementById("addMenuItem");
const menuItemsContainer = document.getElementById("menuItems");

function addMenuItem() {
    const menuItemDiv = document.createElement("div");

    menuItemDiv.innerHTML = `
        <label for="menuItemTitle">Menu Item Title:</label>
        <input type="text" name="menuItems[title][]" required><br><br>
        
        <label for="menuItemUrl">Menu Item URL:</label>
        <input type="url" name="menuItems[url][]" required><br><br>
        
        <button type="button" class="removeMenuItem">Remove Menu Item</button><br><br>
    `;

    menuItemsContainer.appendChild(menuItemDiv);

    // Add an event listener to the remove button
    const removeMenuItemButton = menuItemDiv.querySelector(".removeMenuItem");
    removeMenuItemButton.addEventListener("click", () => {
        menuItemsContainer.removeChild(menuItemDiv);
    });
}

addMenuItemButton.addEventListener("click", addMenuItem);



// sending data to backend 
const menuForm = document.getElementById("menuForm");

menuForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(menuForm);

    try {
        const response = await fetch('http://localhost:8000/api/menu', {
            method: 'POST',
            body: formData,
        });
        if (response.status === 200) {
            console.log('Menu updated successfully');
            alert('Menu updated successfully')
        } else {
            console.error('Failed to update menu ');
            alert('Failed to update menu ')
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


// get data from backend 
async function getMenuData() {
    try {
        const res = await fetch('http://localhost:8000/api/menu');

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
window.addEventListener('load', getMenuData);


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