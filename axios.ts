import axios from 'axios'
import {useGetCookie} from "./hooks/useAuth";
// import {useGetCookie} from "./hooks/useAuth";



const instance = axios.create({
  baseURL: process.env.BASE_URL,

})

instance.interceptors.request.use(config => {
    const token = useGetCookie('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default instance
