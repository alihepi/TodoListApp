import axios from 'axios';

const httpCommon = axios.create({
  baseURL: 'http://localhost:3000/api', // Backend server adresi
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpCommon;
