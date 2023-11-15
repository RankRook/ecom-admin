/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Dropzone from "react-dropzone";
import {
  delImg,
  resetUploadState,
  uploadImg,
} from "../../features/upload/uploadSlice";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  createBlog,
  getABlog,
  resetImgBlogState,
  resetState,
  updateBlog,
} from "../../features/blog/blogSlice";

import { getBlogcats } from "../../features/blogcat/blogcatSlice";
import { resetImgProductState } from "../../features/product/productSlice";
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Category is Required"),
});
const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.blogcat.blogcats);
  const blogState = useSelector((state) => state.blog);
  const imgBlogState = useSelector(state => state.blog.blogImages)
  const { blogName, blogDesc, blogCategory, blogImages } = blogState;

  const [images, setImages] = useState([]);
  


  useEffect(() => {
    dispatch(getBlogcats());
  }, []);

  const img = [];
  imgState.forEach((i) => {
    img.push({
      public_id: i.public_id,
      url: i.url,
    });
  });

  useEffect(() => {
    formik.values.images = img;
  }, [blogImages]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
  console.log(blogName);
  console.log(blogCategory);
  console.log(blogImages);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      category: blogCategory || "",
      images: imgState || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetState());
          dispatch(resetUploadState());
        }, 1000);
      } else {
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
          // dispatch(resetState());
          dispatch(resetUploadState());
        }, 1000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? "Edit" : "Add"} Blog
      </h3>
      <div className="mt-4">
        <form onSubmit={formik.handleSubmit} className="add-blog-form">
          <CustomInput
            type="text"
            id="title"
            name="title"
            onCh={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <label htmlFor="category">Category</label>
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3  mt-3"
            id=""
          >
            <option value="">Select Blog Category</option>
            {bCatState.map((i, j) => {
              return (
                <option key={j} value={i.title}>
                  {i.title}
                </option>
              );
            })}
          </select>
          {formik.touched.blogcat && formik.errors.blogcat && (
            <div className="error">{formik.errors.blogcat}</div>
          )}
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
            {getBlogId === undefined ? (
              <div className="showimages d-flex flex-wrap gap-3">
                {imgState?.map((i, j) => {
                  return (
                    <div className=" position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(delImg(i.public_id));
                        }}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })}
              </div>
            ) : imgBlogState === null || (
              <div className="showimages d-flex flex-wrap gap-3">
                {imgBlogState?.map((i, j) => {
                  return (
                    <div className=" position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => {
                          // dispatch(resetImgProductState());
                          dispatch(resetImgBlogState());
                          dispatch(delImg(i.public_id));
                        }}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })} 
                {imgState?.map((i, j) => {
                  return (
                    <div className=" position-relative" key={j}>
                      <button
                        type="button"
                        onClick={() => dispatch(delImg(i.public_id))}
                        className="btn-close position-absolute"
                        style={{ top: "10px", right: "10px" }}
                      ></button>
                      <img src={i.url} alt="" width={200} height={200} />
                    </div>
                  );
                })}
              </div>
                                  
            )}
          </div>

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getBlogId !== undefined ? "Edit" : "Add"} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
