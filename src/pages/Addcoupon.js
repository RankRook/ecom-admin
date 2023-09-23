/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from "react";
import CustomInput from "../components/Custominput";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../features/coupon/couponSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title Coupon is Required"),
  expiry: yup.date().required("expiry Coupon is Required"),
  discount: yup.number().required("discount Coupon is Required"),

});

const Addcoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      expiry:"",
      discount:""
    },
    validationSchema: schema,

    onSubmit: (values) => {
      toast.success("Coupon Added Successfully!")
      dispatch(createCoupon(values));
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/coupon-list");
      }, 1000);
    },
  });
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      <div className="mt-4">
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            id="name"
            name="name"
            onCh={formik.handleChange("name")}
            onBlr={formik.handleBlur("name")}
            val={formik.values.name}
          />
          <div className="error">
            {formik.touched.name && formik.errors.name}
          </div>
          <CustomInput
            type="date"
            id="date"
            name="expiry"
            onCh={formik.handleChange("expiry")}
            onBlr={formik.handleBlur("expiry")}
            val={formik.values.expiry}
          />
          <div className="error">
            {formik.touched.expiry && formik.errors.expiry}
          </div>
          <CustomInput
            type="number"
            id="discount"
            name="discount"
            onCh={formik.handleChange("discount")}
            onBlr={formik.handleBlur("discount")}
            val={formik.values.discount}
          />
          <div className="error">
            {formik.touched.discount && formik.errors.tdiscountitle}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
