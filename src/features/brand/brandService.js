import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getBrands = async(userData) =>{
    const response = await axios.get(`${base_url}brand/`, userData)
    return response.data
}

const createBrand = async(data) =>{
    const response = await axios.post(`${base_url}brand/`, data, config)
    return response.data
}

const brandService ={
    getBrands,
    createBrand
}
export default brandService