import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getBlogcats = async(userData) =>{
    const response = await axios.get(`${base_url}blogcategory/`, userData)
    return response.data
}

const createBlogcat = async(data) =>{
    const response = await axios.post(`${base_url}blogcategory/`, data, config)
    return response.data
}

const deleteBlogcat = async(id) =>{
    const response = await axios.delete(`${base_url}blogcategory/${id}`, config)
    return response.data
}

const blogcatService ={
    getBlogcats,
    createBlogcat,
    deleteBlogcat
}
export default blogcatService