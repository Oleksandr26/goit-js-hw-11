import axios from 'axios';

// axios.defaults.baseURL = 'https://api.unsplash.com/search/photos';
// axios.defaults.headers.Authorization = '28697778-547ab5ce287b3a320fe50e9de';
export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '28697778-547ab5ce287b3a320fe50e9de';
  #page;
  #perPage;

  constructor() {
    this.#page = 1;
    this.#perPage = 40;
    this.searchQuery = '';
    this.hits = '';
  }

  async getImg() {
    const data = await axios.get(
      `${this.#BASE_URL}?key=${this.#API_KEY}&q=${
        this.searchQuery
      }&image_type=photo&orientation=horizontal&safesearch=true&page=${
        this.#page
      }&per_page=${this.#perPage}`
    );
    console.log(data);
    return data;
  }
  get page() {
    return this.#page;
  }
  incrementPage() {
    this.#page += 1;
  }
  resetPage() {
    this.#page = 1;
  }
  totalPages(totalHits) {
    this.totalPage = totalHits / this.#perPage;
  }
}
