import axios from 'axios';

const api = axios.create({
    // baseURL:'https://apijogodavelhaa.herokuapp.com',
    baseURL:'http://192.168.0.103:3333',
})

// api.interceptors.request.use( async (config:any) => {
//     // const token = await localStorage.getItem('@SystemMaster:token')
//     // config.headers.authorization = `Bearer ${token}`;
//     // return config
// });

export default api;