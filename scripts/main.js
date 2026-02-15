/* ── Floating nav: scroll-based active state + smooth scroll ── */
(function() {
  var nav = document.querySelector('.floating-nav');
  if (!nav) return;

  var items = nav.querySelectorAll('.floating-nav__item');
  var sections = [];

  items.forEach(function(item) {
    var id = item.getAttribute('href').replace('#', '');
    var section = document.getElementById(id);
    if (section) sections.push({ id: id, el: section, link: item });
  });

  // Smooth scroll on click
  items.forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      var id = item.getAttribute('href').replace('#', '');
      var target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', '#' + id);
      }
    });
  });

  // Update active on scroll
  function updateActive() {
    var scrollY = window.scrollY + window.innerHeight / 3;

    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.offsetTop <= scrollY) {
        current = sections[i];
      }
    }

    items.forEach(function(item) {
      item.classList.remove('floating-nav__item--active');
    });
    if (current) current.link.classList.add('floating-nav__item--active');
  }

  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();

  // On load — scroll to hash
  var hash = window.location.hash.replace('#', '');
  if (hash) {
    var target = document.getElementById(hash);
    if (target) {
      setTimeout(function() {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
})();

/* ── Metric bar scroll animation ── */
(function() {
  var bars = document.querySelectorAll('.metric__fill');
  if (!bars.length) return;

  // Store intended widths and reset to 0
  bars.forEach(function(bar) {
    bar.setAttribute('data-width', bar.style.width);
    bar.style.width = '0%';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          var width = target.getAttribute('data-width');
          // Small delay for visual effect
          setTimeout(function() {
            target.style.width = width;
          }, 100);
          observer.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(function(bar) {
      observer.observe(bar);
    });
  } else {
    // Fallback: show immediately
    bars.forEach(function(bar) {
      bar.style.width = bar.getAttribute('data-width');
    });
  }
})();
