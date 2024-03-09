import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "../css/Products.css";


function Products({ product, Email }) {

    const [petItems, setPetItems] = useState([]);
    const [visibleItems, setVisibleItems] = useState(6);
    const navi = useNavigate();
    const [cartCount, setCartCount] = useState(0);
    
    // axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/${product}`);
                setPetItems(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
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

    const loadMoreItems = () => {
        setVisibleItems((prevVisibleItems) => prevVisibleItems + 3);
    };

    const handleAdd = async (item) => {
        setCartCount((prevCount) => prevCount + 1);
        try {
             await axios.post("http://localhost:3000/cart", {
                email: Email,
                image: item.image,
                name: item.name,
                price: item.price,
                cart:cartCount
            });

        } catch (error) {
            console.error("Error submitting:", error);
        }

    };

    return (
        <>
            <div id="Nav">
                <h1>Tail-Trove</h1>
                <ul>
                    <li onClick={() => navi("../cart")}>Cart<FontAwesomeIcon icon={faShoppingCart} size="1x" /> <span>: {cartCount}</span></li>
                    <li onClick={() => navi("../")}>Logout<FontAwesomeIcon icon={faSignOutAlt} size="1x" /></li>
                </ul>
            </div>
            <div id="Pro">
                <h1>Available {product}</h1>
                <div className="box-container">
                    {petItems.slice(0, visibleItems).map((item, index) => (
                        <div className="box" key={index}>
                            <p>{item.name}</p>
                            <img src={item.image} alt={item.name}></img>
                            {product === "petfood" && (
                                <>
                                    <h4><span>Brand: </span>{item.brand}</h4>
                                    <h4><span>Flavour: </span>{item.flavor}</h4>
                                    <h4><span>Weight: </span>{item.weight}</h4>
                                    <h4><span>Price: </span>{item.price}</h4>
                                </>
                            )}
                            {product === "Clothes" && (
                                <>
                                    <h4><span>Brand: </span>{item.brand}</h4>
                                    <h4><span>Size: </span>{item.size}</h4>
                                    <h4><span>Color: </span>{item.color}</h4>
                                    <h4><span>Price: </span>{item.price}</h4>
                                </>
                            )}
                            {product === "Toys" && (
                                <>
                                    <h4><span>Type: </span>{item.type}</h4>
                                    <h4><span>Material: </span>{item.material}</h4>
                                    <h4><span>Price: </span>{item.price}</h4>
                                </>
                            )}
                            <button id="btn" onClick={() => handleAdd(item)}>Add</button>
                        </div>
                    ))}
                </div>
                {visibleItems < petItems.length && (
                    <button onClick={loadMoreItems} id="button">Load More</button>
                )}
            </div>
        </>
    );
}

export default Products;
