import axios from "axios";
import Constants from "expo-constants";

const uri = Constants.expoConfig?.hostUri ? `http://${Constants.expoConfig?.hostUri?.split(':').shift()}:3000` :  "";
//const uri = 'http://localhost:3000'

const api = axios.create({
    baseURL: uri,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default api;