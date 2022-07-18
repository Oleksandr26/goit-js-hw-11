import Notiflix from 'notiflix';
// import PixabayAPI from './fetch';

const formRef = document.querySelector('.search-form');
const galleryRef = document.querySelector('.gallery');
class PixabayAPI {
  #BASE_URL = 'https://api.unsplash.com/search/photos';
  #API_KEY = '28697778-547ab5ce287b3a320fe50e9de';
  #page;
  #perPage;

  constructor() {
    this.#page = 1;
    this.#perPage = 40;
    this.search = '';
  }

  async getImg() {
    const data = await axios.get(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.search
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.#page
      }&per_page=${this.#perPage}`
    );
    console.log(data);
    return data;
  }
}

formRef.addEventListener('submit', submitForm());

async function submitForm(e) {
  PixabayAPI.search = e.target.elements.search.value.trim();
  PixabayAPI.page = 1;
}
