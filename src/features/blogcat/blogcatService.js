import axios from "axios"
import { base_url } from "../../utils/base_url"

const getBlogcats = async(userData) =>{
    const response = await axios.get(`${base_url}blogcategory/`, userData)
    return response.data
}

const blogcatService ={
    getBlogcats,
}
export default blogcatService