document.addEventListener('DOMContentLoaded', () => {
    // Current Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Booking Form Submission
    const bookingForm = document.getElementById('bookingForm');
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.childNodes[0]; // Text node
    const spinner = document.getElementById('btnSpinner');
    const formMessage = document.getElementById('formMessage');

    bookingForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI State: Loading
        spinner.style.display = 'inline-block';
        submitBtn.disabled = true;
        formMessage.className = 'form-message'; // reset

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service').value,
            date: document.getElementById('date').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('https://hairbeauty-website.onrender.com/api/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                formMessage.textContent = 'Thank you! Your booking request has been received.';
                formMessage.classList.add('msg-success');
                bookingForm.reset();
            } else {
                formMessage.textContent = data.error || 'An error occurred. Please try again.';
                formMessage.classList.add('msg-error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            formMessage.textContent = 'Network error. Please try again later.';
            formMessage.classList.add('msg-error');
        } finally {
            // UI State: Reset
            spinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });
});
