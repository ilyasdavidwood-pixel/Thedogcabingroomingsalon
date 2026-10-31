
/* =====================================
   THE DOG CABIN GROOMING SALON
   Website JavaScript
===================================== */

// CURRENT YEAR

const year = document.getElementById("currentYear");

if (year) {
  year.textContent = new Date().getFullYear();
}


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

function closeMenu() {
  if (!menuToggle || !navigation) return;

  navigation.classList.remove("open");

  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open navigation");
}

if (menuToggle && navigation) {

  menuToggle.addEventListener("click", function () {

    const isOpen = navigation.classList.toggle("open");

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );

  });

  // Close menu when a link is clicked

  navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  // Close menu when clicking outside

  document.addEventListener("click", function (event) {

    if (
      !navigation.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }

  });

  // Close menu with Escape key

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeMenu();
    }

  });

}


// SMOOTH SCROLL REVEAL

const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !reduceMotion
) {

  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08,
      rootMargin: "0px 0px 30px 0px"
    }
  );

  document.documentElement.classList.add("can-reveal");

  revealElements.forEach(function (element) {
    observer.observe(element);
  });

}


// REVIEW CAROUSEL

const reviewsTrack = document.getElementById("reviewsTrack");

const reviewPrev = document.getElementById("reviewPrev");

const reviewNext = document.getElementById("reviewNext");

function scrollReviews(direction) {

  if (!reviewsTrack) return;

  const reviewCard = reviewsTrack.querySelector(".review-card");

  if (!reviewCard) return;

  const gap = parseFloat(
    getComputedStyle(reviewsTrack).gap
  ) || 18;

  const scrollAmount = reviewCard.offsetWidth + gap;

  const maxScroll =
    reviewsTrack.scrollWidth - reviewsTrack.clientWidth;

  let newPosition =
    reviewsTrack.scrollLeft + scrollAmount * direction;

  // Loop back to the beginning or end

  if (newPosition > maxScroll + 5) {
    newPosition = 0;
  }

  if (newPosition < -5) {
    newPosition = maxScroll;
  }

  reviewsTrack.scrollTo({
    left: newPosition,
    behavior: reduceMotion ? "auto" : "smooth"
  });

}

if (reviewPrev) {
  reviewPrev.addEventListener("click", function () {
    scrollReviews(-1);
  });
}

if (reviewNext) {
  reviewNext.addEventListener("click", function () {
    scrollReviews(1);
  });
}


// IMAGE GALLERY LIGHTBOX

const galleryItems = document.querySelectorAll(".gallery-item");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");

const lightboxCaption = document.getElementById("lightboxCaption");

const lightboxClose = document.getElementById("lightboxClose");

let currentImageIndex = 0;


// Open a selected gallery photo

function openGalleryImage(index) {

  const selected = galleryItems[index];

  if (!selected || !lightboxImage) return;

  currentImageIndex = index;

  lightboxImage.src = selected.dataset.image;

  lightboxImage.alt = selected.dataset.alt || "Dog gallery photo";

  if (lightboxCaption) {
    lightboxCaption.textContent = selected.dataset.alt || "";
  }

}


// Next or previous gallery photo

function changeGalleryImage(direction) {

  currentImageIndex =
    (currentImageIndex + direction + galleryItems.length)
    % galleryItems.length;

  openGalleryImage(currentImageIndex);

}


// Register click events

if (lightbox && lightboxImage) {

  galleryItems.forEach(function (item, index) {

    item.addEventListener("click", function () {

      openGalleryImage(index);

      if (typeof lightbox.showModal === "function") {

        lightbox.showModal();

        document.body.classList.add("dialog-open");

      } else {

        window.open(
          item.dataset.image,
          "_blank",
          "noopener"
        );

      }

    });

  });


  // Close button

  if (lightboxClose) {

    lightboxClose.addEventListener("click", function () {
      lightbox.close();
    });

  }


  // Click outside photo

  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      lightbox.close();
    }

  });


  // Restore page scrolling

  lightbox.addEventListener("close", function () {

    document.body.classList.remove("dialog-open");

  });


  // Keyboard controls

  document.addEventListener("keydown", function (event) {

    if (!lightbox.open) return;

    if (event.key === "ArrowRight") {

      changeGalleryImage(1);

    }

    if (event.key === "ArrowLeft") {

      changeGalleryImage(-1);

    }

  });

}


// END OF THE DOG CABIN JAVASCRIPT
