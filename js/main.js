// Wait for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', () => {
    
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the menu
            mainNav.classList.toggle('active');
            
            // Swap the icon between hamburger and close (X)
            if (mainNav.classList.contains('active')) {
                mobileMenuToggle.innerHTML = '✕'; // Close icon
            } else {
                mobileMenuToggle.innerHTML = '☰'; // Hamburger icon
            }
        });

        // Optional: Close the menu automatically when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenuToggle.innerHTML = '☰';
            });
        });
    }
    // Lightbox Functionality
    const modal = document.getElementById("portfolio-modal");
    const modalImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".lightbox-close");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (modal && portfolioItems.length > 0) {
        portfolioItems.forEach(item => {
            item.addEventListener('click', () => {
                // Find the image inside the clicked portfolio item
                const img = item.querySelector('img');
                if (img) {
                    modal.style.display = "flex";
                    modal.style.justifyContent = "center";
                    modal.style.alignItems = "center";
                    modalImg.src = img.src; // Copy the source to the modal
                }
            });
        });

        // Close modal on 'X' click
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });

        // Close modal when clicking anywhere outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });
    }
    // Add this to your main.js inside your existing DOMContentLoaded block
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Triggers when 15% of the element is visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

// Select the elements you want to animate
// Select all elements that need to animate on scroll
const revealElements = document.querySelectorAll('.hero-content, .hero-visual, .stats-section, .about-image, .about-content, .service-card, .trust-item, .portfolio-item, .faq-accordion, .testimonial-card, .cta-section, .footer-grid, .section-header');
revealElements.forEach(el => {
    el.classList.add('reveal-hidden'); // Add base hidden state
    observer.observe(el);
});
// ==========================================
    // Number Counter Animation
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const animationSpeed = 200; // Lower is faster, higher is slower

    // Create a new observer specifically for the counters so they only start when visible
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                
                const updateCount = () => {
                    const target = +counter.getAttribute('data-target'); // Get the target number
                    const count = +counter.innerText; // Get the current number
                    
                    // Calculate the increment step
                    const increment = target / animationSpeed;

                    if (count < target) {
                        // Math.ceil rounds up so we don't get decimals
                        counter.innerText = Math.ceil(count + increment);
                        setTimeout(updateCount, 20); // Run this function again every 20ms
                    } else {
                        counter.innerText = target; // Ensure it ends exactly on the target
                    }
                };
                
                updateCount();
                observer.unobserve(counter); // Stop observing once it has animated
            }
        });
    }, { threshold: 0.5 }); // Triggers when 50% of the counter is visible on screen

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
});