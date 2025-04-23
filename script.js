// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const typed = new Typed('.typing-text', {
        strings: ['ML Engineer', 'UI/UX Designer'],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        const icon = themeToggle.querySelector('i');
        if (savedTheme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the position to scroll to
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });

    // Scroll animations with Intersection Observer for better performance
    const animateOnScroll = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.section-title, .skill-card, .project-card, .timeline-item, .certification-card').forEach(element => {
            observer.observe(element);
        });
    };

    // Initialize animations
    animateOnScroll();
});

* Chatbot Styles */
.chatbot-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 60px;
    height: 60px;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    z-index: 1000;
    transition: all 0.3s ease;
  }
  
  .chatbot-btn:hover {
    transform: scale(1.1);
  }
  
  .chatbot-container {
    position: fixed;
    bottom: 100px;
    right: 30px;
    width: 350px;
    height: 500px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 5px 30px rgba(0,0,0,0.2);
    display: none;
    flex-direction: column;
    z-index: 1000;
    overflow: hidden;
    border: 1px solid #eee;
  }
  
  [data-theme="dark"] .chatbot-container {
    background: var(--dark-color);
    border-color: #444;
  }
  
  .chatbot-header {
    padding: 15px;
    background: var(--primary-color);
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .chatbot-messages {
    flex: 1;
    padding: 15px;
    overflow-y: auto;
  }
  
  .message {
    margin-bottom: 15px;
    max-width: 80%;
    padding: 10px 15px;
    border-radius: 18px;
    line-height: 1.4;
  }
  
  .user-message {
    background: #e3f2fd;
    margin-left: auto;
    border-bottom-right-radius: 5px;
  }
  
  [data-theme="dark"] .user-message {
    background: #1a3a5c;
  }
  
  .bot-message {
    background: #f1f1f1;
    margin-right: auto;
    border-bottom-left-radius: 5px;
  }
  
  [data-theme="dark"] .bot-message {
    background: #2d2d2d;
  }
  
  .chatbot-input {
    display: flex;
    padding: 15px;
    border-top: 1px solid #eee;
  }
  
  [data-theme="dark"] .chatbot-input {
    border-top-color: #444;
  }
  
  .chatbot-input input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 30px;
    outline: none;
  }
  
  [data-theme="dark"] .chatbot-input input {
    background: #333;
    border-color: #555;
    color: white;
  }
  
  .chatbot-input button {
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    margin-left: 10px;
    cursor: pointer;
  }
