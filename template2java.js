document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".animate-on-scroll, .fade-in-image");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active", "visible");
      } else {
        entry.target.classList.remove("active", "visible");
      }
    });
  }, {
    threshold: 0.3
  });

  elements.forEach(el => observer.observe(el));
});
// Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !expanded);
    navLinks.classList.toggle('open');
  });
  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // ── Animate-on-scroll: fade + rise ──────────────────────────────────────────
const style = document.createElement('style');
style.textContent = `
  .animate-on-scroll {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
                transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .animate-on-scroll.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* Individual letter spans for the heading */
  .letter {
    display: inline-block;
    opacity: 0;
    transform: translateY(50px) rotateX(90deg);
    transform-origin: bottom center;
    transition: opacity 0.5s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .letter.visible {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
`;
document.head.appendChild(style);


// ── Split heading text into animated letters ─────────────────────────────────
const heading = document.querySelector('#section1p .animate-on-scroll');

if (heading) {
  const text = heading.textContent.trim();
  heading.innerHTML = text
    .split('')
    .map((char, i) =>
      char === ' '
        ? `<span class="letter" style="transition-delay:${i * 45}ms">&nbsp;</span>`
        : `<span class="letter" style="transition-delay:${i * 45}ms">${char}</span>`
    )
    .join('');
  heading.classList.remove('animate-on-scroll'); // handled per-letter now
}


const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Trigger letter animation for heading letters
        const letters = el.querySelectorAll('.letter');
        if (letters.length) {
          letters.forEach(l => l.classList.add('visible'));
        } else {
          // Stagger sibling animate-on-scroll elements
          const siblings = document.querySelectorAll('.animate-on-scroll');
          siblings.forEach((sib, i) => {
            setTimeout(() => sib.classList.add('visible'), i * 200);
          });
        }

        observer.unobserve(el);
      }
    });
  },
  { threshold: 0.2 }
);

// Observe the parallax container so everything fires together
const parallax = document.querySelector('.parallax');
if (parallax) observer.observe(parallax);

// Observe .p2 span separately for its own stagger
const p2Span = document.querySelector('.p2 .animate-on-scroll');
if (p2Span) {
  setTimeout(() => p2Span.classList.add('visible'), 600); // slight delay after heading
}

