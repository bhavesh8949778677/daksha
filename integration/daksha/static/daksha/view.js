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

      closeButton_submit.addEventListener("click", function() {
        alertContainer.style.display = "none";
        alert.style.display = "none";
      });

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