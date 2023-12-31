
        // to set backend data in fields (to not lose data by refreshing)
        function setFormFields(data) {

            const contactContainer = document.getElementById("contact");
            const map = document.getElementById("map");
            const contactInfo = data.contactData;

            const mapDiv = document.createElement("div");
            mapDiv.innerHTML = `
                <label for="map">Map Link:</label>
                <textarea name="map" cols="30" rows="5" required>${data.map}</textarea><br><br>
                `;
                map.appendChild(mapDiv);


            contactInfo.forEach((Info) => {
                const contactDiv = document.createElement("div");
                contactDiv.innerHTML = `
                <label for="icon">Icon Class:</label>
                <input type="text" name="contact[icon][]" value="${Info.icon}" required><br><br>

                <label for="info">Contact Info:</label>
                <input type="text" name="contact[info][]" value="${Info.info}" required><br><br>

                <button type="button" class="removeInfo">Remove Info</button><br><br>
                `;
                contactContainer.appendChild(contactDiv);


                // Add an event listener to the remove button
                const removeInfoButton = contactDiv.querySelector(".removeInfo");
                removeInfoButton.addEventListener("click", () => {
                    contactContainer.removeChild(contactDiv);
                });
            });
        }


        // onclick add fields 
        const addInfoButton = document.getElementById("addInfo");
        const contactContainer = document.getElementById("contact");

        function addInfo() {
            const contactDiv = document.createElement("div");

            contactDiv.innerHTML = `
                <label for="icon">Icon Class:</label>
                <input type="text" name="contact[icon][]" required><br><br>

                <label for="info">Contact Info:</label>
                <input type="text" name="contact[info][]" required><br><br>

                <button type="button" class="removeInfo">Remove Info</button><br><br>
            `;
            contactContainer.appendChild(contactDiv);

            // Add an event listener to the remove button
            const removeInfoButton = contactDiv.querySelector(".removeInfo");
            removeInfoButton.addEventListener("click", () => {
                contactContainer.removeChild(contactDiv);
            });
        }
        addInfoButton.addEventListener("click", addInfo);

        // Handle form submission
        // Function to manually send form data to the server
        async function sendDataToServer() {
            const contactForm = document.getElementById("contactForm");
            const formData = new FormData(contactForm); // Use FormData to collect form data

            try {
                const response = await fetch('http://localhost:8000/api/contactInfo', {
                    method: 'POST',
                    body: formData, // Send FormData directly instead of JSON.stringify
                });

                if (response.status === 200) {
                    alert('Contact uploaded successfully.');
                } else {
                    alert('Error uploading contact.');
                }
            } catch (error) {
                console.error(error);
                alert('Error uploading contact.', error);
            }
        }


        // Attach a submit event listener to the form
        const contactForm = document.getElementById("contactForm");
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            sendDataToServer(); // Call the function to send data to the server manually
        });



        // get data from backend 
        async function getContactData() {
            try {
                const res = await fetch('http://localhost:8000/api/contactInfo');

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

        window.addEventListener('load', getContactData);



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