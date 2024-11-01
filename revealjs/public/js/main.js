// Initialize presentation
const presentation = new PresentationManager(presentationConfig);

// Navigation functions
function scrollToTop() {
    const currentSlide = document.querySelector('.reveal .slides section.present');
    if (currentSlide) {
        currentSlide.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}