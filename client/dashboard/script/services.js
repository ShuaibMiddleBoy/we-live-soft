
        // to set backend data in fields (to not lose data by refreshing)
        function setFormFields(data) {

            const { services, clients, feedbacks, plans } = data;
            console.log(feedbacks);
            services.forEach((service) => {
                const serviceDiv = document.createElement('div');
                serviceDiv.innerHTML = `
            <label for="serviceimage">Service Image:</label>
            <img src="http://localhost:8000/public/images/${service.serviceImage}" style="max-width: 180px;" alt="Resume" ><br><br>
            <input type="file" name="servicesImage" value="${service.serviceImage}" multiple id="serviceimage"><br><br>
            <label for="servicetitle">Service Title:</label>
            <input type="text" name="services[title][]" value="${service.serviceTitle}" id="servicetitile" required><br><br>
            <label for="servicedesc">Service Description:</label>
            <textarea name="services[desc][]" cols="30" rows="5" required>${service.serviceDesc}</textarea><br><br>
            <button type="button" class="removeService">Remove Service</button><br><br><br>
            `;
            servicesContainer.appendChild(serviceDiv);

                // to remove service 
                const removeServiceButton = serviceDiv.querySelector('.removeService');
                removeServiceButton.addEventListener('click', () => {
                    servicesContainer.removeChild(serviceDiv);
                })
            });



            clients.forEach((client) => {
                const clientDiv = document.createElement('div');
            clientDiv.innerHTML = `
            <label for="clientimage">Client Image:</label>
            <img src="http://localhost:8000/public/images/${client.clientImage}" style="max-width: 180px;" alt="Resume" ><br><br>
            <input type="file" name="clientsImage" value="${client.clientImage}" multiple id="clientimage"><br><br>
            <button type="button" class="removeClient">Remove Client</button><br><br><br>
            `;
            clientsContainer.appendChild(clientDiv);

            // to remove service 
            const removeClientButton = clientDiv.querySelector('.removeClient');
            removeClientButton.addEventListener('click', () => {
                clientsContainer.removeChild(clientDiv);
            })
            });




            feedbacks.forEach((feedback) => {
                const feedbackDiv = document.createElement('div');
            feedbackDiv.innerHTML = `
            <label for="feedbackimage">Reviewer Image:</label>
            <img src="http://localhost:8000/public/images/${feedback.image}" style="max-width: 180px;" alt="Resume" ><br><br>
            <input type="file" name="feedbacksImage" value="${feedback.image}" multiple id="feedbackimage" ><br><br>
            <label for="feedbackReviewer">Reviewer Name:</label>
            <input type="text" name="feedbacks[reviewer][]" value="${feedback.reviewer}" id="feedbackreviewer" required><br><br>
            <label for="feedbackcompany">Reviewer Company:</label>
            <input type="text" name="feedbacks[company][]" value="${feedback.company}" id="feedbackcompany" required><br><br>
            <label for="feedbackdesc">Feedback:</label>
            <textarea name="feedbacks[desc][]" cols="30" rows="5" id="feedbackdesc" required>${feedback.description}</textarea><br><br>
            <button type="button" class="removeFeedback">Remove Feedback</button><br><br><br>
            `;
            feedbacksContainer.appendChild(feedbackDiv);

            // to remove feedback 
            const removeFeedbackButton = feedbackDiv.querySelector('.removeFeedback');
            removeFeedbackButton.addEventListener('click', () => {
                feedbacksContainer.removeChild(feedbackDiv);
            })
            });



            plans.forEach((plan) => {
                const planDiv = document.createElement('div');
            planDiv.innerHTML = `
            <label for="planname">Plan Name:</label>
            <input type="text" name="plans[name][]" value="${plan.name}" id="planname" required><br><br>
            <label for="planPrice">Plan Price:</label>
            <input type="text" name="plans[price][]" value="${plan.price}" id="planprice" required><br><br>
            <label for="plandesc">Plan Description:</label>
            <textarea name="plans[desc][] cols="30" rows="5" id="plandesc" required>${plan.description}</textarea><br><br>
            <button type="button" class="removeplan">Remove plan</button><br><br><br>
            `;
            pricingContainer.appendChild(planDiv);

            // to remove plan 
            const removeplanButton = planDiv.querySelector('.removeplan');
            removeplanButton.addEventListener('click', () => {
                pricingContainer.removeChild(planDiv);
            })
            });

        }


        




        // for  services section 
        const addServiceButton = document.getElementById('addService');
        const servicesContainer = document.getElementById('services');

        const addService = () => {
            const serviceDiv = document.createElement('div');
            serviceDiv.innerHTML = `
            <label for="serviceimage">Service Image:</label>
            <input type="file" name="servicesImage" multiple id="serviceimage" ><br><br>
            <label for="servicetitle">Service Title:</label>
            <input type="text" name="services[title][]" id="servicetitile" required><br><br>
            <label for="servicedesc">Service Description:</label>
            <textarea name="services[desc][]" cols="30" rows="5" required></textarea><br><br>
            <input type="text" name="services[desc][]" id="servicedesc" required><br><br>
            <button type="button" class="removeService">Remove Service</button><br><br><br>
            `;
            servicesContainer.appendChild(serviceDiv);

            // to remove service 
            const removeServiceButton = serviceDiv.querySelector('.removeService');
            removeServiceButton.addEventListener('click', () => {
                servicesContainer.removeChild(serviceDiv);
            })
        }
        addServiceButton.addEventListener('click', addService)


        // for clients section 
        const addClientButton = document.getElementById('addClient');
        const clientsContainer = document.getElementById('clients');

        const addClient = () => {
            const clientDiv = document.createElement('div');
            clientDiv.innerHTML = `
            <label for="clientimage">Client Image:</label>
            <input type="file" name="clientsImage" multiple id="clientimage" ><br><br>
            <button type="button" class="removeClient">Remove Client</button><br><br><br>
            `;
            clientsContainer.appendChild(clientDiv);

            // to remove service 
            const removeClientButton = clientDiv.querySelector('.removeClient');
            removeClientButton.addEventListener('click', () => {
                clientsContainer.removeChild(clientDiv);
            })
        }
        addClientButton.addEventListener('click', addClient)


        // for feedbacks section 
        const addFeedbackButton = document.getElementById('addFeedback');
        const feedbacksContainer = document.getElementById('feedbacks');

        const addFeedback = () => {
            const feedbackDiv = document.createElement('div');
            feedbackDiv.innerHTML = `
            <label for="feedbackimage">Reviewer Image:</label>
            <input type="file" name="feedbacksImage" multiple id="feedbackimage" ><br><br>
            <label for="feedbackReviewer">Reviewer Name:</label>
            <input type="text" name="feedbacks[reviewer][]" id="feedbackreviewer" required><br><br>
            <label for="feedbackcompany">Reviewer Company:</label>
            <input type="text" name="feedbacks[company][]" id="feedbackcompany" required><br><br>
            <label for="feedbackdesc">Feedback:</label>
            <textarea name="feedbacks[desc][]" cols="30" rows="5" id="feedbackdesc" required></textarea><br><br>
            <button type="button" class="removeFeedback">Remove Feedback</button><br><br><br>
            `;
            feedbacksContainer.appendChild(feedbackDiv);

            // to remove service 
            const removeFeedbackButton = feedbackDiv.querySelector('.removeFeedback');
            removeFeedbackButton.addEventListener('click', () => {
                feedbacksContainer.removeChild(feedbackDiv);
            })
        }
        addFeedbackButton.addEventListener('click', addFeedback)



        // for plans section 
        const addPlanButton = document.getElementById('addPlan');
        const pricingContainer = document.getElementById('pricing');

        const addPlan = () => {
            const planDiv = document.createElement('div');
            planDiv.innerHTML = `
            <label for="planname">Plan Name:</label>
            <input type="text" name="plans[name][]" id="planname" required><br><br>
            <label for="planPrice">Plan Price:</label>
            <input type="text" name="plans[price][]" id="planprice" required><br><br>
            <label for="plandesc">Plan Description:</label>
            <textarea name="plans[desc][] cols="30" rows="5" id="plandesc" required></textarea><br><br>
            <button type="button" class="removeplan">Remove plan</button><br><br><br>
            `;
            pricingContainer.appendChild(planDiv);

            // to remove service 
            const removeplanButton = planDiv.querySelector('.removeplan');
            removeplanButton.addEventListener('click', () => {
                pricingContainer.removeChild(planDiv);
            })
        }
        addPlanButton.addEventListener('click', addPlan)


        // sending form data to backend 
        const servicesForm = document.getElementById('servicesForm');

        servicesForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = new FormData(servicesForm);

            try {
                const response = await fetch('http://localhost:8000/api/services', {
                    method: 'POST',
                    body: formData
                });

                if (response.status === 200) {
                    console.log(formData);
                    console.log('Services updated successfully');
                    alert('Services updated successfully')
                } else {
                    console.error('Failed to update services ');
                    alert('Failed to update services ');
                }
            } catch (err) {
                console.error('Error:', err);
            }
        })



        // get data from backend 
        async function getServicesData() {
            try {
                const res = await fetch('http://localhost:8000/api/services');

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
        window.addEventListener('load', getServicesData);


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