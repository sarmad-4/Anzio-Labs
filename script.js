// // Select all accordion buttons
const buttons = document.querySelectorAll('.anzio-accordion-button');

// SVG for Minus icon
const minusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="anzio-icon-svg">
        <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
    </svg>
`;

// SVG for Plus icon
const plusSVG = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="anzio-icon-svg">
        <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
    </svg>
`;

// Add click event to each button
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const index = this.getAttribute('data-index');
        const content = document.getElementById(`content-${index}`);
        const icon = document.getElementById(`icon-${index}`);

        // Toggle the content's max-height for smooth opening and closing
        if (content.style.maxHeight && content.style.maxHeight !== '0px') {
            content.style.maxHeight = '0px';
            icon.innerHTML = plusSVG;
            icon.classList.remove('minus');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.innerHTML = minusSVG;
            icon.classList.add('minus');
        }
    });
});


// New Testomial Section JS

// Select elements
const carousel = document.querySelector('.anzio-testimonial-carousel');
const cards = document.querySelectorAll('.anzio-testimonial-card');
const dotsContainer = document.querySelector('.anzio-testimonial-dots');

// Create dots
const cardsPerSlide = window.innerWidth <= 480 ? 1 : 3; // 1 card on mobile, 3 on desktop
const totalSlides = Math.ceil(cards.length / cardsPerSlide);
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('anzio-testimonial-dot');
    dot.setAttribute('data-index', i);
    if (i === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
}

const dots = document.querySelectorAll('.anzio-testimonial-dot');

let currentIndex = 0;

// Show cards based on current index
function showCards(index) {
    const cardsPerSlide = window.innerWidth <= 480 ? 1 : 3; // Dynamic based on screen size
    const totalSlides = Math.ceil(cards.length / cardsPerSlide);
    const offset = (index * 100) / totalSlides; // Percentage offset for 3 cards per slide
    carousel.style.transform = `translateX(-${offset}%)`;

    // Update active dot
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

// Dot navigation
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        currentIndex = index;
        showCards(currentIndex);
    });
});

// Auto-slide
let autoSlide = setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    showCards(currentIndex);
}, 5000); // Change slide every 5 seconds

// Pause auto-slide on hover
carousel.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        showCards(currentIndex);
    }, 5000);
});

// Update on window resize
window.addEventListener('resize', () => {
    const newCardsPerSlide = window.innerWidth <= 480 ? 1 : 3;
    const newTotalSlides = Math.ceil(cards.length / newCardsPerSlide);
    if (newTotalSlides !== totalSlides) {
        // Recreate dots if the number of slides changes
        dotsContainer.innerHTML = '';
        for (let i = 0; i < newTotalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('anzio-testimonial-dot');
            dot.setAttribute('data-index', i);
            if (i === currentIndex) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }
        dots = document.querySelectorAll('.anzio-testimonial-dot');
        totalSlides = newTotalSlides;
    }
    showCards(currentIndex);
});

// Initialize with first slide
showCards(currentIndex);