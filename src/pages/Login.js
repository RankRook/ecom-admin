/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import './Login.css'
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div class="animated bounceInDown">
        <div class="container">
          <form name="form1" class="box" onsubmit="return checkStuff()">
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Sign in to your account.</h5>
            <input
              type="text"
              name="email"
              placeholder="Email"
              autocomplete="off"
            />
            <input
              type="password"
              name="password"
              placeholder="Passsword"
              id="pwd"
              autocomplete="off"
            />
            <Link to="forgot-password">
              <a href="/" class="forgetpass">
                Forget Password?
              </a>
            </Link>
            <Link to="admin">
            <input type="submit" value="Sign in" class="btn1" />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
