(function() {
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
    ].join('
');
    window.location.href = 'mailto:erin@sirenssweets.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
})();
