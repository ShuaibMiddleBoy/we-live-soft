async function fetchData() {
    try {
      const response = await fetch("http://localhost:8000/api/home");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data)
      populateData(data[0]); // Assuming the API returns an array and you want the first item
    } catch (error) {
      console.error("Fetch error:", error);
    }
  }

  function populateData(homeData) {
    // Assuming you have HTML elements with these IDs
    document.getElementById("aboutMe").textContent =
      homeData.aboutMe || " ";
    document.getElementById("name").textContent = homeData.name || "";
    document
      .getElementById("resumeLink")
      .setAttribute("href", homeData.resumeLink || "#");
    document
      .getElementById("userImage")
      .setAttribute(
        "src",
        `http://localhost:8000/public/images/${homeData.image}` ||
          "./path/to/default/image.jpg"
      );
    // Populate social links
    // const socialLinksContainer = document.getElementById('socialLinks');
    // homeData.socialLinks.forEach(link => {
    //     const anchor = document.createElement('a');
    //     anchor.setAttribute('href', link.link);
    //     anchor.textContent = link.title; // or use an icon based on the title
    //     socialLinksContainer.appendChild(anchor);
    // });

    // Populate skills
    const skillsContainer = document.getElementById("skills");
    homeData.skills.forEach((skill) => {
      const skillElement = document.createElement("span");
      skillElement.textContent = skill;
      skillsContainer.appendChild(skillElement);
    });

    // Populate addresses
    const addressContainer = document.getElementById("address");
    homeData.address.forEach((addr) => {
      const addressElement = document.createElement("p");
      addressElement.textContent = `${addr.title}: ${addr.value}`;
      addressContainer.appendChild(addressElement);
    });
  }

  document.addEventListener("DOMContentLoaded", fetchData);
