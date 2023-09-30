/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { React, useState, useEffect } from "react";
import CustomInput from "../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  getACategory,
  resetState,
  updateCategory,
} from "../../features/category/categorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title Brand is Required"),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getCategoryId = location.pathname.split("/")[3];

  const newCategory = useSelector((state) => state.category);
  const { isSuccess, isError, isLoading, createdCategory, categoryName } =
    newCategory;

  useEffect(() => {
    if (getCategoryId !== undefined) {
      dispatch(getACategory(getCategoryId));
      formik.values.title = categoryName;
    }
  }, [getCategoryId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Product Added Successfully!");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading]);

  const formik = useFormik({
    initialValues: {
      title: categoryName || "",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (getCategoryId !== undefined) {
        const data = { id: getCategoryId, categoryData: values };
        dispatch(updateCategory(data));
        setTimeout(() => {
          toast.success("Category Updated Succesfully");
          navigate("/admin/category-list");
          dispatch(resetState());
        }, 1000);
      } else {
        dispatch(createCategory(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/category-list");
          dispatch(resetState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getCategoryId !== undefined ? "Edit" : "Add"} Category
      </h3>
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
            {getCategoryId !== undefined ? "Edit" : "Add"} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;