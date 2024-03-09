import React from "react";
import { useNavigate } from "react-router-dom";
import '../css/Payment.css';
import Video from '../assets/payment.mp4';

function Payment() {
    const navi = useNavigate();
    return (
        <div id="payment">
            <video autoPlay muted loop>
                <source src={Video}></source>
            </video>
            <div id="back">
                <h1 id="h1">Thank You For Purchasing . Your Payment Has Been Recieved Successfully . </h1>
                <button onClick={() => navi('../display')}>Home</button>
            </div>
        </div>
    );
}

export default Payment;