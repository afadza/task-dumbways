document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".nav-hamburger");
  const navLeft = document.querySelector(".nav-left ul");
  const navRight = document.querySelector(".nav-right ul");
  const navbar = document.querySelector(".navbar");

  hamburger.addEventListener("click", function () {
    navbar.classList.toggle("active");
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 600) {
      navbar.classList.remove("active");
      navLeft.style.display = "flex";
      navRight.style.display = "flex";
    } else {
      navLeft.style.display = "none";
      navRight.style.display = "none";
    }
  });
});