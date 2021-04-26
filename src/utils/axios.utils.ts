import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://nga-book-api.herokuapp.com/api/v1',
  headers: {
    'Content-Type': 'application/json;charset=utf8',
  }
});

export default instance;