const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = `© ${new Date().getFullYear()}`;
}

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length) {
  revealItems.forEach((item, index) => {
    if (index < 2) {
      item.classList.add("is-visible");
    }
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
}

const carousel = document.querySelector("[data-carousel]");
const carouselTrack = document.querySelector("[data-carousel-track]");

if (carousel && carouselTrack) {
  const originalCards = Array.from(carouselTrack.children);

  originalCards.forEach((card) => {
    const clone = card.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    carouselTrack.appendChild(clone);
  });

  let offset = 0;
  let paused = false;
  let resetPoint = carouselTrack.scrollWidth / 2;
  const speed = 0.35;

  const setResetPoint = () => {
    resetPoint = carouselTrack.scrollWidth / 2;
  };

  const tick = () => {
    if (!paused) {
      offset += speed;

      if (offset >= resetPoint) {
        offset = 0;
      }

      carouselTrack.style.transform = `translateX(-${offset}px)`;
    }

    window.requestAnimationFrame(tick);
  };

  carousel.addEventListener("mouseenter", () => {
    paused = true;
  });

  carousel.addEventListener("mouseleave", () => {
    paused = false;
  });

  window.addEventListener("resize", setResetPoint);
  setResetPoint();
  window.requestAnimationFrame(tick);
}
