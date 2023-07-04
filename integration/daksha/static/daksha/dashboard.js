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


const data = [40, 100, 150, 200, 280];
const badges = ["Newbie","Pupil", "Specialist", "Master","Grandmaster"];

const chart = new Chart(document.getElementById("myChart"), {
  type: "line",
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"],
    datasets: [
      {
        label: "Credits",
        borderColor: "#4F46E5",
        data: data,
        fill: true,
        pointBackgroundColor: "#0056b3",
        borderWidth: "3",
        pointBorderWidth: "4",
        pointHoverRadius: "5",
        pointHoverBorderWidth: "3",
        pointHoverBorderColor: "#0056b3",
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (context) {
            return "Month: " + context[0].label;
          },
          label: function (context) {
            var index = context.dataIndex;
            var credits = context.dataset.data[index];
            // var badge = badges[index];
            if (credits>300) {
              return "Credits: " + credits + " | Badge: " + badges[1];
            }
            else{
              return "Credits: " + credits + " | Badge: " + badges[0];
            }
            
          },
        },
      },
      annotation: {
        annotations: [
          {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            xScaleID: "x",
            yScaleID: "y",
            xMin: "January",
            xMax: "Dec",
            backgroundColor: "RGB(40, 255, 87, 0.3)", // Red background color
            borderWidth: 0,
            yMin: 0,
            yMax: 300, // Specify the range of the y-axis
          },
          {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            xScaleID: "x",
            yScaleID: "y",
            xMin: "January",
            xMax: "Dec",
            backgroundColor: "rgba(0, 0, 255, 0.3)", // Blue background color
            borderWidth: 0,
            yMin: 300,
            yMax: 500, // Specify the range of the y-axis
          },
          {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            xScaleID: "x",
            yScaleID: "y",
            xMin: "January",
            xMax: "Dec",
            backgroundColor: "rgb(255, 140, 0,0.3)", // Green background color
            borderWidth: 0,
            yMin: 500,
            yMax: 650, // Specify the range of the y-axis
          },
          {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            xScaleID: "x",
            yScaleID: "y",
            xMin: "January",
            xMax: "Dec",
            backgroundColor: "RGB(200, 0, 200, 0.3)", // Gray background color
            borderWidth: 0,
            yMin: 650,
            yMax: 750, // Specify the range of the y-axis
          },
          {
            type: "box",
            drawTime: "beforeDatasetsDraw",
            xScaleID: "x",
            yScaleID: "y",
            xMin: "January",
            xMax: "Dec",
            backgroundColor: "rgba(255, 0, 100, 0.3)", // Blue-green background color
            borderWidth: 0,
            yMin: 750,
            yMax: 800, // Specify the range of the y-axis
          },
          // Add more annotations for other credit ranges
        ],
      },
      
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: "Month", // Title for the x-axis
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: "Credits", // Title for the y-axis
        },
        suggestedMax: 800, // Adjust the suggested maximum value for the y-axis
      },
    },
  },
});




  var ctx = document.getElementById('myChart2').getContext('2d');

    // Define the data for the pie chart
    var dat = {
      labels: ['Programming', 'App Development ', 'Business Development'],
      datasets: [{
        data: [32, 52, 16],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56']
      }]
    };

    // Create the pie chart
    var myChart = new Chart(ctx, {
      type: 'pie',
      data: dat,
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });



// let fractionsFromBackend = {
//     newbie: 0.5,
//     pupil: 0.3,
//     specialist: 0.1,
//     master: 0.1
//   };

//   // Function to update the widths of progress sections
//   function updateProgressSections() {
//     const chart = document.getElementById('myChart');
//     const chartWidth = chart.offsetWidth;
//     const progressBar = document.querySelector('.bg-neutral-400');

//     let previousWidth = 0;

//     Object.entries(fractionsFromBackend).forEach(([label, fraction]) => {
//       const section = document.getElementById(label);
//       if (section) {
//         const width = fraction * chartWidth;
//         const marginLeft = previousWidth;

//         section.style.width = `${width}px`;
//         section.style.marginLeft = `${marginLeft}px`;

//         previousWidth += width;
//       }
//     });
//   }

//   // Call the function to update the progress sections
//   updateProgressSections();

//   // Recalculate widths on window resize
