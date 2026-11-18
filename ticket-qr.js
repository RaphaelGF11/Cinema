(() => {
  'use strict';

  const image = document.querySelector('#ticket-qr');
  const reference = document.querySelector('#ticket-reference');
  const status = document.querySelector('#ticket-code-status');

  function issue() {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    const hex = [...bytes].map(value => value.toString(16).padStart(2, '0')).join('').toUpperCase();
    const id = 'CL-' + hex.match(/.{8}/g).join('-');
    reference.textContent = id;
    try {
      const code = qrcode(0, 'M');
      code.addData('CINE-LUMIERE:' + id, 'Alphanumeric');
      code.make();
      image.src = code.createDataURL(8, 32);
      image.alt = 'QR code du billet ' + id;
      image.hidden = false;
      status.textContent = 'Référence du billet';
    } catch {
      image.removeAttribute('src');
      image.hidden = true;
      status.textContent = 'QR code indisponible. Conservez la référence du billet.';
    }
  }

  function revoke() {
    image.hidden = true;
    image.removeAttribute('src');
    status.textContent = 'Billet annulé · QR code indisponible';
  }

  window.CinemaTicketCode = {issue, revoke};
})();
