import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Signup.css';

function Signup() {
  const navi=useNavigate();
  
  // axios.defaults.withCredentials = true;

  const handleSignup=async (e)=>{
     e.preventDefault();
     const data={
       fname:e.target.elements.fname.value,
       phone:e.target.elements.phone.value,
       email:e.target.elements.email.value,
       pass:e.target.elements.pass.value
     }
     try{
        const response=await axios.post("http://localhost:3000/signup",{fname:data.fname,phone:data.phone,email:data.email,pass:data.pass});
        console.log(response);
        if(response.data==="Success"){
           alert("Success");
           navi("../login");
        }
        else{
          alert("Failed");
        }
     }
     catch(err){
      console.log("Error in Signup: "+err);
     }
  }
  return (
    <>
      <div id="Signup">
        <form action="" onSubmit={handleSignup}>
          <label>Name: </label>
          <input type="text" name="fname"></input><br />
          <label>Phone No: </label>
          <input type="text" name="phone"></input><br />
          <label>Email: </label>
          <input type="text" name="email"></input><br />
          <label>Password: </label>
          <input type="password" name="pass"></input><br />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
}

export default Signup;