document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname;


    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            link.classList.add("active");
        }
    });


});
// Menu Bubble
const blueBubble = document.getElementById("blueBubble");
const whiteBubble = document.getElementById("whiteBubble");

function moveBubbles(li) {
    const ul = li.parentElement;
    const liCenter = li.offsetLeft + li.offsetWidth / 2; // relative to UL
    blueBubble.style.left = `${liCenter}px`;
    whiteBubble.style.left = `${liCenter}px`;
}



// Menu Category Click Handling
const firstCategory = "ramen";
const navItems = document.querySelectorAll('.menu-category nav li');
const allItems = document.querySelectorAll('#carousel .menu-item');
const carousel = document.getElementById('carousel');

let currentIndex = 0;
let visibleItems = []; // cache of filtered items

// Category switching
navItems.forEach(li => {
    li.addEventListener('click', () => {
        const category = li.textContent.trim().toLowerCase().replace(" ", "");

        // Move bubbles
        moveBubbles(li);

        // Filter items
        visibleItems = Array.from(allItems).filter(item => {
            if (item.dataset.category === category) {
                item.style.display = "block";
                return true;
            } else {
                item.style.display = "none";
                return false;
            }
        });

        // Reset index + update
        currentIndex = 0;
        updateCarousel();

        // Highlight active nav
        navItems.forEach(item => item.classList.remove('active'));
        li.classList.add('active');
    });
});

// Carousel update
function updateCarousel() {
    if (visibleItems.length === 0) return;

    const itemWidth = visibleItems[0].offsetWidth;
    const gap = parseInt(getComputedStyle(carousel).gap) || 0;
    const itemSpace = itemWidth + gap;

    visibleItems.forEach((item, i) => {
        item.classList.remove('center', 'side');
        if (i === currentIndex) {
            item.classList.add('center');
        } else {
            item.classList.add('side');
        }
    });

    const containerWidth = carousel.parentElement.offsetWidth;
    const offset = -(currentIndex * itemSpace) + (containerWidth / 2 - itemWidth / 2);

    carousel.style.transform = `translateX(${offset}px)`;
}

// Arrows
document.querySelector('.next').addEventListener('click', () => {
    if (currentIndex < visibleItems.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});
document.querySelector('.prev').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

// Swipe (optional cleanup)
let startX = 0;
carousel.addEventListener('touchstart', e => startX = e.touches[0].pageX);
carousel.addEventListener('touchmove', e => {
    const dx = e.touches[0].pageX - startX;
    if (dx > 30 && currentIndex > 0) {
        currentIndex--;
        updateCarousel();
        startX = e.touches[0].pageX;
    }
    if (dx < -30 && currentIndex < visibleItems.length - 1) {
        currentIndex++;
        updateCarousel();
        startX = e.touches[0].pageX;
    }
});

// Init: show first category
visibleItems = Array.from(allItems).filter(item => item.dataset.category === firstCategory);
// Hide everything first
allItems.forEach(item => item.style.display = "none");

visibleItems.forEach(item => item.style.display = "block");

// Highlight first nav item
navItems.forEach(item => item.classList.remove('active'));
navItems[0].classList.add('active'); // assuming first li is Ramen

const activeLi = document.querySelector(".menu-category nav li.active");
moveBubbles(activeLi);

updateCarousel();


function redirectToPage() {
    window.location.href = '/pages/menu.html'; // Replace with your target URL
}
