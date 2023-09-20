import axios from "axios"
import { base_url } from "../../utils/base_url"

const getBlogs = async(userData) =>{
    const response = await axios.get(`${base_url}blog/`, userData)
    return response.data
}

const blogService ={
    getBlogs,
}
export default blogService