(() => {
  'use strict';

  const form = document.querySelector('#review-form');
  const comment = document.querySelector('#review-comment');
  const summary = document.querySelector('#reviews-summary');
  const published = document.querySelector('#review-published');
  const feedback = document.querySelector('#review-feedback');
  const submit = document.querySelector('#review-submit');
  const drafts = new Map();
  const catalog = [...document.querySelectorAll('.hero[data-film-source]')].map(slide => ({
    id:slide.dataset.filmSource,
    title:slide.querySelector('h1,h2').textContent,
    poster:slide.querySelector('.film-poster').getAttribute('src')
  }));
  const myList = document.querySelector('#my-reviews-list');
  const myFeedback = document.querySelector('#my-reviews-feedback');
  const editor = document.querySelector('#review-editor');
  const managedForm = document.querySelector('#managed-review-form');
  const managedComment = document.querySelector('#managed-review-comment');
  const managedFeedback = document.querySelector('#managed-review-feedback');
  managedForm.prepend(form.querySelector('fieldset').cloneNode(true));
  let editingFilm;
  // Rotten Tomatoes critic scores checked on 18 November 2026. Sources are the film URLs below.
  const tomatometers = {
    project_hail_mary:95, supergirl_2026:52, the_devil_wears_prada_2:78,
    wuthering_heights_2026:57, ready_or_not_2_here_i_come:75, toy_story_5:92,
    the_super_mario_galaxy_movie:42, hoppers:94, michael:38, scream_7:29
  };
  const examples = [
    [[5,'Camille','La rencontre au cœur de cette aventure spatiale m’a beaucoup touchée.'],[4,'Malik','Un beau mélange de science et d’humour. Quelques longueurs au milieu.'],[4,'Lou','À découvrir sur grand écran pour les scènes dans l’espace.']],
    [[4,'Nora','Une héroïne qui a du caractère et un univers visuel qui me plaît.'],[3,'Hugo','J’ai aimé le voyage, un peu moins les combats.'],[5,'Inès','Beaucoup d’énergie et une belle place donnée à Kara.']],
    [[4,'Alice','Les échanges entre les personnages sont toujours aussi savoureux.'],[3,'Sam','Les costumes sont magnifiques, l’histoire m’a moins surpris.'],[4,'Léa','Une séance légère et de bonnes retrouvailles.']],
    [[5,'Jules','Les paysages et la musique donnent une vraie force au récit.'],[3,'Sarah','Une ambiance très travaillée, mais je suis restée à distance des personnages.'],[4,'Noé','Intense et visuellement marquant.']],
    [[4,'Emma','Un bon équilibre entre tension et humour noir.'],[4,'Tom','Ça bouge beaucoup, la salle a bien réagi.'],[3,'Aya','Des surprises réussies, même si je préférais le premier.']],
    [[5,'Zoé','Un joli regard sur la place des jouets dans la vie des enfants.'],[4,'Adam','Drôle et tendre, avec de beaux moments de groupe.'],[4,'Rose','Les personnages gardent leur charme. Une séance en famille réussie.']],
    [[4,'Max','Les mondes traversés donnent envie de regarder partout.'],[5,'Mia','Coloré et rythmé, j’ai adoré les passages dans l’espace.'],[3,'Paul','Très amusant, mais le récit va parfois trop vite.']],
    [[5,'Jade','Les animaux sont attachants et les gags fonctionnent vraiment bien.'],[4,'Yanis','Une idée originale et une belle énergie.'],[4,'Clara','Un film qui a fait rire toute la famille.']],
    [[4,'Louis','Les passages musicaux sont ceux que j’ai préférés.'],[3,'Sofia','J’aurais aimé que certains moments soient davantage approfondis.'],[5,'Eli','Une vraie envie de réécouter les chansons en sortant.']],
    [[3,'Chloé','Quelques scènes tendues, mais des ressorts devenus familiers.'],[4,'Alex','Le retour de Sidney donne du poids à cette nouvelle histoire.'],[4,'Lina','Une bonne séance entre amis, avec quelques surprises.']]
  ];
  const examplesByFilm = new Map([...document.querySelectorAll('.hero[data-film-source]')]
    .map((slide,index) => [slide.dataset.filmSource, examples[index] || []]));
  let film;
  let review;

  function storageKey(id = film) {
    return 'cine-lumiere.review.' + id;
  }

  function readReview(id = film) {
    try {
      const value = JSON.parse(localStorage.getItem(storageKey(id)));
      if (value && Number.isInteger(value.rating) && value.rating >= 1 && value.rating <= 5 &&
          typeof value.text === 'string' && value.text.length <= 1500 &&
          typeof value.date === 'string' && Number.isFinite(Date.parse(value.date))) return value;
    } catch {}
    return undefined;
  }

  function score(id) {
    const values = (examplesByFilm.get(id) || []).map(entry => entry[0]);
    const own = readReview(id);
    if (own) values.push(own.rating);
    if (!values.length) return 'Aucune note';
    const average = new Intl.NumberFormat('fr-FR', {maximumFractionDigits:1,minimumFractionDigits:1})
      .format(values.reduce((sum,value) => sum + value, 0) / values.length);
    return average + '/5 · ' + values.length + ' avis';
  }

  function refreshRatings() {
    for (const slide of document.querySelectorAll('.hero[data-film-source]')) {
      if (slide.querySelector('.film-rating')) continue;
      const rating = document.createElement('p');
      rating.className = 'film-rating';
      rating.dataset.reviewFilm = slide.dataset.filmSource;
      slide.querySelector('h1,h2').after(rating);
    }
    for (const element of document.querySelectorAll('[data-review-film]')) {
      const id = element.dataset.reviewFilm;
      const local = document.createElement('span');
      local.textContent = '★ ' + score(id);
      local.title = 'Notes de démonstration et votre avis local';
      const tomato = document.createElement(element.id === 'detail-rating' ? 'a' : 'span');
      tomato.className = 'tomatometer';
      const value = tomatometers[id.split('/').pop()];
      tomato.textContent = '🍅 ' + (value === undefined ? '—' : value + '%') + ' Tomatometer';
      tomato.title = 'Critiques Rotten Tomatoes · relevé du 18 novembre 2026';
      if (element.id === 'detail-rating') {
        tomato.href = id;
        tomato.target = '_blank';
        tomato.rel = 'noopener noreferrer';
      }
      element.replaceChildren(local,tomato);
    }
  }

  function renderExamples() {
    const list = document.querySelector('#review-examples');
    list.replaceChildren();
    const heading = document.createElement('p');
    heading.className = 'muted reviews-local';
    heading.textContent = 'Avis fictifs de démonstration';
    list.append(heading);
    for (const [rating,name,text] of examplesByFilm.get(film) || []) {
      const article = document.createElement('article');
      article.className = 'review-example';
      const author = document.createElement('strong');
      author.textContent = name;
      const note = document.createElement('span');
      note.textContent = '★ ' + rating + '/5';
      const header = document.createElement('div');
      header.className = 'review-published-heading';
      header.append(author,note);
      const body = document.createElement('p');
      body.textContent = text;
      article.append(header,body);
      list.append(article);
    }
  }

  function populate(value) {
    form.reset();
    if (value?.rating) form.elements.rating.value = String(value.rating);
    comment.value = value?.text || '';
  }

  function render() {
    summary.textContent = score(film);
    refreshRatings();
    renderMine();
    published.hidden = !review;
    form.hidden = Boolean(review);
    submit.textContent = review ? 'Enregistrer les modifications' : 'Publier mon avis';
    if (!review) return;
    const date = document.querySelector('#review-date');
    date.dateTime = review.date;
    date.textContent = new Intl.DateTimeFormat('fr-FR', {dateStyle:'medium'}).format(new Date(review.date));
    document.querySelector('#review-score').textContent = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating) + ' · ' + review.rating + '/5';
    document.querySelector('#review-text').textContent = review.text;
    document.querySelector('#review-text').hidden = !review.text;
  }

  function refreshManagedReview(id) {
    drafts.delete(id);
    if (film === id) {
      review = readReview();
      populate(review);
      render();
    } else {
      refreshRatings();
      renderMine();
    }
  }

  function renderMine() {
    const entries = catalog.map(item => ({...item,review:readReview(item.id)}))
      .filter(item => item.review)
      .sort((a,b) => Date.parse(b.review.date) - Date.parse(a.review.date));
    myList.replaceChildren();
    document.querySelector('#my-reviews-empty').hidden = entries.length > 0;
    for (const item of entries) {
      const card = document.createElement('article');
      card.className = 'managed-review';
      card.dataset.film = item.id;
      const heading = document.createElement('div');
      heading.className = 'managed-review-heading';
      const poster = document.createElement('img');
      poster.src = item.poster;
      poster.alt = '';
      const info = document.createElement('div');
      const title = document.createElement('h3');
      title.textContent = item.title;
      const date = document.createElement('time');
      date.dateTime = item.review.date;
      date.textContent = new Intl.DateTimeFormat('fr-FR', {dateStyle:'medium'}).format(new Date(item.review.date));
      info.append(title,date);
      heading.append(poster,info);
      const score = document.createElement('p');
      score.textContent = '★'.repeat(item.review.rating) + '☆'.repeat(5-item.review.rating) + ' · ' + item.review.rating + '/5';
      const text = document.createElement('p');
      text.className = 'managed-review-text';
      text.textContent = item.review.text;
      text.hidden = !item.review.text;
      const actions = document.createElement('div');
      actions.className = 'review-actions';
      const edit = document.createElement('button');
      edit.type = 'button';
      edit.textContent = 'Modifier';
      edit.setAttribute('aria-label','Modifier l’avis sur ' + item.title);
      edit.addEventListener('click', () => {
        const value = readReview(item.id);
        if (!value) {
          renderMine();
          return;
        }
        editingFilm = item.id;
        managedForm.elements.rating.value = String(value.rating);
        managedComment.value = value.text;
        managedFeedback.textContent = '';
        document.querySelector('#review-editor-film').textContent = item.title;
        editor.showModal();
      });
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = 'Supprimer';
      remove.setAttribute('aria-label','Supprimer l’avis sur ' + item.title);
      remove.addEventListener('click', () => {
        try {
          localStorage.removeItem(storageKey(item.id));
        } catch {
          myFeedback.textContent = 'La suppression a échoué. Réessayez.';
          return;
        }
        refreshManagedReview(item.id);
        myFeedback.textContent = 'Votre avis sur ' + item.title + ' a été supprimé.';
        document.querySelector('#my-reviews-title').focus({preventScroll:true});
      });
      actions.append(edit,remove);
      card.append(heading,score,text,actions);
      myList.append(card);
    }
  }

  managedForm.addEventListener('submit', event => {
    event.preventDefault();
    const rating = Number(managedForm.elements.rating.value);
    if (!editingFilm || !Number.isInteger(rating) || rating < 1 || rating > 5) return;
    const value = {rating,text:managedComment.value.trim(),date:new Date().toISOString()};
    try {
      localStorage.setItem(storageKey(editingFilm), JSON.stringify(value));
    } catch {
      managedFeedback.textContent = 'L’enregistrement a échoué. Votre saisie est conservée, réessayez.';
      return;
    }
    editor.close();
    refreshManagedReview(editingFilm);
    myFeedback.textContent = 'Votre avis a été mis à jour.';
    [...myList.children].find(card => card.dataset.film === editingFilm)?.querySelector('button').focus({preventScroll:true});
  });
  document.querySelector('#managed-review-cancel').addEventListener('click', () => editor.close());

  function show(id) {
    if (film && !form.hidden) drafts.set(film, {rating:Number(form.elements.rating.value), text:comment.value});
    film = id;
    document.querySelector('#detail-rating').dataset.reviewFilm = film;
    review = readReview();
    feedback.textContent = '';
    populate(drafts.get(film) || review);
    render();
    renderExamples();
    if (drafts.has(film)) form.hidden = false;
  }

  form.addEventListener('submit', event => {
    event.preventDefault();
    const rating = Number(form.elements.rating.value);
    if (!film || !Number.isInteger(rating) || rating < 1 || rating > 5) return;
    const updated = {rating, text:comment.value.trim(), date:new Date().toISOString()};
    try {
      localStorage.setItem(storageKey(), JSON.stringify(updated));
    } catch {
      feedback.textContent = 'L’enregistrement a échoué. Votre saisie est conservée, réessayez.';
      return;
    }
    const editing = Boolean(review);
    review = updated;
    drafts.delete(film);
    render();
    document.querySelector('#review-edit').focus({preventScroll:true});
    feedback.textContent = editing ? 'Votre avis a été mis à jour.' : 'Votre avis a été publié.';
  });

  document.querySelector('#review-edit').addEventListener('click', () => {
    populate(review);
    form.hidden = false;
    feedback.textContent = '';
    form.querySelector('input:checked').focus({preventScroll:true});
  });

  document.querySelector('#review-delete').addEventListener('click', () => {
    try {
      localStorage.removeItem(storageKey());
    } catch {
      feedback.textContent = 'La suppression a échoué. Réessayez.';
      return;
    }
    review = undefined;
    drafts.delete(film);
    populate();
    render();
    form.querySelector('input').focus({preventScroll:true});
    feedback.textContent = 'Votre avis a été supprimé.';
  });

  window.addEventListener('storage', event => {
    refreshRatings();
    renderMine();
    if (!film || (event.key !== null && event.key !== storageKey())) return;
    review = readReview();
    const editing = !form.hidden;
    render();
    if (editing) form.hidden = false;
  });

  window.CinemaReviews = {show,refreshRatings,showMine() {
    myFeedback.textContent = '';
    renderMine();
  }};
})();
