import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Front from './components/Front';
import Login from './components/Login';
import Signup from './components/Signup';
import Products from './components/Products';
import Display from './components/Display';
import Cart from './components/Cart';
import Payment from './components/Payment';

function App() {
  const [product, setProduct] = useState("");
  const [ema, setEma] = useState("");
  
  const pro = (info) => {
    setProduct(info);
  }

  const email = (info) => {
    setEma(info);
  }

  useEffect(() => {
    console.log(product);
  }, [product]);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Front />} />
        <Route path='/login' element={<Login onGetEmail={email} />} />
        <Route path='/signup' element={<Signup />} />
        {ema && <Route path='/display' element={<Display onGetPro={pro} Email={ema} />} />}
        {ema && product && (<Route path='/products' element={<Products product={product} Email={ema}/>} />)}
        {ema  && (<Route path='/cart' element={<Cart Email={ema}/>} />)}
        <Route path='/payment' element={<Payment/>}/>
      </Routes>
    </Router>
  );
}

export default App;


