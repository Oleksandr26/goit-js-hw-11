import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './fetch';
import { createMarkup } from './markup.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
const { height: cardHeight } = document
  .querySelector('.gallery')
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});

const pixabayAPI = new PixabayAPI();

formRef.addEventListener('submit', submitForm);

async function submitForm(event) {
  event.preventDefault();
  pixabayAPI.searchQuery = event.target.elements.searchQuery.value.trim();
  pixabayAPI.page = 1;
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
