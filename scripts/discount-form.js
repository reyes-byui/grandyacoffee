// Handles showing the discount form and validation

document.addEventListener('DOMContentLoaded', function() {
    // Slide in the discount box after a short delay, then slide it partially out
    setTimeout(function() {
        var slide = document.getElementById('discount-slide');
        if (slide) {
            slide.classList.add('slide-in');
            setTimeout(function() {
                slide.classList.remove('slide-in');
                slide.classList.add('partial-out');
            }, 3500); // Show fully for 3.5s, then partial
        }
    }, 400);

    // Clicking the discount-slide toggles it in/out
    var slide = document.getElementById('discount-slide');
    if (slide) {
        slide.addEventListener('click', function(e) {
            // Prevent modal open on button click
            if (e.target.id === 'disccount-btn') return;
            if (slide.classList.contains('partial-out')) {
                slide.classList.remove('partial-out');
                slide.classList.add('slide-in');
            } else {
                slide.classList.remove('slide-in');
                slide.classList.add('partial-out');
            }
        });
    }

    const btn = document.getElementById('disccount-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
        if (document.getElementById('discount-form-modal')) return;
        showDiscountForm();
    });
});

function showDiscountForm() {
    const modal = document.createElement('div');
    modal.id = 'discount-form-modal';
    modal.innerHTML = `
      <div class="discount-modal-overlay"></div>
      <div class="discount-modal-content">
        <button class="discount-modal-close" aria-label="Close">&times;</button>
        <h3>How to Get Your Discount</h3>
        <ol style="margin-bottom:1.2em;">
          <li>
            Follow us on <a href="https://www.instagram.com/grandyacoffee/" target="_blank" rel="noopener" aria-label="Instagram"><img src="icons/instagram.svg" alt="Instagram" class="social-icon"></a> or <a href="https://web.facebook.com/profile.php?id=61564243991797" target="_blank" rel="noopener" aria-label="Facebook"><img src="icons/facebook.svg" alt="Facebook" class="social-icon"></a>
          </li>
          <li style="margin-top:0.8em;">
            Message us on <a href="https://t.me/+85510759985" target="_blank" rel="noopener" aria-label="Telegram"><img src="icons/telegram.svg" alt="Telegram" class="social-icon"></a><br>
            <span style="font-size:0.98em;">Say: <b>Hello, I'm &lt;Your Name&gt;</b></span>
          </li>
          <li style="margin-top:0.8em;">
            Or, Sign Up the Form Below
          </li>
        </ol>
        <a href="https://docs.google.com/forms/d/e/1FAIpQLSf0spaeIY3qDV0ktow0Sa_40LNFK6MAFuuW7EaND92pReuDBQ/viewform?usp=header" target="_blank" rel="noopener" class="discount-submit-btn" style="display:block;text-align:center;">Sign Up to Get Discount!</a>
      </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    modal.querySelector('.discount-modal-close').onclick = closeDiscountModal;
    modal.querySelector('.discount-modal-overlay').onclick = closeDiscountModal;
}

function closeDiscountModal() {
    const modal = document.getElementById('discount-form-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}
