import axios from "axios";

const env = process.env.EXPO_PUBLIC_NODE_ENV;
const development = process.env.EXPO_PUBLIC_DEV_URL
const production = process.env.EXPO_PUBLIC_PROD_URL

export default axios.create({
    baseURL: env === "development" ? development : production,
})