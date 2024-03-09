import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Navbar.css';


function Navbar(){
   const navi=useNavigate();
   return(
    <div>
       <div id="Nav">
           <h1>Tail-Trove</h1>
           <ul>
             <li onClick={()=>navi('../login')}>Login</li>
             <li onClick={()=>navi('../signup')}>Signup</li>
           </ul>
       </div>
    </div>
   );
}

export default Navbar;