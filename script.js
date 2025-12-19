// Media configuration - Opaque IDs from Cloudflare Worker
// IDs extracted from STATIC_ID_TO_PATH_MAP, categorized by file extension:
// Photos: .jpg .jpeg .png .webp .gif
// Videos: .mp4 .mov
// Worker automatically discovers additional files at runtime and merges with static mappings
const MEDIA_CONFIG = {
    photos: ['122bp'], // Photo IDs from STATIC_ID_TO_PATH_MAP (image/101ac17b-b0b7-4482-bd53-5d589cd30631.JPG)
    videos: []  // Video IDs from STATIC_ID_TO_PATH_MAP
};

const MEDIA_BASE_URL = 'https://birthday-media-proxy.tyagisaksham576.workers.dev/media?id=';

// Countdown target date: January 11
const COUNTDOWN_DATE = new Date(new Date().getFullYear(), 0, 11); // Month 0 = January
// If January 11 has passed this year, set it for next year
if (COUNTDOWN_DATE < new Date()) {
    COUNTDOWN_DATE.setFullYear(COUNTDOWN_DATE.getFullYear() + 1);
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initGallery();
    initVideos();
    initLightbox();
    initScrollAnimations();
});

// Countdown Timer
function initCountdown() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = COUNTDOWN_DATE.getTime() - now;

        if (distance < 0) {
            daysEl.textContent = '0';
            hoursEl.textContent = '0';
            minutesEl.textContent = '0';
            secondsEl.textContent = '0';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Photo Gallery
function initGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid || MEDIA_CONFIG.photos.length === 0) {
        return;
    }

    // Show loading state
    galleryGrid.innerHTML = '<div class="gallery-loading">Loading memories...</div>';

    // Create gallery items dynamically
    const fragment = document.createDocumentFragment();
    
    MEDIA_CONFIG.photos.forEach((photoId, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = `${MEDIA_BASE_URL}${photoId}`;
        img.alt = `Memory ${index + 1}`;
        img.loading = 'lazy';
        
        // Handle loading errors
        img.onerror = function() {
            this.style.display = 'none';
            galleryItem.innerHTML = '<div class="gallery-loading">Image unavailable</div>';
        };
        
        // Handle successful load
        img.onload = function() {
            galleryItem.classList.add('loaded');
        };
        
        galleryItem.appendChild(img);
        galleryItem.addEventListener('click', () => openLightbox(index));
        fragment.appendChild(galleryItem);
    });

    // Clear loading and add items
    galleryGrid.innerHTML = '';
    galleryGrid.appendChild(fragment);
}

// Video Section
function initVideos() {
    const videoContainer = document.getElementById('videoContainer');
    
    if (!videoContainer || MEDIA_CONFIG.videos.length === 0) {
        return;
    }

    // Create video items dynamically
    const fragment = document.createDocumentFragment();
    
    MEDIA_CONFIG.videos.forEach((videoId, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        
        const video = document.createElement('video');
        video.src = `${MEDIA_BASE_URL}${videoId}`;
        video.controls = true;
        video.preload = 'metadata';
        video.loading = 'lazy';
        video.playsInline = true;
        
        // Handle loading errors
        video.onerror = function() {
            videoItem.innerHTML = '<div class="video-loading">Video unavailable</div>';
        };
        
        // Show loading indicator
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'video-loading';
        loadingDiv.textContent = 'Loading video...';
        videoItem.appendChild(loadingDiv);
        
        video.onloadedmetadata = function() {
            loadingDiv.remove();
            videoItem.appendChild(video);
        };
        
        fragment.appendChild(videoItem);
    });

    videoContainer.appendChild(fragment);
}

// Lightbox functionality
let currentImageIndex = 0;
let currentImages = [];

function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');

    if (!lightbox || !lightboxClose) return;

    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });

    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            showPrevImage();
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            showNextImage();
        });
    }
}

function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    
    if (!lightbox || !lightboxImage) return;

    currentImageIndex = parseInt(index);
    currentImages = MEDIA_CONFIG.photos.map(id => `${MEDIA_BASE_URL}${id}`);
    
    if (currentImages.length === 0) return;

    lightboxImage.src = currentImages[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update navigation visibility
    updateLightboxNavigation();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function showPrevImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex - 1 + currentImages.length) % currentImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage) {
        lightboxImage.src = currentImages[currentImageIndex];
    }
    updateLightboxNavigation();
}

function showNextImage() {
    if (currentImages.length === 0) return;
    currentImageIndex = (currentImageIndex + 1) % currentImages.length;
    const lightboxImage = document.getElementById('lightboxImage');
    if (lightboxImage) {
        lightboxImage.src = currentImages[currentImageIndex];
    }
    updateLightboxNavigation();
}

function updateLightboxNavigation() {
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    // Hide navigation if only one image
    if (currentImages.length <= 1) {
        if (lightboxPrev) lightboxPrev.style.display = 'none';
        if (lightboxNext) lightboxNext.style.display = 'none';
    } else {
        if (lightboxPrev) lightboxPrev.style.display = 'block';
        if (lightboxNext) lightboxNext.style.display = 'block';
    }
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('.countdown-section, .gallery-section, .video-section, .message-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

