import axios from 'axios';
// const searchParams = new URLSearchParams({
//   per_page: 40,
//   page: 1,
//   client_id: '28697778-547ab5ce287b3a320fe50e9de',
//   //   color: 'black',
//   //   orientation: 'portrait',
// });

export class PixabayAPI {
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
  get page() {
    return this.#page;
  }
}
