import cards from './templates/cards.hbs';
import './css/styles.css';
// == js files ==
import NewApiService from './js/apiService.js';
import refs from './js/refs.js';
// ==== pnotify =====
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
//  ==== intersectionObserver ====
// import './js/intersectionObserver.js';

const newsApiService = new NewApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();

  clearArticlesContainer();
  newsApiService.query = e.currentTarget.elements.query.value;

  if (newsApiService.query === '') {
    return error({
      title: 'Oh No!',
      text: 'Something terrible happened.',
    });
  }

  newsApiService.fetchPictures().then(hits => {
    if (hits.length < 1) {
      return error({
        text: 'Пожалуйста, введите что-то корректное',
      });
    }
  });

  newsApiService.fetchPictures().then(appendArticlesMarkup);
  newsApiService.resetPage();
  registerIntersectionObserver();
}

function appendArticlesMarkup(hits) {
  refs.galerryList.insertAdjacentHTML('beforeend', cards(hits));
}

function clearArticlesContainer() {
  refs.galerryList.innerHTML = '';
}

function registerIntersectionObserver() {
  const onEntry = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && newsApiService.query !== '') {
        newsApiService.fetchPictures().then(appendArticlesMarkup);
        newsApiService.resetPage();
      }
    });
  };

  const options = {
    rootMargin: '150px',
  };
  const observer = new IntersectionObserver(onEntry, options);
  observer.observe(refs.sentinel);
}
