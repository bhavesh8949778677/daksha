// mobile menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuPanel = document.getElementById('mobileMenuPanel');
    const isOpen = mobileMenu.style.display === 'block';
    mobileMenu.style.display = isOpen ? 'none' : 'block';
    mobileMenuPanel.classList.toggle('hidden', isOpen);
  }

  function openLogin() {
    document.getElementById('loginModal').style.display = 'flex';
  }

  function closeLogin() {
    document.getElementById('loginModal').style.display = 'none';
    return false;
  }

  //project things
const projects = [
      {
        companyName: "Company A",
        companyLogo: "../static/daksha/assets/logo.png",
        title: "Excel for beginners : Pivot Tables",
        stars: 1,
        programmingLanguage: "MS Excel",
        duration: "2 hours",
        credits: 10,
        category:"Business Development",
        skills: ["Analyzing & summarize data", "Generating visual graphs from data"]
      },
      {
        companyName: "Company A",
        companyLogo: "../static/daksha/assets/cheque.png",
        title:"Python programming - Music Player",
        stars: 2,
        programmingLanguage: "Python",
        duration: "15 hours",
        credits: 50,
        category:"Programming ",
        skills: ["Application of Tkinter and Pygame", "In-bult method mixer()", ]
      },
      {
        companyName: "Company A",
        title:"Advanced JAVA development",
        companyLogo: "../static/daksha/assets/comp-3.png",
        stars: 3.5,
        programmingLanguage: "JAVA",
        duration: "30 hours",
        category:"Programming",
        credits: 70,
        skills: ["Eyewitness module", "Investigator and Admin module", "An effective image detection system"]
      },
      
      // Add more project data objects as needed
    ];

    // Function to generate the project cards
    function generateProjectCards() {
      const projectContainer = document.getElementById("projectContainer");
      
      // Generate the project cards
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        // Create the project card element
        const card = document.createElement("div");
        card.className = "bg-white text-gray-900 pl-8 pr-8 pt-0 pb-4 rounded-xl shadow-2xl relative max-w-md justify-center";

// Add category section
        
        card.innerHTML = `
          <div class="bg-indigo-300 text-gray-900 px-0  flex justify-center py-1 rounded-tl-none rounded-tr-none rounded-b-md mb-6  ">${project.category}</div>
          <div class="mb-4 flex justify-between items-center">

            <div class="flex items-center">
              <span class="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-xs">
                <img src="${project.companyLogo}" alt="Logo" class="h-8 object-contain" />
              </span>
            </div>

            <div class="flex items-center">
              <div class="flex items-center">
                ${getStarIcons(project.stars)}
                <p class="sr-only">${project.stars} out of 5 stars</p>
                <a class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">Level</a>
              </div>
            </div>
          </div>
          <div  class="font-bold text-base text-gray-800 mb-2">${project.title}</div>

          <div class="pt-0">
          
            ${project.programmingLanguage === 'MS Excel' ? 
      `<p class="flex items-center  py-0">
         <svg class="w-7 h-7 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                     <rect x="3" y="3" width="18" height="18" rx="2" ry="2" fill="transparent" stroke="green"></rect>
                 </svg>
         <span class="text-sm">Software - ${project.programmingLanguage}</span>
       </p>` : 
      `<p class="flex items-center -ml-2 py-0">
         <span class="text-green-600 font-bold text-xl mr-2">&lt;/&gt;</span>
         <span class="text-sm">Programming Language - ${project.programmingLanguage}</span>
       </p>`}

            <div class="mb-0 flex justify-between">
              <p class="flex items-center py-4 text-sm">
                <svg class="w-7 h-7 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                <span class="text-sm">Duration: ${project.duration}</span>
              </p>

              <p class="flex items-center py-2">
                <svg class="w-8 h-8 mr-1 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 7h8M8 12h8M8 17h8"></path>
                </svg>
                <span class="text-sm">Credits: ${project.credits}</span>
              </p>
            </div>
          </div>

          <p class="text-sm mb-4">Key skills that you will gain:</p>
          <div class="text-sm">
            ${getSkills(project.skills)}
            <button class="w-full py-4 my-4 text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md">View Project</button>
          </div>
        `;

        // Add the project card to the container
        projectContainer.appendChild(card);
      }
    }

    // Function to generate star icons based on the rating
    function getStarIcons(stars) {
      const filledStars = Math.floor(stars);
      const halfStar = stars % 1 !== 0;
      const emptyStars = 5 - filledStars - (halfStar ? 1 : 0);

      return `
        ${getFilledStars(filledStars)}
        ${halfStar ? getHalfStar() : ""}
        ${getEmptyStars(emptyStars)}
      `;
    }

    // Function to generate filled star icons
    function getFilledStars(count) {
      return `<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getStarPath()}</svg>`.repeat(count);
    }

    // Function to generate half star icon
    function getHalfStar() {
      return `<svg class="text-gray-900 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getHalfStarPath()}</svg>`;
    }

    // Function to generate empty star icons
    function getEmptyStars(count) {
      return `<svg class="text-gray-200 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getStarPath()}</svg>`.repeat(count);
    }

    // Function to get the star SVG path
    function getStarPath() {
      return `
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"/>
      `;
    }

    // Function to get the half star SVG path
    function getHalfStarPath() {
      return `
        <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591V2.884z" clip-rule="evenodd"/>
      `;
    }

    // Function to generate skill icons
    function getSkills(skills) {
      return skills
        .map(
          (skill) => `
          <p class="flex mt-1">
            <svg class="w-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            ${skill}
          </p>
        `
        )
        .join("");
    }

    // Call the function to create project cards
    generateProjectCards();

    function updateCardLayout() {
  const screenWidth = window.innerWidth;
  const projectContainer = document.getElementById("projectContainer");

  if (screenWidth >= 1024) { // Large screen
    projectContainer.classList.remove("grid-cols-1", "grid-cols-2");
    projectContainer.classList.add("grid-cols-3");
  } else if (screenWidth >= 768) { // Medium screen
    projectContainer.classList.remove("grid-cols-1", "grid-cols-3");
    projectContainer.classList.add("grid-cols-2");
  } else { // Small screen
    projectContainer.classList.remove("grid-cols-2", "grid-cols-3");
    projectContainer.classList.add("grid-cols-1");
    projectContainer.classList.add("justify-center");

  }
}

// Initial call to update card layout
updateCardLayout();

// Add event listener to update card layout when window is resized
window.addEventListener("resize", updateCardLayout);

