import axios from "axios"
import { base_url } from "../../utils/base_url"

const getCategorys = async(userData) =>{
    const response = await axios.get(`${base_url}category/`, userData)
    return response.data
}

const categoryService ={
    getCategorys,
}
export default categoryService