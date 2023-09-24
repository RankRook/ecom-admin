/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../features/brand/brandSlice";
import { getCategorys } from "../../features/category/categorySlice";
import { createProduct } from "../../features/product/productSlice";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import "./addproduct.css";


let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const handleImageDeletion = () => {
    // Gọi action để xóa hình ảnh từ `imgState`
    imgState.forEach((image) => {
      dispatch(deleteImg(image.public_id));
    });
    // Cập nhật lại state `images` thành mảng rỗng
    setImages([]);
  };

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategorys());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.category.categorys);
  const imgState = useSelector((state) => state.upload.images);

  // const newProduct = useSelector((state) => state.product);
  // const { isSuccess, isError, isLoading, createProducts } = newProduct;

  // useEffect(() => {
  //   if (isSuccess && createProducts ) {
  //     toast.success("Product Added Successfully!");
  //   }
  //   if (isError) {
  //     toast.error("Something Went Wrong");
  //   }
  // }, [isSuccess, isError, isLoading, createProducts]);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [img]);

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      brand: "",
      category: "",
      quantity: "",
      images: "[]",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      toast.success("Product Added Successfully!")
      dispatch(createProduct(values));
      handleImageDeletion(); // Xóa hình ảnh sau khi submit
      formik.resetForm();
      setTimeout(() => {
        navigate("/admin/product-list");
      }, 1000);
    },
    
  });

  return (
    <div className="">
      <h3 className="title">Add Product</h3>
      <div>
        <form onSubmit={formik.handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="title">Product Title</label>
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
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              // onBlur={formik.handleBlur("description")}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="error">{formik.errors.description}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="price">Product Price</label>
            <CustomInput
              type="number"
              id="price"
              name="price"
              onCh={formik.handleChange("price")}
              onBl={formik.handleBlur("price")}
              value={formik.values.price}
            />
            <div className="error">
              {formik.touched.price && formik.errors.price}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <select
              id="brand"
              name="brand"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.brand}
              className="form-select"
            >
              <option value="">Select Brand</option>
              {brandState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            {formik.touched.brand && formik.errors.brand && (
              <div className="error">{formik.errors.brand}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              className="form-select"
            >
              <option value="">Select Category</option>
              {categoryState.map((i, j) => {
                return (
                  <option key={j} value={i.title}>
                    {i.title}
                  </option>
                );
              })}
            </select>
            {formik.touched.category && formik.errors.category && (
              <div className="error">{formik.errors.category}</div>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="quantity">Product Quantity</label>
            <CustomInput
              type="number"
              id="quantity"
              name="quantity"
              onCh={formik.handleChange("quantity")}
              onBl={formik.handleBlur("quantity")}
              value={formik.values.quantity}
            />
            <div className="error">
              {formik.touched.quantity && formik.errors.quantity}
            </div>
          </div>
          <div className="form-group">
            <div className="upload-form bg-white border-1 p-5 text-center">
              <Dropzone
                onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>
                        Drag 'n' drop some files here, or click to select files
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className="showimages d-flex flex-wrap gap-3">
              {imgState?.map((i, j) => {
                return (
                  <div className=" position-relative" key={j}>
                    <button
                      type="button"
                      onClick={() => dispatch(deleteImg(i.public_id))}
                      className="btn-close position-absolute"
                      style={{ top: "10px", right: "10px" }}
                    ></button>
                    <img src={i.url} alt="" width={200} height={200} />
                  </div>
                );
              })}
            </div>
          </div>
          <button className="btn btn-primary" type="submit">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
