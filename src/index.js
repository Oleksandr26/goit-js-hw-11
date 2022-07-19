import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './fetch';
import { createMarkup } from './markup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { data } from 'infinite-scroll';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

const pixabayAPI = new PixabayAPI();

formRef.addEventListener('submit', submitForm);
loadMoreBtn.addEventListener('click', loadMore);
loadMoreBtn.classList.add('is-hidden');

async function submitForm(event) {
  event.preventDefault();
  pixabayAPI.resetPage();
  pixabayAPI.searchQuery = event.target.elements.searchQuery.value.trim();
  if (!pixabayAPI.searchQuery) {
    Notify.failure('Please enter something');
    return;
  } else if (pixabayAPI.searchQuery) {
    galleryRef.innerHTML = '';
  }
  try {
    const { data } = await pixabayAPI.getImg(pixabayAPI.searchQuery);
    console.log();
    if (data.total >= 1) {
      const markup = createMarkup(data.hits);
      galleryRef.insertAdjacentHTML('beforeend', markup);
      if (data.total > 40) {
        loadMoreBtn.classList.remove('is-hidden');
      }
      const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
      });

      Notify.success(`Hooray! We found ${data.totalHits} images.`);
    } else if (data.total === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    Notify.failure('Something wrong');
    console.error(error);
  }
}

async function loadMore() {
  pixabayAPI.incrementPage();
  const { data } = await pixabayAPI.getImg(pixabayAPI.searchQuery);
  if (data.hits.length < 40) {
    loadMoreBtn.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
  try {
    const { data } = await pixabayAPI.getImg(pixabayAPI.searchQuery);
    const markup = createMarkup(data.hits);
    galleryRef.insertAdjacentHTML('beforeend', markup);
    const lightbox = new SimpleLightbox('.gallery a', {});
    lightbox.refresh;
  } catch (error) {
    Notify.failure('Something wrong');
    console.error(error);
  }
}
