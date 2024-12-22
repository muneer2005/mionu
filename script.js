document.addEventListener('DOMContentLoaded', (event) => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate skill progress on scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const languageItems = document.querySelectorAll('.language-item');

    function animateProgress() {
        skillItems.forEach(item => {
            const circle = item.querySelector('.progress');
            const percent = item.getAttribute('data-skill');
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
        });

        languageItems.forEach(item => {
            const progress = item.querySelector('.level-progress');
            const percent = progress.style.width;
            progress.style.width = '0%';
            setTimeout(() => {
                progress.style.width = percent;
            }, 100);
        });
    }

    // Trigger animation when elements are in view
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    function handleScroll() {
        const skillsSection = document.getElementById('skills');
        const languagesSection = document.getElementById('languages');

        if (isInViewport(skillsSection) || isInViewport(languagesSection)) {
            animateProgress();
            window.removeEventListener('scroll', handleScroll);
        }
    }

    window.addEventListener('scroll', handleScroll);

    // Form submission
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would typically send the form data to a server
        // For this example, we'll just log it to the console
        const formData = new FormData(form);
        console.log('Form submitted with data:');
        for (let [key, value] of formData.entries()) {
            console.log(key + ': ' + value);
        }

        // Clear the form
        form.reset();

        // Show a success message
        alert('Thank you for your message. I will get back to you soon!');
    });
});

// document.querySelectorAll('.skill-item').forEach((item) => {
//     const progressCircle = item.querySelector('.progress');
//     const skillValue = item.getAttribute('data-skill'); // e.g., 85%

//     // Calculate the stroke-dashoffset based on the percentage
//     const circumference = 2 * Math.PI * 45; // 45 is the radius
//     const offset = circumference - (skillValue / 100) * circumference;

//     // Apply the offset
//     progressCircle.style.strokeDashoffset = offset;
// });