import React, { useEffect, useState } from "react";
import '../css/Cart.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Cart({ Email }) {
    const navi=useNavigate();
    const [detail, setDetail] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    // axios.defaults.withCredentials = true;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3000/cartFind", { email: Email });
                setDetail(response.data);

                const total = response.data.reduce((acc, item) => acc + item.price, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
           
        };
        fetchData();
    }, [Email]);

    async function handlePay() {
        try {
            await axios.post("http://localhost:3000/cartRemove", { email: Email });
            setDetail(null);
            setTotalPrice(0);
            navi('../payment');
        } catch (error) {
            console.error("Error removing items:", error);
        }
    }

    return (
        <>
            <div id="NavCart">
                <h1>Tail-Trove</h1>
            </div>
            <div id="cart-pay">
                <div id="cart-container">
                    <h2>Shopping Cart</h2>
                    <table className="cart-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail && detail.map((item, index) => (
                                <tr key={index} className="box">
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td><img src={item.image} alt={item.name} /></td>
                                    <td>{item.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="pay-container">
                     <h2>Payment</h2>
                     <p>Total Price: ${totalPrice.toFixed(2)}</p>
                     <button onClick={handlePay}>Pay</button>
                </div>
            </div>
        </>
    );
}

export default Cart;
