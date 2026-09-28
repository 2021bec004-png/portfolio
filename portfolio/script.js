// Interactive Logic for Adarsh Wankar's Portfolio

document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initParticleCanvas();
    initProjectFilters();
    initScrollSpy();
    initSkillBars();
    initContactForm();
});

/* --- Typing Effect --- */
const typingPhrases = [
    "Full Stack Developer",
    "Java & Spring Boot Engineer",
    "Mobile App Developer (CDAC Sunbeam Pune)",
    "AI & NLP Solution Builder"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function initTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;

    const currentPhrase = typingPhrases[phraseIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2200; // Pause at full word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typingPhrases.length;
        typeSpeed = 500;
    }

    setTimeout(initTypingEffect, typeSpeed);
}

/* --- Interactive Particle Background Canvas --- */
function initParticleCanvas() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 20), 65);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Render particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#00f0ff';
            ctx.fill();
            ctx.shadowBlur = 0;
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* --- Project Filtering --- */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-cyan-500', 'text-black', 'glow');
                b.classList.add('border-cyan-500/30', 'text-cyan-300', 'hover:border-cyan-400');
            });
            btn.classList.add('bg-cyan-500', 'text-black', 'glow');
            btn.classList.remove('border-cyan-500/30', 'text-cyan-300');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/* --- Project Details Data & Modal --- */
const projectsData = {
    'sales-inventory': {
        title: 'Sales & Inventory Management Dashboard',
        category: 'Java / Backend Engineering (2026)',
        tech: ['Java (Core & OOP)', 'Spring Boot', 'Spring Security', 'JWT Auth', 'MySQL', 'REST API', 'Maven'],
        img: 'assets/sales_inventory.jpg',
        description: 'Built a high-performance Java Spring Boot backend exposing REST APIs for product catalog, sales tracking, and inventory operations backed by a normalized MySQL relational database.',
        features: [
            'Designed relational database schema (products, sales, sale items, inventory transactions, users) with service-layer business logic (auto stock deduction on sale)',
            'Implemented JWT-based authentication & Spring Security Role-Based Access Control (Admin, Manager, Staff)',
            'Iteratively maintained and extended the system with reporting/analytics endpoints and CSV data export',
            'Handled API integration, transaction debugging across data layers, and clean documentation'
        ],
        github: 'https://github.com/2021bec004-png/'
    },
    'ai-legal': {
        title: 'AI-Based Legal Document Summarizer',
        category: 'AI & Natural Language Processing (Jan 2025 – May 2025)',
        tech: ['Python', 'Flask', 'NLP', 'Sentence Ranking', 'Semantic Models', 'Tailwind CSS'],
        img: 'assets/ai_legal.jpg',
        description: 'Built an NLP-based system to automatically summarize lengthy legal documents, extracting key clauses, reducing redundancy, and producing domain-tailored digests.',
        features: [
            'Applied semantic understanding and sentence-ranking models to generate accurate, domain-specific summaries',
            'Automated key-clause extraction (Obligations, Indemnification, Liabilities, Breach terms)',
            'Integrated Python Flask backend with responsive UI for uploading and reviewing legal digests',
            'Significantly reduces document review time for legal contracts and academic texts'
        ],
        github: 'https://github.com/2021bec004-png/'
    },
    'expense-tracker': {
        title: 'Expense Tracker Application',
        category: 'Full-Stack Web Application (Aug 2024 – Oct 2024)',
        tech: ['JavaScript', 'HTML5/CSS3', 'Node.js', 'Express', 'REST APIs', 'User Auth'],
        img: 'assets/expense_tracker.jpg',
        description: 'Built a full-stack web application for expense tracking, budget setting, and spending visualization, improving budgeting efficiency by 30%.',
        features: [
            'Improved budgeting efficiency by 30% through real-time expense visualization and goal tracking',
            'Implemented secure user authentication and REST APIs for seamless data handling',
            'Responsive analytics dashboard with spending category breakdowns and monthly trends',
            'Modular code structure adhering to clean RESTful standards'
        ],
        github: 'https://github.com/2021bec004-png/'
    },
    'gsm-fire': {
        title: 'GSM-Based Fire Alarm System',
        category: 'Embedded Systems & IoT (Mar 2022 – May 2022)',
        tech: ['Assembly Language', 'Embedded C', 'Smoke & Temp Sensors', 'GSM Module', 'IoT Alerts'],
        img: 'assets/gsm_fire.jpg',
        description: 'Developed an embedded hardware/software system to monitor smoke and temperature levels continuously, triggering automated acoustic alarms and location SMS alerts to predefined contacts.',
        features: [
            'Real-time continuous sensor monitoring for smoke thresholds and thermal spikes',
            'GSM module integration to dispatch automated location SMS alerts to emergency contacts',
            'Fail-safe hardware battery backup monitoring and siren triggering logic',
            'Written in low-level Assembly/Embedded C for instant response latency'
        ],
        github: 'https://github.com/2021bec004-png/'
    }
};

function openProjectModal(key) {
    const data = projectsData[key];
    if (!data) return;

    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalImg').src = data.img;
    document.getElementById('modalDesc').textContent = data.description;
    
    // Tech badges
    const techContainer = document.getElementById('modalTech');
    techContainer.innerHTML = data.tech.map(t => 
        `<span class="px-3 py-1 bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 rounded-full text-xs font-semibold">${t}</span>`
    ).join('');

    // Features list
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = data.features.map(f => 
        `<li class="flex items-start gap-2 text-gray-300 text-sm">
            <span class="text-cyan-400 font-bold mt-0.5">✓</span>
            <span>${f}</span>
        </li>`
    ).join('');

    document.getElementById('modalGithubBtn').href = data.github;

    const modal = document.getElementById('projectModal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

/* --- Click to Copy & Toast Notification --- */
function copyToClipboard(text, label) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label} to clipboard!`);
    }).catch(err => {
        showToast(`Selected: ${text}`);
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = msg;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/* --- Scroll Spy & Navigation Highlight --- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset + 150;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-cyan-400', 'active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-cyan-400', 'active');
                    }
                });
            }
        });

        // Scroll to Top Button Visibility
        const scrollTopBtn = document.getElementById('scrollTopBtn');
        if (scrollTopBtn) {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.remove('opacity-0', 'pointer-events-none');
            } else {
                scrollTopBtn.classList.add('opacity-0', 'pointer-events-none');
            }
        }
    });
}

/* --- Skill Progress Bars Animation on Scroll --- */
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar-inner');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetWidth = entry.target.getAttribute('data-width');
                entry.target.style.width = targetWidth;
            }
        });
    }, { threshold: 0.2 });

    skillBars.forEach(bar => observer.observe(bar));
}

/* --- Mobile Menu Toggling --- */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.toggle('hidden');
}

/* --- Contact Form Handling --- */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Transmitting Signal...
        `;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            closeContactModal();
            form.reset();
            showToast('🚀 Message received! Thanks for reaching out, Adarsh will contact you soon.');
        }, 1500);
    });
}

function openContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
