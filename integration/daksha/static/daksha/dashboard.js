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



const chart = new Chart(document.getElementById("myChart"), {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July", "Aug", "Sep", "Nov", "Dec"],
      datasets: [
        {
          label: "Credits",
          borderColor: "#4F46E5",
          data: [600, 400, 620, 300, 200, 600, 230, 300, 200, 200, 100, 1200],
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