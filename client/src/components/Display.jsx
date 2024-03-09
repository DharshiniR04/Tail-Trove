import React, { useState,useEffect } from "react";
import '../css/Display.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Cloth from '../assets/cloth.webp';
import Food from '../assets/food.webp';
import Toys from '../assets/toys.jpeg';

function Display({onGetPro,Email}) {
    const navi = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    // axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await axios.post("http://localhost:3000/cartFind", { email: Email });
                setCartCount(response.data?.[response.data.length - 1].cart+1);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchCount();
    });
    const handleProduct = (category) => {
        onGetPro(category);
        navi('../products');
    };



    return (
        <div id="Home">
            <div id="Nav">
                <h1>Tail-Trove</h1>
                <ul>
                    <li onClick={()=>navi("../cart")}>Cart<FontAwesomeIcon icon={faShoppingCart} size="1x" /> <span>: {cartCount}</span></li>
                    <li onClick={() => navi("../")}>Logout<FontAwesomeIcon icon={faSignOutAlt} size="1x" /></li>
                </ul>
            </div>
            <div id="Products">
                <h1>Products</h1>
                <div id="Products1">
                    <div id="clo">
                        <img src={Cloth} alt="cloth" onClick={() => handleProduct("Clothes")}></img>
                        <h3>Clothes</h3>
                    </div>
                    <div id="foo">
                        <img src={Food} alt="food" onClick={() => handleProduct("petfood")}></img>
                        <h3>Food</h3>
                    </div>
                    <div id="toy">
                        <img src={Toys} alt="toys" onClick={() => handleProduct("Toys")}></img>
                        <h3>Toys</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display;
