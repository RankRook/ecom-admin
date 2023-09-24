import React from 'react'
import './Login.css'
const Forgotpassword = () => {
  return (
    <>
      <div class="animated bounceInDown">
        <div class="container-forgot">
          <form name="form1" class="box" onSubmit="return checkStuff()">
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Please Enter your register email to get password</h5>
            <input
              type="text"
              name="email"
              placeholder="Email"
              autocomplete="off"
            />
            <input type="submit" value="Resend Link" class="btn1" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Forgotpassword
