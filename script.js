// Foo Fighters Charity - Professional Interactive Script
// Google Form: https://prettyform.addxt.com/a/form/vf/1FAIpQLSdIvFW09dXoMMlhXNUxKeSSCeowAy5pMucDBw5Tbjm0at7AhA
// Prefill params: update if needed (inspect form for exact entry.XXXX fields)

const GOOGLE_FORM_BASE = 'https://prettyform.addxt.com/a/form/vf/1FAIpQLSdIvFW09dXoMMlhXNUxKeSSCeowAy5pMucDBw5Tbjm0at7AhA';
const ENTRY_NAME = 'entry.123456789';  // Update with real name field ID
const ENTRY_EMAIL = 'entry.111111111'; // Update with real email
const ENTRY_AMOUNT = 'entry.987654321'; // Update with real amount

// Smooth scrolling for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Animate on scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all animate elements
document.querySelectorAll('.animate').forEach(el => {
    observer.observe(el);
});

// Stats counter animation
function animateStats() {
    const stats = document.querySelectorAll('[data-target]');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target').replace(/[^0-9]/g, ''));
        const count = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = count;

        if (current < target) {
            current += increment;
            stat.innerText = '$' + Math.floor(current).toLocaleString() + (stat.querySelector('p').textContent.includes('100%') ? '%' : '');
            if (stat.querySelector('p').textContent.includes('Users') || stat.querySelector('p').textContent.includes('Venues')) {
                stat.innerText = Math.floor(current).toLocaleString();
            }
            requestAnimationFrame(animateStats);
        }
    });
}

// Trigger stats when stats section visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
    // Initial call if already visible
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
        animateStats();
    }
}

// Donation handlers
document.querySelectorAll('.donate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = btn.dataset.amount;
        promptNameAndDonate(amount);
    });
});

function donateDirect(amount) {
    const name = localStorage.getItem('donorName') || 'Anonymous Donor';
    const email = localStorage.getItem('donorEmail') || '';

    const params = new URLSearchParams({
        [ENTRY_NAME]: name,
        [ENTRY_EMAIL]: email,
        [ENTRY_AMOUNT]: `$${amount}`
    });

    const formUrl = `${GOOGLE_FORM_BASE}?${params.toString()}`;
    window.open(formUrl, '_blank');
}

// Donation handlers - direct no prompts
document.querySelectorAll('.donate-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const amount = btn.dataset.amount;
        donateDirect(amount);
    });
});

// Custom donate
function handleCustomDonate() {
    const finalAmount = document.getElementById('custom-amount').value;
    if (!finalAmount || finalAmount <= 0) {
        return; // Silent
    }
    donateDirect(finalAmount);
}

// Parallax effect removed for static stats
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(0px)`;
    }
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

