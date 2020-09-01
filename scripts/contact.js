let hamburger = document.querySelector(".hamburger");
let menu = document.querySelector(".navbar");
let bod = document.querySelector(".menu-div");

console.log(bod);

hamburger.addEventListener("click", function () {
  console.log("hej");
  hamburger.classList.toggle("isactive");
  menu.classList.toggle("active");
});
