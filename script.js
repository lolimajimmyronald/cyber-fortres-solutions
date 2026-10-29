const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.querySelectorAll('[data-package]').forEach(link => {
  link.addEventListener('click', () => {
    const service = document.getElementById('service');
    const packageName = link.dataset.package;
    for (const option of service.options) {
      if (option.text === packageName) service.value = packageName;
    }
  });
});

document.getElementById('contactForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    'CYBER FORTRESS SOLUTIONS — SERVICE ENQUIRY',
    `Name: ${form.get('name')}`,
    `Email: ${form.get('email')}`,
    `Organisation: ${form.get('organisation') || 'Not provided'}`,
    `Service: ${form.get('service')}`,
    `Message: ${form.get('message')}`
  ].join('\n');
  const note = document.getElementById('formNote');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(message).then(() => {
      note.textContent = 'Enquiry copied. You can paste it into an email. This demo has not sent it to CFS.';
    }).catch(() => showMessage(message, note));
  } else {
    showMessage(message, note);
  }
});
function showMessage(message, note) {
  const output = document.createElement('textarea');
  output.value = message;
  output.rows = 7;
  output.readOnly = true;
  output.setAttribute('aria-label', 'Prepared enquiry message');
  note.replaceWith(output);
  output.focus();
  output.select();
}
