

export default class APIrequest {
  constructor() {
    this._baseUrl = 'https://www.anapioficeandfire.com/api';
  }
  async request(address, data = {}) {
    const response = await fetch(`${this._baseUrl}${address}`, data);
    if (!response.ok) {
      throw new Error(`Could not fetch ${address}` +
        `, received ${response.status}`);
    }
    return await response.json()
  }

  getBook = async (id) => {
    const book = await this.request(`/books/${id}/`);
    return this._transformBook(book);
  }
  getAllBooks = async () =>  {
    const res = await this.request(`/books/`);
    return res.map(this._transformBook);
  }

  getHouse = async (id) => {
    const house = await this.request(`/houses/${id}/`);
    return this._transformHouse(house);
  }
  getAllHouses = async () => {
    const res = await this.request(`/houses/`);
    return res.map(this._transformHouse);
  }

  getCharacter = async (id) => {
    const character = await this.request(`/characters/${id}`);
    return this._transformCharacter(character);
  }

  getAllCharacters = async() => {
    const res = await this.request(`/characters?page=5&pageSize=10`);
    return res.map(this._transformCharacter);
  }

  _extractId = (item) => {
    const idRegExp = /\/([0-9]*)$/;
    return item.url.match(idRegExp)[1];
  }
  _transformCharacter = (char) => {
    return {
      id: this._extractId(char),
      name: this.isSet(char.name),
      gender: this.isSet(char.gender),
      born: this.isSet(char.born),
      died: this.isSet(char.died),
      culture: this.isSet(char.culture)
    };
  }
  _transformHouse = (house) => {
    return {
      id: this._extractId(house),
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    };
  }
  _transformBook = (book) => {
    return {
      id: this._extractId(book),
      name: book.name,
      author: book.authors[0],
      numberOfPages: book.numberOfPages,
      publisher: book.publisher,
      released: book.released
    };
  }
  isSet = (data) => {
    if (data) {
      return data
    } else {
      return 'no data :('
    }
  }
  
}

