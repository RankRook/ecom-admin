import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getBlogs = async(userData) =>{
    const response = await axios.get(`${base_url}blog/`, userData)
    return response.data
}

const createBlog = async(data) =>{
    const response = await axios.post(`${base_url}blog/`, data, config)
    return response.data
}

const blogService ={
    getBlogs,
    createBlog
}
export default blogService