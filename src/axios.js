import axios from "axios";

const instance = axios.create({
    baseURL:'....' // The Api (cloud Function using NodeJs)
})

export default instance