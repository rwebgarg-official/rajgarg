document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const card = document.querySelector('.card');
    const themeToggle = document.querySelector('.theme-toggle');
    const mailBtn = document.querySelector('.btn-mail');
    const shareBtn = document.querySelector('.btn-share');
    const html = document.documentElement;

    // Contact Data
    const contactInfo = {
        name: 'Raj Garg',
        title: 'Full Stack Developer',
        email: 'rwebgarg@gmail.com',
        website: 'https://rajgarg.dev',
        organization: 'Garg Tech Solutions',
        social: {
            linkedin: 'https://linkedin.com/in/rajgarg',
            github: 'https://github.com/rajgarg'
        }
    };

    // 1. 3D Tilt Effect
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;

        const rotateX = (mouseY / (cardRect.height / 2)) * -10; // Max 10deg
        const rotateY = (mouseX / (cardRect.width / 2)) * 10;   // Max 10deg

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0)';
    });

    // 2. Theme Toggle
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    }

    // 3. Send Mail
    mailBtn.addEventListener('click', () => {
        window.location.href = `mailto:${contactInfo.email}`;
    });

    // 4. Web Share API
    shareBtn.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${contactInfo.name} - Digital Card`,
                    text: `Check out ${contactInfo.name}'s digital visiting card!`,
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        }
    });
    // 5. Inject Footer Ad
    const footerAd = document.createElement('div');
    footerAd.className = 'footer-ad';
    footerAd.innerHTML = '<p>Powered by <a href="https://stegure.in" target="_blank" class="ad-link">Stegure.in</a></p>';
    card.appendChild(footerAd);
});
