document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector(".header__btn-menu");
  const headerMenu = document.querySelector(".header__menu");

  function toggleMenu() {
    const isActive = headerMenu.classList.toggle("active");
    menuButton.classList.toggle("active");

    if (isActive) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }

  menuButton.addEventListener("click", toggleMenu);

  window.addEventListener("load", function () {
    if (window.innerWidth < 1108) {
      document.addEventListener("mouseup", function (event) {
        if (
          !headerMenu.contains(event.target) &&
          !menuButton.contains(event.target)
        ) {
          headerMenu.classList.remove("active");
          menuButton.classList.remove("active");
          document.body.classList.remove("no-scroll");
        }
      });
    }
  });

  headerMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      headerMenu.classList.remove("active");
      menuButton.classList.remove("active");
      document.body.classList.remove("no-scroll");

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
