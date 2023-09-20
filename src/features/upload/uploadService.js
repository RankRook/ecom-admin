import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/base_url";

const uploadImg = async (data) => {
  const respone = await axios.post(`${base_url}upload/`, data, config);
  return respone.data;
};

const deleteImg = async (id) => {
  const respone = await axios.delete(
    `${base_url}upload/delete-img/${id}`,
    config
  );
  return respone.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
};

export default uploadService;
