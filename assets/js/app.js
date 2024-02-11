window.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back_to_top');
  const megaMenuBtn = document.getElementById('mega_menu_btn');
  const megaMenuCloseBtn = document.getElementById('mega_menu_close_btn');
  const header = document.querySelector('.header');

  /* SMOOTH SCROLLING */
  const menuItems = document.querySelectorAll('.header_nav a');
  menuItems.forEach((link) => {
    link.addEventListener('click', () => {
      const sectionID = new URL(link.href).hash;
      let section = document.querySelector(sectionID);
      const topSpacing = Math.floor(section.getBoundingClientRect().top);

      window.scrollTo({
        top: topSpacing,
        behavior: "smooth",
      });

      if (header.classList.contains('header-open')) {
        header.classList.remove('header-open');
        document.body.style.overflowY = 'auto';
        document.body.style.paddingRight = '0';
      }
    });
  });

  /* MOB MENU */
  function handleMobMenu(event) {
    event.preventDefault();

    if (header.classList.contains('header-open')) {
      header.classList.remove('header-open');
      document.body.style.overflowY = 'auto';
      document.body.style.paddingRight = '0';
    } else {
      header.classList.add('header-open');
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = '17px';
    }
  }
  megaMenuBtn.addEventListener('click', handleMobMenu);
  megaMenuCloseBtn.addEventListener('click', handleMobMenu);

  /* BACK TO TOP */
  backToTop.addEventListener('click', handleTop);
  window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  function handleTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
});
