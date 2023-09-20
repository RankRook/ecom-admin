/* eslint-disable no-unused-vars */
import  { React, useState, useEffect } from "react";
import CustomInput from "../components/Custominput";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCategory } from "../features/category/categorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title Brand is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // const newBrand = useSelector((state) => state.brand);
  // const { isSuccess, isError, isLoading, createdCategory } = newBrand;

  // useEffect(() => {
  //   if (isSuccess ) {
  //     toast.success("Brand Added Successfully!");
  //   }
  //   if (isError) {
  //     toast.error("Something Went Wrong");
  //   }
  // }, [isSuccess, isError, isLoading, createdCategory]);

  
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      toast.success("Category Added Successfully!")
      dispatch(createCategory(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/category-list");
      }, 1000);
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      <div className="mt-4">
      <form action="" onSubmit={formik.handleSubmit}>
        <CustomInput
            type="text"
            id="title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
