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



      var submitButton = document.getElementById("submitButton");
      var closeButton_submit = document.querySelector(".alert button");
      var alertContainer = document.querySelector(".alert-container");
      var alert = document.querySelector(".alert");
      
      // submitButton.addEventListener("click", function(event) {
      //   event.preventDefault(); // Prevent form submission
        
      //   alertContainer.style.display = "flex";
      //   alert.style.display = "block";
      // });
      
      var fileInput = document.getElementById("zip-file");
      var uploadText = document.querySelector(".upload-text");
      
      fileInput.addEventListener("change", function() {
        var files = fileInput.files;
        if (files.length > 0) {
          var name = files[0].name;
          uploadText.textContent = "File uploaded: " + name;
        } else {
          uploadText.textContent = "Click to upload ZIP file";
        }
      });
      
      // closeButton_submit.addEventListener("click", function() {
      //   alertContainer.style.display = "none";
      //   alert.style.display = "none";
      // });

    


      // rendering the stars
      function generateStars(level) {
        const starContainer = document.getElementById("starContainer");
        const card = document.createElement("div");
        card.className = "flex items-center";
        card.innerHTML = `${getStarIcons(level)}
                <p class="sr-only">${level} out of 5 stars</p>
                <a class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">Level</a>`;
        starContainer.appendChild(card);
        
    
    }

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
      return `<svg class="text-indigo-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getStarPath()}</svg>`.repeat(count);
    }

    // Function to generate half star icon
    function getHalfStar() {
      return `<svg class="text-indigo-600 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getHalfStarPath()}</svg>`;
    }

    // Function to generate empty star icons
    function getEmptyStars(count) {
      return `<svg class="text-gray-300 h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">${getStarPath()}</svg>`.repeat(count);
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
    generateStars(5);


   fetch('/ProjectsData')
  .then(response => response.json())
  .then(projectsData => {
    console.log(projectsData);
    generateProjectCards(projectsData);
  })
  .catch(error => {
    console.error('Error fetching projects data:', error);
  });
