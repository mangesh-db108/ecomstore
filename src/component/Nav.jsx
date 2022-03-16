import React from 'react'
import "../assets/css/home.scss";
import { NavLink,useNavigate } from 'react-router-dom';

const Nav = (props) => {
    let token = localStorage.getItem('token');
    
    const UserNavLinks = () =>{
        if(!token) {
            return (<><NavLink to="/login">Login</NavLink>
            <NavLink to="/login">Signup</NavLink></>);
        }
        else {
            return (<><a to="#"  onClick={()=>{localStorage.clear();navigate("/");}}>Logout</a></>);
        }
    }
  
    const navigate = useNavigate();
  return (
     <header className='navheader'>
            <div className='container'>
                <div className='navcontainer'>
                    <div className='logo' onClick={()=>{navigate("/")}}>
                        Ecom
                    </div>
                    <div className='searchbox'>
                        <input type="text" placeholder='Enter keyword/product name'></input>
                    </div>
                    <div className='navlinks ml-auto'>
                        <NavLink to="/products">Products</NavLink>
                        <UserNavLinks/>
                        <NavLink to="/cart">
                            {props.cartcnt?<span id='cartCnt'>{props.cartcnt}</span>:""}
                            <i className="fa fa-cart-plus" aria-hidden="true"></i>
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    
  )
}

export default Nav