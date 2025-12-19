// Media configuration - Opaque IDs from Cloudflare Worker
const MEDIA_CONFIG = {
    photos: ['122bp', 'a91kx'], // Photo IDs
    videos: ['z82pm', 'v7m2a']  // Video IDs
};

const MEDIA_BASE_URL =
  "https://birthday-media-proxy.tyagisaksham576.workers.dev/media?id=";

// Countdown target date: January 11
const COUNTDOWN_DATE = new Date(new Date().getFullYear(), 0, 11);
if (COUNTDOWN_DATE < new Date()) {
  COUNTDOWN_DATE.setFullYear(COUNTDOWN_DATE.getFullYear() + 1);
}

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  initGallery();
  initVideos();
  initLightbox();
  initScrollAnimations();
});

// Countdown Timer
function initCountdown() {
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = Date.now();
    const distance = COUNTDOWN_DATE.getTime() - now;

    if (distance < 0) {
      daysEl.textContent =
        hoursEl.textContent =
        minutesEl.textContent =
        secondsEl.textContent =
          "0";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// Photo Gallery
function initGallery() {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid || MEDIA_CONFIG.photos.length === 0) return;

  galleryGrid.innerHTML =
    '<div class="gallery-loading">Loading memories...</div>';

  const fragment = document.createDocumentFragment();

  MEDIA_CONFIG.photos.forEach((photoId, index) => {
    const galleryItem = document.createElement("div");
    galleryItem.className = "gallery-item";
    galleryItem.dataset.index = index;

    const img = document.createElement("img");
    img.src = `${MEDIA_BASE_URL}${photoId}`;
    img.alt = `Memory ${index + 1}`;
    img.loading = "lazy";

    img.onerror = () => {
      galleryItem.innerHTML =
        '<div class="gallery-loading">Image unavailable</div>';
    };

    img.onload = () => galleryItem.classList.add("loaded");

    galleryItem.appendChild(img);
    galleryItem.addEventListener("click", () => openLightbox(index));
    fragment.appendChild(galleryItem);
  });

  galleryGrid.innerHTML = "";
  galleryGrid.appendChild(fragment);
}

// Video Section
function initVideos() {
  const videoContainer = document.getElementById("videoContainer");
  if (!videoContainer || MEDIA_CONFIG.videos.length === 0) return;

  const fragment = document.createDocumentFragment();

  MEDIA_CONFIG.videos.forEach((videoId) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";

    const video = document.createElement("video");
    video.src = `${MEDIA_BASE_URL}${videoId}`;
    video.controls = true;
    video.preload = "metadata";
    video.playsInline = true;
    // Enable muted autoplay and continuous looping so videos play without user tap
    video.autoplay = true;
    video.muted = true;
    video.loop = true;

    const loadingDiv = document.createElement("div");
    loadingDiv.className = "video-loading";
    loadingDiv.textContent = "Loading video...";
    videoItem.appendChild(loadingDiv);

    video.onerror = () => {
      videoItem.innerHTML =
        '<div class="video-loading">Video unavailable</div>';
    };

    video.onloadedmetadata = () => {
      loadingDiv.remove();
      videoItem.appendChild(video);
      // Try to play; some browsers still require a user gesture unless muted
      try {
        video.play().catch(() => {});
      } catch (e) {}
    };

    fragment.appendChild(videoItem);
  });

  videoContainer.appendChild(fragment);
}

// Lightbox
let currentImageIndex = 0;
let currentImages = [];

function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const closeBtn = document.getElementById("lightboxClose");

  if (!lightbox || !closeBtn) return;

  closeBtn.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrevImage();
    if (e.key === "ArrowRight") showNextImage();
  });
}

function openLightbox(index) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImage");

  currentImages = MEDIA_CONFIG.photos.map(
    (id) => `${MEDIA_BASE_URL}${id}`
  );
  currentImageIndex = index;

  img.src = currentImages[currentImageIndex];
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

function showPrevImage() {
  currentImageIndex =
    (currentImageIndex - 1 + currentImages.length) %
    currentImages.length;
  document.getElementById("lightboxImage").src =
    currentImages[currentImageIndex];
}

function showNextImage() {
  currentImageIndex =
    (currentImageIndex + 1) % currentImages.length;
  document.getElementById("lightboxImage").src =
    currentImages[currentImageIndex];
}

// Scroll animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.style.opacity = "1";
          e.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(
      ".countdown-section, .gallery-section, .video-section, .message-section"
    )
    .forEach((section) => {
      section.style.opacity = "0";
      section.style.transform = "translateY(30px)";
      section.style.transition =
        "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(section);
    });
}
