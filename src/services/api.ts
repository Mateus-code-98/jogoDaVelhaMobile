import axios from 'axios';

const api = axios.create({
    baseURL:'https://apijogodavelhaa.herokuapp.com',
})

// api.interceptors.request.use( async (config:any) => {
//     // const token = await localStorage.getItem('@SystemMaster:token')
//     // config.headers.authorization = `Bearer ${token}`;
//     // return config
// });

export default api;