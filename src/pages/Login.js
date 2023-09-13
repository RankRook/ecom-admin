/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Custominput from "../components/Custominput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector,  } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let schema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be required")
      .required("Email is Required"),
    password: Yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(login(values));
      alert(JSON.stringify(values, null, 2));
    },
  });
  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;
  useEffect(() => {
    if (!user == null || isSuccess) {
      navigate("admin");
    } else {
      alert("");
    }
  }, [user, isLoading, isError, isSuccess]);
  return (
    <>
      <div className="login animated bounceInDown">
        <div className="container">
          <form
            name="form1"
            className="box"
            onsubmit="return checkStuff()"
            onSubmit={formik.handleSubmit}
          >
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Sign in to your account.</h5>
            <div className="error text-center">
              {message.message === "Rejected"?"You are not an Admin" : ""}
            </div>
            <Custominput
              classname="input"
              type="text"
              name="email"
              label="Email"
              id="email"
              val={formik.values.email}
              onCh={formik.handleChange("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: "red" }}>{formik.errors.email}</div>
            ) : null}
            <Custominput
              classname="input"
              type="password"
              name="password"
              label="Passsword"
              id="password"
              val={formik.values.password}
              onCh={formik.handleChange("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: "red" }}>{formik.errors.password}</div>
            ) : null}
            <Link to="forgot-password">
              <a href="/" className="forgetpass">
                Forget Password?
              </a>
            </Link>
            <button type="submit" value="Login" className="btn1">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
