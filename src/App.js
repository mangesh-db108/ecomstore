import react, { createContext, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import Nav from "./component/Nav";
import Footer from "./component/Footer";
import Product from "./component/Product";
import Products from "./component/Products";
import Cart from "./component/Cart";

const cartContext = createContext();
function App() {
  const location = useLocation();
  const [cart,setCart] = useState([]);
  const wrapCart = { cart, setCart };
  return (
    <>
      {location.pathname === "/login" ? null : <Nav cartcnt={cart.length} />}
      <cartContext.Provider value={wrapCart}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/ecomstore" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Login />}></Route>
          <Route path="/products" element={<Products />}>
            <Route path=":categoryname" element={<Products />} />
          </Route>
          <Route path="/product/:prodid" element={<Product />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
      </cartContext.Provider>
      {location.pathname === "/login" ? null : <Footer />}
    </>
  );
}

export default App;
export { cartContext };
