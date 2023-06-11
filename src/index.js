import { NewsApi } from './js/fetch.js';
import { renderMarkup } from './js/markup.js';
import { refs } from './js/refs.js';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let pageHits = 0;
const NewApi = new NewsApi();

refs.form.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();

  clearContainer();
  NewApi.query = event.currentTarget.elements.searchQuery.value.trim();
  NewApi.resetPage();

  if (NewApi.query === '') {
    Notify.failure('Please enter your search data.');
    loadBtnAddHidden();
    return;
  }

  try {
    const { hits, totalHits } = await NewApi.fetchPhotos();
    pageHits = hits.length;
    renderMarkup(hits);
    loadBtnRemoveHidden();
    notImages(hits);
    notifyTotalHits(totalHits);
    notResult(totalHits);
  } catch (error) {
    console.log(error);
  }

  refs.form.reset();
}

async function onLoadMore() {
  try {
    const { hits, totalHits } = await NewApi.fetchPhotos();
    renderMarkup(hits);
    pageHits += hits.length;
    endImagesHits(pageHits, totalHits);
  } catch (error) {
    console.log(error);
  }
}

function clearContainer() {
  refs.cardsMarkup.innerHTML = '';
}

function loadBtnAddHidden() {
  refs.loadMoreButton.classList.add('visually-hidden');
}

function loadBtnRemoveHidden() {
  refs.loadMoreButton.classList.remove('visually-hidden');
}

function notImages(hits) {
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    loadBtnAddHidden();
    return;
  }
}

function notifyTotalHits(totalHits) {
  if (totalHits > 0) {
    Notify.success(`Hooray! We found ${totalHits} images.`);
    return;
  }
}
function notResult(totalHits) {
  if (totalHits < 40) {
    loadBtnAddHidden();
  }
}

function endImagesHits(pageHits, totalHits) {
  if (pageHits >= totalHits || totalHits < 40) {
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadBtnAddHidden();
    return;
  }
}

// import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import axios from 'axios';
// const API_KEY = '37097897-8d8ad4900aed82d9623684888';
// const BASE_URL = 'https://pixabay.com/api/';

// const refs = {
//   form: document.querySelector('.search-form'),
//   submitButton: document.querySelector('.submit-button'),
//   gallery: document.querySelector('.gallery'),
//   loadMoreButton: document.querySelector('.load-more'),
// };

// let pageToFetch = 1;
// let queryToFetch = '';

// fetchEvents();
// function fetchEvents(keyword) {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${keyword}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// function getEvents(query, page) {
//   fetchEvents(query, page)
//     .then(data => {
//       Notify.success('Hooray! We found 500 images');
//       const hits = data.hits;
//       console.log(hits);
//       renderEvents(hits);
//       refs.loadMoreButton.classList.remove('visually-hidden');
//     })
//     .catch(error => {
//       console.log(error);
//       refs.loadMoreButton.classList.add('visually-hidden');
//       Notify.failure(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//     });
// }
// function renderEvents(hits) {
//   const markup = hits
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => {
//         return `<div class="photo-card"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="550" height="auto"><div class="info"><p class="info-item"><b>${likes}</b></p><p class="info-item"><b>${views}</b></p><p class="info-item"><b>${comments}</b></p><p class="info-item"><b>${downloads}</b></p></div></div>`;
//       }
//     )
//     .join('');
//   refs.gallery.innerHTML = markup;
//   // gallery.refresh();
// }
// refs.loadMoreButton.addEventListener('click', hendleLoadMore);

// function hendleLoadMore() {
//   pageToFetch += 1;
//   getEvents(queryToFetch, pageToFetch);
// }
// refs.form.addEventListener('submit', handleSubmit);
// function handleSubmit(event) {
//   event.preventDefault();
//   const inputValue = event.target.elements.searchQuery.value;
//   if (!inputValue.trim() || inputValue === queryToFetch) {
//     return;
//   }
//   queryToFetch = inputValue;
//   pageToFetch = 1;
//   refs.gallery.innerHTML = '';
//   refs.loadMoreButton.classList.add('visually-hidden');
//   getEvents(queryToFetch, pageToFetch);
// }

// let markup = `<div class="photo-card"><img src="" alt="" loading="lazy"/><div class="info">
// <p class="info-item><b>Likes</b></p><p class="info-item"><b>Views</b></p><p class="info-item"><b>Comments</b></p><p class="info-item"><b>Downloads</b></p></div></</div>`;
