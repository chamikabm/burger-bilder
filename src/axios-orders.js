import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-73dcb.firebaseio.com/'
});

export default instance;