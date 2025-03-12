      const scrollContainer = document.documentElement;
      let scrollAmount = 0;
      let targetScroll = 0;
      let easeFactor = 0.05;

      function smoothScroll() {
        targetScroll = Math.max(0, Math.min(targetScroll,  scrollContainer.scrollWidth - scrollContainer.clientWidth));
        scrollAmount += (targetScroll - scrollAmount) * easeFactor;
        scrollContainer.scrollLeft = scrollAmount;
        requestAnimationFrame(smoothScroll);
      }

      document.addEventListener("wheel", (event) => {
        event.preventDefault();
        targetScroll += event.deltaY;
        targetScroll = Math.max(0, Math.min(targetScroll, scrollContainer.scrollWidth - scrollContainer.clientWidth));
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
            targetScroll = targetSection.offsetLeft; 
          }
        }
      });
    });
  