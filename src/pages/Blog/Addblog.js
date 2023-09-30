/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect, useState } from "react";
import CustomInput from "../../components/CustomInput";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";
import * as yup from "yup";
import Dropzone from "react-dropzone";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBlogcats } from "../../features/blogcat/blogcatSlice";
import { createBlog, getABlog, resetState, updateBlog } from "../../features/blog/blogSlice";
import { deleteImg, uploadImg } from "../../features/upload/uploadSlice";
import { getCategorys } from "../../features/category/categorySlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  category: yup.string().required("Blog Category is Required"),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split("/")[3];
  const imgState = useSelector((state) => state.upload.images);
  const blogcatState = useSelector((state) => state.blogcat.blogcats);
  const blogState = useSelector((state) => state.blog);
  const {
    createdBlog,
    blogName,
    blogDesc,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;
  const [images, setImages] = useState([]);
  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
      img.push(blogImages);
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategorys());
  }, []);

  const handleImageDeletion = () => {
    // Gọi action để xóa hình ảnh từ `imgState`
    imgState.forEach((image) => {
      dispatch(deleteImg(image.public_id));
    });
    // Cập nhật lại state `images` thành mảng rỗng
    setImages([]);
  };

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || "",
      description: blogDesc || "",
      blogcat: blogCategory || "",
      images: "[]",
    },
    validationSchema: schema,

    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        const data = { id: getBlogId, blogData: values };
        dispatch(updateBlog(data));
        toast.success("Blog Updated Successfullly!")
        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetState());
        }, 300);
      } else {
        toast.success("Blog Added Successfullly!")
        dispatch(createBlog(values));
        formik.resetForm();
        setTimeout(() => {
          navigate("/admin/blog-list");
          dispatch(resetState());
        }, 300);
      }
    },
  });
  return (
    <div>
      <div className="">
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
            id="category"
            name="category"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.blogcat}
            className="form-select"
          >
            <option value="">Select Category</option>
            {blogcatState.map((i, j) => {
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
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
