import axios from 'axios';

export default() => axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+VUE_APP_FIREBASE_KEY,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});