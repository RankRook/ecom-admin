import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import blogcatReducer from "../features/blogcat/blogcatSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import blogReducer from "../features/blog/blogSlice";
import enquiryReducer from "../features/enquiry/enquirySlice";
import uploadReducer from "../features/upload/uploadSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    blogcat: blogcatReducer,
    brand: brandReducer,
    category: categoryReducer,
    enquiry: enquiryReducer,
    blog: blogReducer,
    upload: uploadReducer,
  },
});
