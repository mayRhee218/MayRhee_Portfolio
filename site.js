/* Keep navigation terminology consistent across desktop, mobile menu, and bottom bar. */
document.querySelectorAll('nav a[href="index.html"], nav a[href="contact.html"]').forEach(link => {
  if (link.textContent.trim() === 'Home') link.textContent = 'Bio';
  if (link.textContent.trim() === 'Contact') link.textContent = 'Guestbook';
});

/* Small progressive enhancements. HTML links remain functional without JavaScript. */
'use strict';
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const organisation = String(data.get('organisation') || '').trim();
    const message = String(data.get('message') || '').trim();
    const subject = `Portfolio enquiry from ${name}`;
    const body = `From: ${name}\nEmail: ${email}\nOrganisation: ${organisation || '—'}\n\n${message}`;
    const url = `mailto:mayrhee218@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const status = document.querySelector('#contact-status');
    if (status) status.textContent = 'Your email app should open with a draft. Please send it there to complete your message.';
    window.location.href = url;
  });
}

/* Accessible image viewer for original README figures.
 * Buttons and dialog are created only when JavaScript is running.
 * Escape closes the native dialog automatically.
 */
const zoomableImages = document.querySelectorAll('.case-hero img, .feature-gallery img');
if (zoomableImages.length && typeof HTMLDialogElement !== 'undefined') {
  const dialog = document.createElement('dialog');
  dialog.className = 'image-dialog';
  dialog.setAttribute('aria-label', 'Project image preview');
  const close = document.createElement('button');
  close.className = 'image-dialog-close';
  close.type = 'button';
  close.textContent = 'Close ×';
  const figure = document.createElement('figure');
  const preview = document.createElement('img');
  preview.alt = '';
  const caption = document.createElement('figcaption');
  figure.append(preview, caption);
  dialog.append(close, figure);
  document.body.append(dialog);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  for (const image of zoomableImages) {
    // Linked gallery artwork already opens the original full-size image.
    // Do not nest a button inside an anchor (invalid interactive HTML).
    if (image.closest('a')) continue;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'image-open';
    const text = image.closest('figure')?.querySelector('figcaption')?.textContent?.trim() || image.alt || 'Project image';
    button.setAttribute('aria-label', `Enlarge image: ${text}`);
    image.parentNode.insertBefore(button, image);
    button.appendChild(image);
    button.addEventListener('click', () => {
      preview.src = image.currentSrc || image.src;
      preview.alt = image.alt;
      caption.textContent = text;
      dialog.showModal();
    });
  }
}

/* Original Wix artwork is shown online; use a clearly labeled local
   placeholder if its remote source is unavailable. No page HTML is generated. */
document.querySelectorAll('img[data-fallback]').forEach(image => {
  const useFallback = () => {
    if (image.dataset.fallback && image.src !== new URL(image.dataset.fallback, location.href).href) {
      image.src = image.dataset.fallback;
      image.removeAttribute('srcset');
    }
  };
  image.addEventListener('error', useFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) useFallback();
});
