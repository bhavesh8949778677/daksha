// const data = [
//   {
//     companyName: "Company A",
//     companyLogo: "comp-2.png",
//     stars: 4,
//     programmingLanguage: "Python",
//     duration: "30 hours",
//     credits: 40,
//     skills: ["web development", "web development", "web development"]
//   },
//   // Add more data objects as needed
// ];

// const container = document.querySelector('.container');

// data.forEach(item => {
//   const card = document.createElement('div');
//   card.classList.add('bg-white', 'text-gray-900', 'p-8', 'rounded-xl', 'shadow-2xl', 'relative', 'max-w-md');

//   // Set company image
//   const companyImage = document.createElement('div');
//   companyImage.classList.add('mb-4', 'flex', 'justify-between', 'items-center');
//   const logoImage = document.createElement('img');
//   logoImage.src = item.companyLogo;
//   logoImage.alt = 'Logo';
//   logoImage.classList.add('h-8', 'object-contain');
//   const companyLogo = document.createElement('span');
//   companyLogo.classList.add('uppercase', 'px-3', 'py-1', 'bg-indigo-200', 'text-indigo-900', 'rounded-2xl', 'text-sm');
//   companyLogo.appendChild(logoImage);
//   companyImage.appendChild(companyLogo);
//   card.appendChild(companyImage);

//   // Set stars
//   const starsContainer = document.createElement('div');
//   starsContainer.classList.add('flex', 'items-center');
//   for (let i = 0; i < item.stars; i++) {
//     const starIcon = document.createElement('svg');
//     starIcon.classList.add('text-gray-900', 'h-5', 'w-5', 'flex-shrink-0');
//     starIcon.setAttribute('viewBox', '0 0 20 20');
//     starIcon.setAttribute('fill', 'currentColor');
//     starIcon.setAttribute('aria-hidden', 'true');
//     starIcon.innerHTML = '<path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>';
//     starsContainer.appendChild(starIcon);
//   }
//   const starsText = document.createElement('p');
//   starsText.classList.add('sr-only');
//   starsText.textContent = `${item.stars} out of 5 stars`;
//   starsContainer.appendChild(starsText);
//   const levelLink = document.createElement('a');
//   levelLink.href = '#';
//   levelLink.classList.add('ml-3', 'text-sm', 'font-medium', 'text-indigo-600', 'hover:text-indigo-500');
//   levelLink.textContent = 'Level';
//   starsContainer.appendChild(levelLink);
//   companyImage.appendChild(starsContainer);

//   // Set programming language
//   const programmingLanguage = document.createElement('p');
//   programmingLanguage.classList.add('flex', 'items-center', '-ml-2', 'py-2');
//   programmingLanguage.innerHTML = `<span class="text-green-600 font-bold text-xl mr-2">&lt;/&gt;</span> Programming Language - ${item.programmingLanguage}`;
//   card.appendChild(programmingLanguage);

//   // Set duration and credits
//   const durationCreditsContainer = document.createElement('div');
//   durationCreditsContainer.classList.add('mb-2', 'flex', 'justify-between');
//   const durationText = document.createElement('p');
//   durationText.classList.add('flex', 'items-center', 'py-4');
//   durationText.innerHTML = `<svg class="w-7 h-7 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> Duration: ${item.duration}`;
//   durationCreditsContainer.appendChild(durationText);
//   const creditsText = document.createElement('p');
//   creditsText.classList.add('flex', 'items-center', 'py-4');
//   creditsText.innerHTML = `<svg class="w-8 h-8 mr-1 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 7h8M8 12h8M8 17h8"></path></svg> Credits: ${item.credits}`;
//   durationCreditsContainer.appendChild(creditsText);
//   card.appendChild(durationCreditsContainer);

//   // Set skills
//   const skillsText = document.createElement('p');
//   skillsText.classList.add('text-base', 'mb-4');
//   skillsText.textContent = 'Key skills that you will gain during this project:';
//   card.appendChild(skillsText);
//   const skillsContainer = document.createElement('div');
//   skillsContainer.classList.add('text-base');
//   item.skills.forEach(skill => {
//     const skillItem = document.createElement('p');
//     skillItem.classList.add('flex', 'mt-2');
//     skillItem.innerHTML = `<svg class="w-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>${skill}`;
//     skillsContainer.appendChild(skillItem);
//   });
//   card.appendChild(skillsContainer);

//   // Set "View Project" button
//   const viewProjectButton = document.createElement('button');
//   viewProjectButton.classList.add('w-full', 'py-4', 'my-4', 'text-white', 'border', 'bg-indigo-600', 'border-indigo-600', 'hover:bg-transparent', 'hover:text-indigo-600', 'rounded-md');
//   viewProjectButton.textContent = 'View Project';
//   card.appendChild(viewProjectButton);

//   // Add the card to the container
//   container.appendChild(card);
// });
const projects = [
      {
        companyName: "Company A",
        companyLogo: "comp-2.png",
        stars: 5,
        programmingLanguage: "Python",
        duration: "30 hours",
        credits: 40,
        skills: ["web development", "web development", "web development"]
      },
      {
        companyName: "Company A",
        companyLogo: "comp-2.png",
        stars: 4,
        programmingLanguage: "Python",
        duration: "30 hours",
        credits: 40,
        skills: ["web development", "web development", "web development"]
      },
      {
        companyName: "Company A",
        companyLogo: "comp-2.png",
        stars: 3,
        programmingLanguage: "Python",
        duration: "30 hours",
        credits: 40,
        skills: ["web development", "web development", "web development"]
      },
      {
        companyName: "Company A",
        companyLogo: "comp-2.png",
        stars: 4,
        programmingLanguage: "Python",
        duration: "30 hours",
        credits: 40,
        skills: ["web development", "web development", "web development"]
      },
      // Add more project data objects as needed
    ];

    // Function to generate the project cards
    function generateProjectCards() {
      const projectContainer = document.getElementById("projectContainer");
      const isMobile = window.innerWidth <= 640; // Adjust the breakpoint as needed

      // Clear the existing project cards
      projectContainer.innerHTML = "";

      // Determine the number of columns based on the screen size
      const columns = isMobile ? 1 : 3;

      // Generate the project cards
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];

        // Create the project card element
        const card = document.createElement("div");
        card.className = "bg-white text-gray-900 p-8 rounded-xl shadow-2xl relative max-w-md";
        card.innerHTML = `
          <div class="mb-4 flex justify-between items-center">
            <div class="flex items-center">
              <span class="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
                <img src="${project.companyLogo}" alt="Logo" class="h-8 object-contain" />
              </span>
            </div>

            <div class="flex items-center">
              <div class="flex items-center">
                ${getStarIcons(project.stars)}
                <p class="sr-only">${project.stars} out of 5 stars</p>
                <a href="#" class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">Level</a>
              </div>
            </div>
          </div>

          <div class="pt-4">
            <p class="flex items-center -ml-2 py-2"><span class="text-green-600 font-bold text-xl mr-2">&lt;/&gt;</span> Programming Language - ${project.programmingLanguage}</p>

            <div class="mb-2 flex justify-between">
              <p class="flex items-center py-4">
                <svg class="w-7 h-7 mr-2 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M12 6v6l4 2"></path>
                </svg>
                Duration: ${project.duration}
              </p>

              <p class="flex items-center py-4">
                <svg class="w-8 h-8 mr-1 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 7h8M8 12h8M8 17h8"></path>
                </svg>
                Credits: ${project.credits}
              </p>
            </div>
          </div>

          <p class="text-base mb-4">Key skills that you will gain during this project:</p>
          <div class="text-base">
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
          <p class="flex mt-2">
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