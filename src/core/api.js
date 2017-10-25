import axios from 'axios';

class Api {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'http://rizort.devslice.com/data/',
    });
  }

  fetchHotels = () => this.axiosInstance.get('hotels.json');
}

export default Api;
