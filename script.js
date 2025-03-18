const scrollContainer = document.documentElement;
let scrollX = 0;
let scrollY = 0;
let targetScrollX = 0;
let targetScrollY = 0;
let easeFactor = 0.05;

function smoothScroll() {
  targetScrollX = Math.max(0, Math.min(targetScrollX, scrollContainer.scrollWidth - scrollContainer.clientWidth));
  targetScrollY = Math.max(0, Math.min(targetScrollY, scrollContainer.scrollHeight - scrollContainer.clientHeight));

  scrollX += (targetScrollX - scrollX) * easeFactor;
  scrollY += (targetScrollY - scrollY) * easeFactor;

  scrollContainer.scrollLeft = scrollX;
  scrollContainer.scrollTop = scrollY;

  requestAnimationFrame(smoothScroll);
}

document.addEventListener("wheel", (event) => {
  event.preventDefault();
  targetScrollX += event.deltaX;
  targetScrollY += event.deltaY;

  targetScrollX = Math.max(0, Math.min(targetScrollX, scrollContainer.scrollWidth - scrollContainer.clientWidth));
  targetScrollY = Math.max(0, Math.min(targetScrollY, scrollContainer.scrollHeight - scrollContainer.clientHeight));
}, {
  passive: false
});

smoothScroll();

const navBar = document.getElementById("navBar");
const sectionOne = document.querySelector(".sectionOne");

function toggleNavBar() {
  if (window.scrollX > sectionOne.offsetWidth * 0.5) {
    navBar.style.transform = "translate(-50%, 0)";
  } else {
    navBar.style.transform = "translate(-50%, 150%)"; 
  }
}

document.addEventListener("scroll", toggleNavBar);

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetClass = event.target.getAttribute("data-target");
    if (targetClass) {
      const targetSection = document.querySelector(targetClass);
      if (targetSection) {
        targetScrollX = targetSection.offsetLeft; 
        targetScrollY = targetSection.offsetTop;
      }
    }
  });
});
