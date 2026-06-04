(function() {
  const button = document.querySelector('.menu-toggle');
  const nav = document.getElementById('site-nav');
  if (button && nav) {
    button.addEventListener('click', function() {
      const open = document.body.classList.toggle('menu-open');
      button.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        document.body.classList.remove('menu-open');
        button.setAttribute('aria-expanded', 'false');
      });
    });
  }

  const form = document.querySelector('[data-mailto-form]');
  if (!form) return;
  form.addEventListener('submit', function(ev) {
    ev.preventDefault();
    const data = new FormData(form);
    const subject = data.get('subject') || "Website inquiry from Sirens' Sweets";
    const body = [
      'Name: ' + (data.get('name') || ''),
      'Email: ' + (data.get('email') || ''),
      '',
      data.get('message') || ''
    ].join('\n');
    window.location.href = 'mailto:erin@sirenssweets.com?subject='
      + encodeURIComponent(subject)
      + '&body='
      + encodeURIComponent(body);
  });
})();
