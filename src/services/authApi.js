import axios from 'axios';

export default() => axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCRF6nbz1Qks4x53milejhBI2qUUrYl6IM',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});