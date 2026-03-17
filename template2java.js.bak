document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".fade-in-image");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 50% of the image is in view
    }
  );

  images.forEach((image) => {
    observer.observe(image);
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const spans = document.querySelectorAll('.animate-on-scroll span');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  spans.forEach(span => observer.observe(span));
  });

