import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from '../config/environments';

const api = axios.create({
    baseURL: api_url,
})

api.interceptors.request.use(async (config: any) => {
    const token = await AsyncStorage.getItem('@JDV:token')
    config.headers.authorization = `Bearer ${token}`;
    return config
});

export default api;