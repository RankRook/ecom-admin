import axios from "axios"
import { base_url } from "../../utils/base_url"
import { config } from "../auth/authService"

const getCoupons = async(userData) =>{
    const response = await axios.get(`${base_url}coupon/`, userData)
    return response.data
}

const createCoupon = async(data) =>{
    const response = await axios.post(`${base_url}coupon/`, data, config)
    return response.data
}

const couponService ={
    getCoupons,
    createCoupon
}
export default couponService