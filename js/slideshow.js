var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Auto-advance slides every 5 seconds
let slideInterval = setInterval(() => plusSlides(1), 5000);

// Pause on hover
const slider = document.querySelector('.slideshow-container');
slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
slider.addEventListener('mouseleave', () => slideInterval = setInterval(() => plusSlides(1), 5000));

// Touch support for mobile
let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener('touchstart', (e) => {
  clearInterval(slideInterval);
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slider.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
  slideInterval = setInterval(() => plusSlides(1), 5000); // Restart auto-advance
}, { passive: true });

function handleSwipe() {
  const swipeThreshold = 50; // Minimum distance to consider it a swipe
  if (touchEndX < touchStartX - swipeThreshold) {
    plusSlides(1); // Swipe left: next slide
  } else if (touchEndX > touchStartX + swipeThreshold) {
    plusSlides(-1); // Swipe right: previous slide
  }
}
