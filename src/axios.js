import axios from "axios";

const instance = axios.create({
    baseURL:'http://localhost:5001/clone-d5abf/us-central1/api' // The Api (cloud Function using NodeJs)
})

export default instance