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


            const chart = new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"],
      datasets: [
        {
          label: "Credits",
          borderColor: "#4F46E5",
          data: [10, 70, 90, 100, 200, 300, 320, 390, 420, 520, 600],
          fill: false,
          pointBackgroundColor: "#0056b3",
          borderWidth: "3",
          pointBorderWidth: "4",
          pointHoverRadius: "6",
          pointHoverBorderWidth: "8",
          pointHoverBorderColor: "#0056b3",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          display: true,
          color:"red",
        },
        y: {
          display: true,
        },
      },
    },
  });

  var ctx = document.getElementById('myChart2').getContext('2d');

    // Define the data for the pie chart
    var data = {
      labels: ['JAVA', 'Python', 'C/C++'],
      datasets: [{
        data: [30, 50, 20],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    };

    // Create the pie chart
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });


    