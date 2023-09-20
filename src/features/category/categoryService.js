import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getCategorys = async(userData) =>{
    const response = await axios.get(`${base_url}category/`, userData)
    return response.data
}

const createCategory = async(data) =>{
    const response = await axios.post(`${base_url}category/`, data, config)
    return response.data
}

const categoryService ={
    getCategorys,
    createCategory
}
export default categoryService