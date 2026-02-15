/* ── Tab switching with URL hash deep-link ── */
function activateTab(tabId) {
  var btn = document.querySelector('.tabs__btn[data-tab="' + tabId + '"]');
  if (!btn) return false;

  var tabBar = btn.closest('.tabs');
  var container = tabBar.parentElement;

  tabBar.querySelectorAll('.tabs__btn').forEach(function(b) {
    b.classList.remove('tabs__btn--active');
  });
  container.querySelectorAll('.tab-panel').forEach(function(p) {
    p.classList.remove('tab-panel--active');
  });

  btn.classList.add('tabs__btn--active');
  var panel = container.querySelector('#' + tabId);
  if (panel) panel.classList.add('tab-panel--active');
  return true;
}

// Click handler — update hash
document.querySelectorAll('.tabs').forEach(function(tabBar) {
  tabBar.addEventListener('click', function(e) {
    var btn = e.target.closest('.tabs__btn');
    if (!btn) return;

    var tabId = btn.getAttribute('data-tab');
    activateTab(tabId);
    history.replaceState(null, '', '#' + tabId);
  });
});

// On load — activate tab from URL hash
(function() {
  var hash = window.location.hash.replace('#', '');
  if (hash) activateTab(hash);
})();

/* ── Count-up animation for Key Numbers ── */
(function() {
  var counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  var animated = new Set();

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1200;
    var start = null;

    function step(timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      // ease-out
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting && !animated.has(entry.target)) {
          animated.add(entry.target);
          animateCounter(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function(el) {
      observer.observe(el);
    });
  } else {
    // Fallback: animate immediately
    counters.forEach(function(el) {
      animateCounter(el);
    });
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
