(() => {
  'use strict';
  const googleMark = '<svg class="google-mark" viewBox="0 0 48 48" aria-hidden="true"><path fill="#4285f4" d="M43.6 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11a9.4 9.4 0 0 1-4.1 6.2v5.2h6.7c3.9-3.6 6-8.8 6-15.4Z"/><path fill="#34a853" d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.7-5.2c-1.8 1.2-4.1 1.9-6.8 1.9-5.3 0-9.8-3.6-11.4-8.4H5.7v5.4A20.4 20.4 0 0 0 24 44Z"/><path fill="#fbbc05" d="M12.6 27.4a12 12 0 0 1 0-7.8v-5.4H5.7a20 20 0 0 0 0 18.6Z"/><path fill="#ea4335" d="M24 11.2c3 0 5.6 1 7.7 3l5.8-5.8A19.4 19.4 0 0 0 24 3 20.4 20.4 0 0 0 5.7 14.2l6.9 5.4c1.6-4.8 6.1-8.4 11.4-8.4Z"/></svg>';
  document.querySelector('#google-pay').innerHTML = '<span class="wallet-button-lead">Payer avec </span>' + googleMark + '<span class="google-pay-word">Pay</span>';
  const sheet = document.createElement('dialog');
  sheet.id = 'google-pay-sheet';
  sheet.setAttribute('aria-labelledby', 'google-pay-title');
  sheet.setAttribute('aria-describedby', 'google-pay-demo');
  sheet.innerHTML = `
    <div class="google-grabber" aria-hidden="true"></div>
    <div class="google-heading"><h2 id="google-pay-title" aria-label="Google Pay">${googleMark}<span>Pay</span></h2><button type="button" id="google-pay-close" aria-label="Fermer Google Pay">×</button></div>
    <div class="google-content">
      <p id="google-pay-demo">Simulation · Aucun débit réel</p>
      <div class="google-account"><span class="google-avatar" aria-hidden="true">L</span><span><strong id="google-account-name"></strong><small>Compte de démonstration</small></span></div>
      <div class="google-merchant"><span class="google-merchant-icon" aria-hidden="true">CL</span><div><h3>Ciné Lumière</h3><p id="google-purchase"></p><p id="google-session"></p><p id="google-seats"></p></div></div>
      <fieldset class="google-cards"><legend>Moyen de paiement</legend>
        <label><input type="radio" name="google-demo-card" value="4242" checked><span class="google-card-art" aria-hidden="true">MC</span><span><strong>Mastercard •••• 4242</strong><small>Carte de démonstration</small></span></label>
        <label><input type="radio" name="google-demo-card" value="1234"><span class="google-card-art google-visa" aria-hidden="true">VISA</span><span><strong>Visa •••• 1234</strong><small>Carte de démonstration</small></span></label>
      </fieldset>
      <p id="google-pay-feedback" role="status" aria-live="polite">Vérifiez votre séance avant de confirmer.</p>
    </div>
    <footer class="google-footer"><div><span>Total à payer</span><strong id="google-pay-total"></strong></div><button type="button" id="google-pay-confirm"><span class="google-payment-spinner" aria-hidden="true"></span><svg class="google-payment-check" viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4 10-10"/></svg><span id="google-confirm-label">Payer</span></button></footer>`;
  document.body.append(sheet);
  const confirm = sheet.querySelector('#google-pay-confirm');
  const label = sheet.querySelector('#google-confirm-label');
  const feedback = sheet.querySelector('#google-pay-feedback');
  const cards = sheet.querySelector('.google-cards');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let timer, purchase, busy = false;
  const text = (id, value) => sheet.querySelector(id).textContent = value;
  function dismiss(after) {
    if (!sheet.open || sheet.classList.contains('is-closing')) return;
    clearTimeout(timer);
    confirm.disabled = true;
    sheet.classList.add('is-closing');
    timer = setTimeout(() => { sheet.close(); after?.(); }, reduced.matches ? 0 : 240);
  }
  sheet.querySelector('#google-pay-close').addEventListener('click', () => dismiss());
  sheet.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
  sheet.addEventListener('close', () => {
    clearTimeout(timer);
    busy = false;
    purchase = undefined;
    sheet.classList.remove('is-closing');
    sheet.removeAttribute('aria-busy');
  });
  confirm.addEventListener('click', () => {
    if (!sheet.open || busy || !purchase || sheet.classList.contains('is-closing')) return;
    busy = true;
    confirm.disabled = cards.disabled = true;
    sheet.dataset.state = 'processing';
    sheet.setAttribute('aria-busy', 'true');
    label.textContent = 'Traitement…';
    feedback.textContent = 'Autorisation du paiement simulé…';
    timer = setTimeout(() => {
      sheet.removeAttribute('aria-busy');
      if (purchase.declineFirst) {
        purchase.declineFirst = false;
        purchase.onDecline();
        sheet.dataset.state = 'declined';
        feedback.textContent = 'Paiement simulé refusé. Vos sièges sont conservés. Réessayez ou choisissez l’autre carte.';
        label.textContent = 'Réessayer';
        busy = false;
        confirm.disabled = cards.disabled = false;
        return;
      }
      sheet.dataset.state = 'success';
      label.textContent = 'Paiement confirmé';
      feedback.textContent = 'Votre billet est prêt.';
      const success = purchase.onSuccess;
      timer = setTimeout(() => dismiss(success), 800);
    }, 1400);
  });
  window.CinemaGooglePay = {
    open(details) {
      if (sheet.open) return;
      purchase = details;
      busy = false;
      confirm.disabled = cards.disabled = false;
      sheet.dataset.state = 'ready';
      sheet.classList.remove('is-closing');
      text('#google-account-name', details.name);
      sheet.querySelector('.google-avatar').textContent = details.name.charAt(0).toUpperCase();
      text('#google-purchase', details.film);
      text('#google-session', details.session);
      text('#google-seats', 'Sièges : ' + details.seats);
      text('#google-pay-total', details.total);
      label.textContent = 'Payer ' + details.total;
      feedback.textContent = 'Vérifiez votre séance avant de confirmer.';
      sheet.showModal();
    }
  };
})();
