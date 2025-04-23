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

// Chatbot Data - Customize with your information
const chatbotData = {
    skills: [
      "Machine Learning: Python, TensorFlow, PyTorch, OpenCV",
      "Programming: Java, C++, JavaScript, Node.js",
      "UI/UX: Figma, Adobe XD, Prototyping",
      "DevOps: Docker, Kubernetes"
    ],
    education: [
      "B.Tech (CSE) - Lovely Professional University (Expected 2026)",
      "12th Grade - Resonance (2022)",
      "10th Grade - S.S Model High School"
    ],
    projects: [
      "Whiteboard Content Digitization System (Computer Vision)",
      "Conversational Chatbot using NLP",
      "AharaSetu (Food Redistribution Platform)",
      "Explore Ease (Travel App Design)"
    ],
    contact: [
      "Email: gummadala.bhavani@example.com",
      "Location: Hyderabad, Telangana, India",
      "LinkedIn: linkedin.com/in/bhavaniprasadgummadala",
      "GitHub: github.com/Bhavaniprasadgummadala"
    ],
    certifications: [
      "Digital Skills: UI/UX - Accenture (2025)",
      "Cloud Computing - NPTEL (2024)",
      "Gen AI with LLM (2024)",
      "Frontend Web Development Bootcamp - Infosys Springboard (2023)"
    ],
    internship: "AI/ML Intern at AICTE partnership with Techsaksham & Microsoft (Dec 2024 - Feb 2025): Worked on Stable Diffusion for image generation."
  };
  
  // Chatbot UI Elements
  const chatbotToggle = document.getElementById('chatbotToggle');
  const chatbotContainer = document.getElementById('chatbotContainer');
  const closeChatbot = document.getElementById('closeChatbot');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const userInput = document.getElementById('userInput');
  const sendMessage = document.getElementById('sendMessage');
  
  // Toggle chatbot visibility
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    addBotMessage("Hi! I'm Bhavani's assistant. Ask me about his skills, education, projects, contact info, certifications, or internship.");
  });
  
  closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
  });
  
  // Send message on button click or Enter key
  sendMessage.addEventListener('click', processMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') processMessage();
  });
  
  function processMessage() {
    const message = userInput.value.trim();
    if (message) {
      addUserMessage(message);
      userInput.value = '';
      setTimeout(() => generateBotResponse(message), 500);
    }
  }
  
  function addUserMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'user-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function addBotMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', 'bot-message');
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function generateBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    let response = "I can tell you about Bhavani's skills, education, projects, contact info, certifications, or internship. What would you like to know?";
  
    if (lowerMessage.includes('skill') || lowerMessage.includes('what can you do') || lowerMessage.includes('expertise')) {
      response = "Bhavani's skills include:\n" + chatbotData.skills.join("\n• ");
    } 
    else if (lowerMessage.includes('educat') || lowerMessage.includes('school') || lowerMessage.includes('college') || lowerMessage.includes('degree')) {
      response = "Bhavani's education:\n" + chatbotData.education.join("\n• ");
    }
    else if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('portfolio')) {
      response = "Bhavani's projects:\n" + chatbotData.projects.join("\n• ");
    }
    else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('connect')) {
      response = "You can contact Bhavani at:\n" + chatbotData.contact.join("\n• ");
    }
    else if (lowerMessage.includes('certif') || lowerMessage.includes('course') || lowerMessage.includes('train')) {
      response = "Bhavani's certifications:\n" + chatbotData.certifications.join("\n• ");
    }
    else if (lowerMessage.includes('intern') || lowerMessage.includes('experience') || lowerMessage.includes('work experience')) {
      response = "Internship experience:\n" + chatbotData.internship;
    }
    else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      response = "Hello! I can tell you about Bhavani's professional background. What would you like to know?";
    }
  
    addBotMessage(response);
  }
