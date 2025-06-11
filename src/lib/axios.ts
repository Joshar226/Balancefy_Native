import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_VITE_URL
})

api.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('AUTH_TOKEN')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

export default api