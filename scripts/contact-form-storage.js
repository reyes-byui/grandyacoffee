document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (!form) return;
    const fields = ['first-name', 'last-name', 'email', 'message'];
    // Restore saved values
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el && localStorage.getItem('contact_' + id)) {
            el.value = localStorage.getItem('contact_' + id);
        }
    });
    // Save on input
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('input', function() {
                localStorage.setItem('contact_' + id, el.value);
            });
        }
    });
    // Clear storage on submit
    form.addEventListener('submit', function() {
        fields.forEach(id => localStorage.removeItem('contact_' + id));
    });
});
