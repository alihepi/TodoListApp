import axios from 'axios';

// Axios'u yapılandırma
export default axios.create({
    baseURL: 'https://todo-list-app-backend-alihappy.vercel.app/api', // API'nin temel URL'si
    headers: {
        'Content-type': 'application/json', // JSON veri türünü belirtir
    },
});
