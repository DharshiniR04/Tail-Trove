import React from "react";
import '../css/Front.css';
import Navbar from "./Navbar";
import Video from '../assets/pet.mp4';

function Front(){
  
  return(
    <div id="Front">
      <video autoPlay muted loop>
            <source src={Video}></source>
        </video>
      <Navbar/>
      {/* <h1>Unleash Pet Happiness</h1> */}
    </div>
  );
}

export default Front;