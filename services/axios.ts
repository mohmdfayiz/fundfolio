import axios from "axios";

// const development = "http://192.168.1.19:3000";
const production = "https://fundfolio-server-oap7.onrender.com";

export default axios.create({
    baseURL: production,
})