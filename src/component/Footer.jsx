import React from 'react';
import "../assets/css/common.scss";
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <section className='footer'>
        <div className='container d-flex'>
            <div className='block'>
                <h4>About</h4>
                <NavLink to="/contact">Contant Us</NavLink>
                <NavLink to="/about">About Us</NavLink>
                <NavLink to="/career">Career</NavLink>
            </div>
            <div className='block'>
                <h4>Privacy Policy</h4>
                <NavLink to="/contact">Return Policy</NavLink>
                <NavLink to="/about">Tearms Of Use</NavLink>
                <NavLink to="/career">Security</NavLink>
            </div>
             <div className='block'>
                <h4>Help</h4>
                <NavLink to="/contact">Payment</NavLink>
                <NavLink to="/about">Shipping</NavLink>
                <NavLink to="/career">FAQ</NavLink>
            </div>
            <div className='block'>
                <h4>Mail Us</h4>
                <p>
                   Ecom Private Limited, Buildings Alyssa, Begonia &  Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli Village, Nagpur, 441100, Maharashtra, India
                </p>
            </div>
             
        </div>
    </section>
  )
}

export default Footer