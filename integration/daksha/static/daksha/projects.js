        const profileButton = document.querySelector('.profile-button');

        const notificationButton = document.querySelector('.notification-button');
        const mobileNotificationButton = document.querySelector('.mobile-notification-button');
        const mobileMenuButton = document.querySelector('.mobile-menu-button');
        const dropdownMenu = document.getElementById('dropdownMenu');
        const notidownMenu = document.getElementById('notification-menu');
        const mobileNotificationDown=document.getElementById('mobile-notification-menu');
        const mobileMenu = document.querySelector('.mobile-menu');

        profileButton.addEventListener('click', () => {
          dropdownMenu.classList.toggle('active');
        });
        mobileMenuButton.addEventListener('click', () => {
          mobileMenu.classList.toggle('hidden');
        });
        window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
            mobileMenu.classList.add('hidden');
          }
        });
        document.addEventListener('click', (event) => {
          const targetElement = event.target;
          if (!targetElement.closest('.profile-button') && !targetElement.closest('.dropdown-menu')) {
            dropdownMenu.classList.remove('active');
          }
        });

       
        notificationButton.addEventListener('click', () => {
          notidownMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
          const targetElement = event.target;
          if (!targetElement.closest('.notification-button') && !targetElement.closest('.notification-menu')) {
            notidownMenu.classList.remove('active');
          }
        });

        mobileNotificationButton.addEventListener('click', () => {
          mobileNotificationDown.classList.toggle('active');
        });
        document.addEventListener('click', (event) => {
          const targetElement = event.target;
          if (!targetElement.closest('.mobile-notification-button') && !targetElement.closest('.mobile-notification-menu')) {
            mobileNotificationDown.classList.remove('active');
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
  card.className = "bg-white text-gray-900 p-8 rounded-xl shadow-2xl relative";

  const category = document.createElement("span");
  category.className = "uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm";
  category.textContent = project.duration;
  card.appendChild(category);

  const title = document.createElement("div");
  title.innerHTML = `<p class="text-xl py-4">${project.title}</p>`;
  card.appendChild(title);

  const description = document.createElement("p");
  description.className = "text-xl py-8";
  description.textContent = project.skills_req;
  card.appendChild(description);

  const points = document.createElement("div");
  points.className = "text-lg";
  project.points.forEach(point => {
    const pointElement = document.createElement("p");
    pointElement.className = "flex py-2";
    pointElement.innerHTML = `
      <svg class="w-8 mr-5 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
      </svg>
      ${point}
    `;
    points.appendChild(pointElement);
  });
  card.appendChild(points);

  const button = document.createElement("button");
  button.className = "w-full py-4 my-4 text-white border bg-indigo-600 border-indigo-600 hover:bg-transparent hover:text-indigo-600 rounded-md";
  button.textContent = "View project";
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
    // console.log(projectsData);
    populateProjectCards(projectsData);
  })
  .catch(error => {
    console.error('Error fetching projects data:', error);
  });

      