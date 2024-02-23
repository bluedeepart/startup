window.addEventListener('DOMContentLoaded', () => {
  const backToTop = document.getElementById('back_to_top');
  const megaMenuBtn = document.getElementById('mega_menu_btn');
  const header = document.querySelector('.header');
  const form = document.getElementById('contactForm');
  const submitButton = form.querySelector('button[type="submit"]');

  /* FORM VALIDATION */
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function validatePhone(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  }

  function inputValidation(event) {
    const inputElement = event.target;
    const errorMessageElement = document.getElementById(`error-${inputElement.id}`);

    if (!inputElement.checkValidity()) {
      errorMessageElement.textContent = inputElement.validationMessage;
    } else if (inputElement.id === 'email_ID' && !validateEmail(inputElement.value)) {
      errorMessageElement.textContent = 'Please enter a valid email address.';
    } else {
      errorMessageElement.textContent = '';
    }

    const isFormValid = form.checkValidity();
    if (isFormValid) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', true);
    }
  }

  form.addEventListener('input', inputValidation);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    console.log('Form submitted!');

    // URL endpoint for your POST request
    const url = '/mail.php';

    const formData = new FormData();
    formData.append('mail', 'mail');
    formData.append('name', document.getElementById('name').value);
    formData.append('email', document.getElementById('email_ID').value);
    formData.append('phone', document.getElementById('phone').value);
    formData.append('service', document.getElementById('service').value);
    formData.append('projectDetails', document.getElementById('project_details').value);

    // Configuration for the fetch request
    const requestOptions = {
      method: 'POST',
      body: formData
    };

    // Make the POST request using fetch
    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        form.reset();
        console.log('Response:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

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

  /* TOP SPACING */
  document.body.style.marginTop = `${header.clientHeight}px`;

  /* HIGHLIGHT ACTIVE MENU */
  const menuLinks = document.querySelectorAll('header a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - header.offsetHeight;
      const sectionBottom = sectionTop + section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
        currentSectionId = section.id;
      }
    });

    menuLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });

  menuLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      menuLinks.forEach((link) => {
        link.classList.remove('active');
      });
      link.classList.add('active');

      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - header.offsetHeight,
        behavior: 'smooth'
      });
    });
  });

  /* International Telephone Input */
  const input = document.querySelector("#phone");
  window.intlTelInput(input, {
    utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@19.2.20/build/js/utils.js",
    initialCountry: "in",
    showSelectedDialCode: true,
    isValidNumber: true,
  });

  const updatedText = document.querySelector('.updated-text');
  const updatedTextSpan = updatedText.querySelector('p');
  updatedText.style.height = updatedTextSpan.clientHeight + 'px';
});
