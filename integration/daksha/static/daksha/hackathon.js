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
