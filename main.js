
// Function to toggle the responsive menu
function toggleMenu() {
    const menu = document.querySelector('.toggle-menu');
    menu.classList.toggle('active');
}

// Trigger animations
document.addEventListener('scroll', () => {
    document.querySelectorAll('.fade-in').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            section.classList.add('visible');
        }
    });
});

