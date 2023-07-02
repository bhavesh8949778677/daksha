       // Mobile menu button
            const mobileMenuButton = document.querySelector(".mobile-menu-button");

            // Mobile menu content
            const mobileMenuContent = document.querySelector(".mobile-menu");

            // Toggle mobile menu
            mobileMenuButton.addEventListener("click", () => {
                mobileMenuContent.classList.toggle("active");
            });

            // Close mobile menu when a menu item is clicked
            const mobileMenuLinks = document.querySelectorAll(".mobile-menu-content a");
            mobileMenuLinks.forEach((link) => {
                link.addEventListener("click", () => {
                    mobileMenuContent.classList.remove("active");
                });
            });

            // Close mobile menu when close button is clicked
            const closeButton = document.querySelector(".close-button");
            closeButton.addEventListener("click", () => {
                mobileMenuContent.classList.remove("active");
            });

            // Hide mobile menu when clicking outside
            document.addEventListener("mouseup", (event) => {
                const targetElement = event.target;
                if (!targetElement.closest(".mobile-menu") && !targetElement.closest(".mobile-menu-button")) {
                    mobileMenuContent.classList.remove("active");
                }
            });


// Array of project data (example)
// const projectsData = [
//   {
//     category: "Machine Learning",
//     title: "Building a recommender system",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   {
//     category: "Machine Learning",
//     title: "Another project",
//     description: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
//     points: [
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor.",
//       "Lorem, ipsum dolor."
//     ]
//   },
//   // Add more project objects as needed
// ];
// const projectsData = fetch('/ProjectsData')

// Function to generate a project card
function createProjectCard(project) {
  const card = document.createElement("div");
  card.className = "bg-white text-gray-900 p-8 rounded-xl shadow-2xl relative max-w-md";

  const category = document.createElement("span");
  category.className = "uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm";
  category.textContent = project.title;
  card.appendChild(category);

  const programmingLanguage = document.createElement("p");
  programmingLanguage.className = "flex items-center py-2";
  programmingLanguage.innerHTML = `
    <span class="text-green-600 font-bold text-xl mr-4">&lt;/&gt;</span>
    Programming Language - ${project.skills_req}
  `;
  card.appendChild(programmingLanguage);

  const duration = document.createElement("p");
  duration.className = "flex items-center py-4";
  duration.innerHTML = `
    <svg class="w-8 h-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 6v6l4 2"></path>
    </svg>
    Duration: ${project.duration}
  `;
  card.appendChild(duration);

  const credits = document.createElement("p");
  credits.className = "flex items-center py-1";
  credits.innerHTML = `
    <svg class="w-8 h-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 7h8M8 12h8M8 17h8"></path>
    </svg>
    Credits: ${project.credits}
  `;
  card.appendChild(credits);

  const skills = document.createElement("p");
  skills.className = "text-base py-4";
  skills.textContent = "Key skills that you will gain during this project:";
  card.appendChild(skills);

  const skillsList = document.createElement("div");
  skillsList.className = "text-base";
  project.points.forEach(skill => {
    const skillElement = document.createElement("p");
    skillElement.className = "flex py-2";
    skillElement.innerHTML = `
      <svg class="w-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      ${skill}
    `;
    skillsList.appendChild(skillElement);
  });
  card.appendChild(skillsList);

  const button = document.createElement("button");
  button.className = "w-full py-4 my-4 text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md";
  button.textContent = "View Project";
  card.appendChild(button);
  button.addEventListener("click", function() {
    // Replace "url" with the actual URL you want to redirect to
    const url = `/${project.title}/view`;
    window.location.href = url;
  });

  return card;
}

// Function to populate project cards
function populateProjectCards(projectsData) {
  const projectContainer = document.getElementById("projectContainer");
  console.log(projectsData);
  projectsData.forEach(project => {
    const card = createProjectCard(project);
    projectContainer.appendChild(card);
  });
}

// Call the populateProjectCards function to generate the project cards
fetch('/ProjectsData')
  .then(response => response.json())
  .then(projectsData => {
    console.log(projectsData);
    populateProjectCards(projectsData);
  })
  .catch(error => {
    console.error('Error fetching projects data:', error);
  });

      