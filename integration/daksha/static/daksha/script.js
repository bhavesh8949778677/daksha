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