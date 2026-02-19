document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initStickyHeader();
    initGalleryFilter();
});

function loadHeader() {
    const headerHTML = `
    <div class="container nav-container">
<a href="index.html" class="logo">
<img src="images/logo.png" alt="Shanthi Jeevan Mission Logo" class="logo-img">
<span class="logo-text">Shanthi Jeevan <span>Mission</span></span>
</a>
        <div class="mobile-toggle" onclick="toggleMenu()">
            <i class="fas fa-bars"></i>
        </div>
        <nav>
            <ul class="nav-menu" id="nav-menu">
                <li><a href="index.html" class="nav-link">Home</a></li>
                <li><a href="about.html" class="nav-link">About Us</a></li>
                <li><a href="ministries.html" class="nav-link">Ministries</a></li>
                <li><a href="mission-fields.html" class="nav-link">Missions</a></li>
                <li><a href="impact.html" class="nav-link">Impact</a></li>
                <li><a href="events.html" class="nav-link">Events</a></li>
                <li><a href="gallery.html" class="nav-link">Gallery</a></li>
                <li><a href="contact.html" class="nav-link">Contact</a></li>
                <li><a href="donate.html" class="btn btn-primary" style="padding: 8px 20px; color: var(--color-text-grey);">Donate</a></li>
            </ul>
        </nav>
    </div>
    `;
    
    document.querySelector('header').innerHTML = headerHTML;
    setActiveLink();
}

function loadFooter() {
    const footerHTML = `
    <div class="container">
        <div class="footer-content">
            <div class="footer-col">
                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px;">
                    <img src="images/logo.png" alt="Logo" style="height: 50px; width: auto;" >
                    <h3 style="margin: 0; font-size: 1.2rem;">Shanthi Jeevan Mission</h3>
                    
                </div>
                <p style="color: white;">Bringing hope, healing, and holistic development to the marginalized communities through the love of Christ.</p>
            </div>
            <div class="footer-col">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="ministries.html">Our Ministries</a></li>
                    <li><a href="impact.html">Impact Stories</a></li>
                    <li><a href="donate.html">Donate</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Contact Info</h3>
                <ul>
                    <li><i class="fas fa-map-marker-alt"></i>  5/265A, Kotaibyrahalli, Solaikottai (PO), Dharmapuri, Tamil Nadu, India – 636704</li>
                    <li><i class="fas fa-phone"></i> +91 8903550483</li>
                    <li><i class="fas fa-envelope"></i> shanthijeevanevangelical@gmail.com</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p  style="color: white;">&copy; 2026 Shanthi Jeevan Evangelical Mission. All Rights Reserved.</p>
        </div>
    </div>
    `;
    
    document.querySelector('footer').innerHTML = footerHTML;
}

function toggleMenu() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.toggle('active');
}

function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');
    
    links.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

function initStickyHeader() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterBtns.length) return; // Exit if not on gallery page

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    // Add fade-in effect
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

const form = document.getElementById('contactForm');
const modal = document.getElementById('thankyouModal');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(form);

    fetch(form.action, {
        method: form.method,
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            modal.style.display = 'flex'; // show modal
            form.reset();
            setTimeout(() => { modal.style.display = 'none'; }, 5000); // auto-hide after 5s
        } else {
            alert('Oops! Something went wrong.');
        }
    }).catch(error => {
        alert('Oops! Something went wrong.');
    });
});

function closeModal() {
    modal.style.display = 'none';
}