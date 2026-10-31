
/* =====================================
   THE DOG CABIN GROOMING SALON
   Website JavaScript
===================================== */

// COPYRIGHT YEAR

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// MOBILE MENU

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

function closeMobileMenu() {
  if (!menuToggle || !mainNav) return;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Open menu");
}

if (menuToggle && mainNav) {

  menuToggle.addEventListener("click", function () {

    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

  });

  mainNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  document.addEventListener("click", function (event) {

    if (
      !mainNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMobileMenu();
    }

  });

  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeMobileMenu();
    }

  });

  window.addEventListener("resize", function () {

    if (window.innerWidth > 1000) {
      closeMobileMenu();
    }

  });

}


// SCROLL REVEAL ANIMATIONS

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (
  "IntersectionObserver" in window &&
  !reducedMotion
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
      threshold: 0.05,
      rootMargin: "0px 0px 40px 0px"
    }
  );

  document.documentElement.classList.add("js-ready");

  revealElements.forEach(function (element) {
    observer.observe(element);
  });

}


// GALLERY LIGHTBOX

const galleryItems = Array.from(
  document.querySelectorAll(".gallery-item")
);

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const galleryPrev = document.getElementById("galleryPrev");
const galleryNext = document.getElementById("galleryNext");
const galleryCount = document.getElementById("galleryCount");

let activeImageIndex = 0;


// DISPLAY SELECTED IMAGE

function showGalleryImage(index) {

  if (!galleryItems.length || !lightboxImg) return;

  activeImageIndex =
    (index + galleryItems.length) % galleryItems.length;

  const item = galleryItems[activeImageIndex];
  const picture = item.querySelector("img");

  lightboxImg.src = item.dataset.full;
  lightboxImg.alt = picture ? picture.alt : "Dog gallery photo";

  if (galleryCount) {
    galleryCount.textContent =
      (activeImageIndex + 1) + " / " + galleryItems.length;
  }

}


// CHANGE PHOTO

function moveGallery(direction) {
  showGalleryImage(activeImageIndex + direction);
}


// OPEN THE GALLERY

galleryItems.forEach(function (item, index) {

  item.addEventListener("click", function () {

    showGalleryImage(index);

    if (lightbox && typeof lightbox.showModal === "function") {

      lightbox.showModal();
      document.body.classList.add("modal-open");

    } else {

      window.open(item.dataset.full, "_blank", "noopener");

    }

  });

});


// CLOSE GALLERY

if (lightboxClose && lightbox) {

  lightboxClose.addEventListener("click", function () {
    lightbox.close();
  });

}


// CLICK OUTSIDE PHOTO TO CLOSE

if (lightbox) {

  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {
      lightbox.close();
    }

  });

  lightbox.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
  });

}


// NEXT IMAGE

if (galleryNext) {

  galleryNext.addEventListener("click", function () {
    moveGallery(1);
  });

}


// PREVIOUS IMAGE

if (galleryPrev) {

  galleryPrev.addEventListener("click", function () {
    moveGallery(-1);
  });

}


// KEYBOARD GALLERY CONTROLS

document.addEventListener("keydown", function (event) {

  if (!lightbox || !lightbox.open) return;

  if (event.key === "ArrowRight") {
    moveGallery(1);
  }

  if (event.key === "ArrowLeft") {
    moveGallery(-1);
  }

});


// END OF SCRIPT
