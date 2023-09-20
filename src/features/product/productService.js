import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getProducts = async() =>{
    const response = await axios.get(`${base_url}product/`)
    return response.data
}

const createProduct = async(dataProduct) =>{
    const response = await axios.post(`${base_url}product/`, dataProduct, config)
    return response.data
}

const productService ={
    getProducts,
    createProduct,
}
export default productService