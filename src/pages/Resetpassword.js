import React from 'react'
import './Login.css'
const Resetpassword = () => {
  return (
    <>
      <div class="animated bounceInDown">
        <div class="container-reset">
          
          <form name="form1" class="box" onsubmit="return checkStuff()">
            <h4>
              Admin<span>Dashboard</span>
            </h4>
            <h5>Please Enter your new password.</h5>
            <input
              type="password"
              name="password"
              placeholder="New Passsword"
              id="pwd"
              autocomplete="off"
            />            
            <input
              type="password"
              name="password"
              placeholder="Confirm Passsword"
              id="pwd"
              autocomplete="off"
            />
            <input type="submit" value="Reset Password" class="btn1" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Resetpassword
