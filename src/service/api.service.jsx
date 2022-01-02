import axios from 'axios';

const api = axios.create({
    method: 'GET',
    header: {
        'Accept': 'application/json',
        'content-type': 'application/json;charset=utf-8',
    }
    
});

export default api;