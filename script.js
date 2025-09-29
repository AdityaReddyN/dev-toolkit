// Modern Dev Toolkit JavaScript
// Interactive elements and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initTypingEffect();
    initCounterAnimation();
    initToolsFilter();
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScrolling();
    initParallaxEffect();
    initAdvancedSearch();
    initThemeSystem();
    initPerformanceMonitoring();
});

// Typing Effect Animation
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;

    const messages = [
        'Build Amazing Tools',
        'Join Open Source',
        'Code Something Great',
        'Make a Difference',
        'Create & Contribute'
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeMessage() {
        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            typingText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            setTimeout(() => isDeleting = true, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
        }

        setTimeout(typeMessage, typingSpeed);
    }

    typeMessage();
}

// Animated Counter
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');

    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / 200;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    // Intersection Observer for counter animation
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.7 });

    counters.forEach(counter => {
        counter.innerText = '0';
        counterObserver.observe(counter);
    });
}

// Tools Filter System
function initToolsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            toolCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.tool-card, .contribute-content, .footer-content');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });
}

// Navbar Scroll Effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.style.background = 'rgba(15, 15, 35, 0.98)';
            navbar.style.backdropFilter = 'blur(30px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        }

        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effect for Background Shapes
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        shapes.forEach((shape, index) => {
            const speed = 0.2 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Tool Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const toolCards = document.querySelectorAll('.tool-card:not(.add-tool-card)');

    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(255, 107, 53, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.2)';
        });
    });
});

// Add Tool Card Click Handler
document.addEventListener('DOMContentLoaded', function() {
    const addToolCard = document.querySelector('.add-tool-card');

    if (addToolCard) {
        addToolCard.addEventListener('click', function() {
            window.open('https://github.com/heysaiyad/dev-toolkit', '_blank');
        });
    }
});

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
});

// Add CSS for ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Loading Animation for Page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-out';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Easter Egg: Konami Code
let konamiCode = [];
const correctCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.keyCode);

    if (konamiCode.length > correctCode.length) {
        konamiCode.shift();
    }

    if (JSON.stringify(konamiCode) === JSON.stringify(correctCode)) {
        // Easter egg animation
        document.body.style.animation = 'rainbow 2s infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

// Rainbow animation for easter egg
const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// Advanced Search System
function initAdvancedSearch() {
    const searchInput = document.getElementById('toolSearch');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const resultCount = document.getElementById('resultCount');
    const toolCards = document.querySelectorAll('.tool-card:not(.add-tool-card)');

    // Tool database for search
    const toolsDatabase = [
        {
            name: 'Word Counter',
            description: 'Count words, characters, and paragraphs in your text with real-time analysis',
            category: 'text',
            keywords: ['word', 'count', 'text', 'character', 'paragraph', 'analysis'],
            icon: 'fas fa-font',
            url: 'tools/word-counter/index.html'
        },
        {
            name: 'JSON Formatter',
            description: 'Format and validate JSON data with syntax highlighting',
            category: 'code',
            keywords: ['json', 'format', 'validate', 'syntax', 'code'],
            icon: 'fas fa-code',
            url: '#'
        },
        {
            name: 'Color Picker',
            description: 'Advanced color picker with palette generation',
            category: 'utility',
            keywords: ['color', 'picker', 'palette', 'hex', 'rgb'],
            icon: 'fas fa-palette',
            url: '#'
        }
    ];

    let searchTimeout;

    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            handleSearch(this.value);
        }, 300);
    });

    searchInput.addEventListener('focus', function() {
        if (this.value.length > 0) {
            showSuggestions(this.value);
        }
    });

    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-wrapper')) {
            hideSuggestions();
        }
    });

    function handleSearch(query) {
        const results = fuzzySearch(query, toolsDatabase);
        updateToolDisplay(results, query);
        updateResultCount(results.length);

        if (query.length > 0) {
            showSuggestions(query, results);
        } else {
            hideSuggestions();
            showAllTools();
        }
    }

    function fuzzySearch(query, tools) {
        if (!query) return tools;

        query = query.toLowerCase();
        return tools.filter(tool => {
            const searchText = `${tool.name} ${tool.description} ${tool.keywords.join(' ')}`.toLowerCase();

            // Exact match gets highest priority
            if (searchText.includes(query)) return true;

            // Fuzzy matching for typos
            const words = query.split(' ');
            return words.some(word => {
                return tool.keywords.some(keyword => {
                    return levenshteinDistance(word, keyword) <= 2;
                });
            });
        });
    }

    function levenshteinDistance(str1, str2) {
        const matrix = [];
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[str2.length][str1.length];
    }

    function showSuggestions(query, results = null) {
        if (!results) results = fuzzySearch(query, toolsDatabase);

        if (results.length === 0) {
            hideSuggestions();
            return;
        }

        const suggestionsHTML = results.slice(0, 5).map(tool => `
            <div class="suggestion-item" data-url="${tool.url}">
                <div class="suggestion-icon">
                    <i class="${tool.icon}"></i>
                </div>
                <div class="suggestion-content">
                    <div class="suggestion-title">${highlightText(tool.name, query)}</div>
                    <div class="suggestion-description">${highlightText(tool.description, query)}</div>
                </div>
            </div>
        `).join('');

        searchSuggestions.innerHTML = suggestionsHTML;
        searchSuggestions.classList.add('show');

        // Add click handlers
        searchSuggestions.querySelectorAll('.suggestion-item').forEach(item => {
            item.addEventListener('click', function() {
                const url = this.getAttribute('data-url');
                if (url !== '#') {
                    window.location.href = url;
                }
            });
        });
    }

    function hideSuggestions() {
        searchSuggestions.classList.remove('show');
    }

    function highlightText(text, query) {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<mark style="background: var(--primary-color); color: white; padding: 0 2px; border-radius: 2px;">$1</mark>');
    }

    function updateToolDisplay(results, query) {
        toolCards.forEach(card => {
            const toolName = card.querySelector('.tool-title')?.textContent || '';
            const toolDesc = card.querySelector('.tool-description')?.textContent || '';

            const isMatch = results.some(result =>
                result.name.toLowerCase() === toolName.toLowerCase()
            );

            if (query.length === 0 || isMatch) {
                card.style.display = 'flex';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function showAllTools() {
        toolCards.forEach(card => {
            card.style.display = 'flex';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        });
        updateResultCount(toolCards.length);
    }

    function updateResultCount(count) {
        resultCount.textContent = count;
    }

    // Initialize count
    updateResultCount(toolCards.length);
}

// Advanced Theme System
function initThemeSystem() {
    const themes = {
        'hacktoberfest': {
            name: 'Hacktoberfest',
            primary: '#ff6b35',
            secondary: '#0081b4',
            accent: '#ff8c42',
            bgPrimary: '#0f0f23',
            bgSecondary: '#1a1a2e'
        },
        'midnight': {
            name: 'Midnight Blue',
            primary: '#4a90e2',
            secondary: '#2c5aa0',
            accent: '#7bb3f0',
            bgPrimary: '#0a0e27',
            bgSecondary: '#1a1f3a'
        },
        'neon': {
            name: 'Neon Dreams',
            primary: '#00ff9f',
            secondary: '#00d4ff',
            accent: '#ff0090',
            bgPrimary: '#0d0208',
            bgSecondary: '#1a0f1a'
        },
        'sunset': {
            name: 'Sunset Vibes',
            primary: '#ff6b9d',
            secondary: '#ff8c42',
            accent: '#ffd23f',
            bgPrimary: '#2d1b1e',
            bgSecondary: '#3d2b2e'
        }
    };

    let currentTheme = localStorage.getItem('devtoolkit-theme') || 'hacktoberfest';

    // Create theme selector (hidden by default, can be triggered with Ctrl+T)
    function createThemeSelector() {
        const themeSelector = document.createElement('div');
        themeSelector.className = 'theme-selector';
        themeSelector.innerHTML = `
            <div class="theme-selector-content">
                <h3>Choose Theme</h3>
                <div class="theme-options">
                    ${Object.keys(themes).map(key => `
                        <div class="theme-option ${key === currentTheme ? 'active' : ''}" data-theme="${key}">
                            <div class="theme-preview">
                                <div class="color-primary" style="background: ${themes[key].primary}"></div>
                                <div class="color-secondary" style="background: ${themes[key].secondary}"></div>
                                <div class="color-accent" style="background: ${themes[key].accent}"></div>
                            </div>
                            <span>${themes[key].name}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="close-theme-selector">×</button>
            </div>
        `;

        document.body.appendChild(themeSelector);

        // Add event listeners
        themeSelector.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', function() {
                const themeName = this.getAttribute('data-theme');
                applyTheme(themeName);

                // Update active state
                themeSelector.querySelectorAll('.theme-option').forEach(opt => opt.classList.remove('active'));
                this.classList.add('active');

                // Save preference
                localStorage.setItem('devtoolkit-theme', themeName);
                currentTheme = themeName;
            });
        });

        themeSelector.querySelector('.close-theme-selector').addEventListener('click', function() {
            themeSelector.remove();
        });

        return themeSelector;
    }

    function applyTheme(themeName) {
        const theme = themes[themeName];
        if (!theme) return;

        const root = document.documentElement;
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--secondary-color', theme.secondary);
        root.style.setProperty('--accent-color', theme.accent);
        root.style.setProperty('--bg-primary', theme.bgPrimary);
        root.style.setProperty('--bg-secondary', theme.bgSecondary);

        // Update gradients
        root.style.setProperty('--gradient-primary', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.accent} 100%)`);
        root.style.setProperty('--gradient-secondary', `linear-gradient(135deg, ${theme.secondary} 0%, ${theme.primary} 100%)`);

        // Add theme transition effect
        document.body.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    }

    // Keyboard shortcut to open theme selector (Ctrl+T)
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 't') {
            e.preventDefault();
            if (!document.querySelector('.theme-selector')) {
                createThemeSelector();
            }
        }
    });

    // Apply saved theme on load
    applyTheme(currentTheme);

    // Add theme selector styles
    const themeStyles = document.createElement('style');
    themeStyles.textContent = `
        .theme-selector {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease-out;
        }

        .theme-selector-content {
            background: var(--bg-secondary);
            border-radius: var(--radius-lg);
            padding: 2rem;
            position: relative;
            max-width: 500px;
            width: 90%;
        }

        .theme-selector h3 {
            margin-bottom: 1.5rem;
            text-align: center;
            color: var(--text-primary);
        }

        .theme-options {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }

        .theme-option {
            background: var(--bg-primary);
            border: 2px solid transparent;
            border-radius: var(--radius-md);
            padding: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: center;
        }

        .theme-option:hover,
        .theme-option.active {
            border-color: var(--primary-color);
            transform: translateY(-5px);
        }

        .theme-preview {
            display: flex;
            gap: 4px;
            margin-bottom: 0.5rem;
            justify-content: center;
        }

        .theme-preview div {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }

        .close-theme-selector {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: var(--text-muted);
            cursor: pointer;
        }
    `;
    document.head.appendChild(themeStyles);
}

// Performance Monitoring
function initPerformanceMonitoring() {
    // Monitor load times
    window.addEventListener('load', function() {
        const loadTime = performance.now();
        console.log(`🚀 DevToolkit loaded in ${loadTime.toFixed(2)}ms`);

        // Track Core Web Vitals
        if ('web-vital' in window) {
            // This would integrate with web-vitals library if available
            console.log('📊 Web Vitals monitoring enabled');
        }
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.duration > 50) {
                    console.warn(`⚠️ Long task detected: ${entry.duration.toFixed(2)}ms`);
                }
            }
        });

        try {
            observer.observe({ entryTypes: ['longtask'] });
        } catch (e) {
            // Browser doesn't support longtask API
        }
    }

    // Image lazy loading optimization
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}