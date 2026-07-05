const header = document.getElementById("siteHeader");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const heroTitle = document.querySelector(".word-reveal");
const bookingForm = document.getElementById("bookingForm");
const formSuccess = document.getElementById("formSuccess");
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightboxContent");
const lightboxClose = document.querySelector(".lightbox-close");

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function buildWordReveal() {
  if (!heroTitle) return;
  const words = heroTitle.dataset.text.split(" ");
  heroTitle.innerHTML = words
    .map((word, index) => `<span class="word" style="animation-delay:${index * 0.14 + 0.18}s">${word}</span>`)
    .join(" ");
}

function setupRevealObserver() {
  const sections = document.querySelectorAll(".reveal-section, .icon-card, .event-card, .review-card, .gallery-item");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

  sections.forEach((section) => observer.observe(section));
}

function closeMenu() {
  navLinks.classList.remove("open");
  header.classList.remove("menu-open");
  navToggle.setAttribute("aria-expanded", "false");
}

function setupMenu() {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    header.classList.toggle("menu-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });
}

function setupForm() {
  bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formSuccess.classList.add("visible");
    bookingForm.reset();
  });
}

function setupRipples() {
  document.querySelectorAll(".ripple").forEach((button) => {
    button.addEventListener("pointermove", (event) => {
      const rect = button.getBoundingClientRect();
      button.style.setProperty("--x", `${event.clientX - rect.left}px`);
      button.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
}

function openLightbox(type, src) {
  lightboxContent.innerHTML = "";
  const media = document.createElement(type === "video" ? "video" : "img");
  media.src = src;
  if (type === "video") {
    media.controls = true;
    media.autoplay = true;
    media.muted = true;
    media.loop = true;
    media.playsInline = true;
  } else {
    media.alt = "Pista House Banquet Hall gallery preview";
  }
  lightboxContent.appendChild(media);
  lightbox.classList.add("active");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxContent.innerHTML = "";
  document.body.style.overflow = "";
}

function setupLightbox() {
  document.querySelectorAll(".media-lightbox").forEach((item) => {
    item.addEventListener("click", () => openLightbox(item.dataset.type, item.dataset.src));
  });

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLightbox();
  });
}

function setupParallax() {
  const heroVideo = document.querySelector(".hero-video");
  window.addEventListener("scroll", () => {
    if (!heroVideo) return;
    heroVideo.style.transform = `translateY(${Math.min(window.scrollY * 0.08, 48)}px) scale(1.04)`;
  }, { passive: true });
}

buildWordReveal();
setupRevealObserver();
setupMenu();
setupForm();
setupRipples();
setupLightbox();
setupParallax();
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });
