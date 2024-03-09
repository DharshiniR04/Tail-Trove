import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../css/Login.css';

function Login({onGetEmail}){
  const navi=useNavigate();
  // axios.defaults.withCredentials = true;
  const handleLogin = async(e)=> {
    e.preventDefault();
    const data={
      email:e.target.elements.email.value,
      pass:e.target.elements.pass.value
    }
    try{
      const response=await axios.post("http://localhost:3000/login",{email:data.email,pass:data.pass});
      if(response.data==="Success"){
        alert("Success");
        onGetEmail(data.email);
        navi("../display");
      }
      else{
        alert("Failed");
      }
    }
    catch(err){
      console.log("Error in Login: "+err);
    }
  }
   return(
     <div id="Login">
         <form action="post" onSubmit={handleLogin}>
            <label>Email: </label>
            <input type="text" name="email"></input><br/>
            <label>Password: </label>
            <input type="password" name="pass"></input><br/>
            <button type="submit">Login</button>
         </form>
     </div>
   );
}

export default Login;