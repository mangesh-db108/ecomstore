import React, { useState } from 'react'
import "../assets/css/login.scss";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [isLoginTab,setLoginTab] = useState(true);
  const [details,setDetails] = useState({name:'',email:'',password:''})
  
  const [errors,setErrors] = useState({});
  const changeTab = () =>{
    !isLoginTab?setLoginTab(true):setLoginTab(false);
    setErrors({});
    setDetails({name:'',email:'',password:''});
  }
  
  const handleChange = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prevData)=>{
      return {...prevData,[name]:value}
    });

  }

  const errorText=(keytext)=>{
       
       setErrors((prevData)=>{
          return {...prevData,[keytext.key]:[keytext.msg]}
        })
  }

  const formAction = () => {
    const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    setErrors({});
    if(!details.name&&!isLoginTab) {
      errorText({key:"name",msg:"Please enter name"});
    }
    else if(!details.email) {
      errorText({key:"email",msg:"Please enter email"});
    }
    else if(!regex.test(details.email)) {
      errorText({key:"email",msg:"Please enter valid email"});
    }
    else if(!details.password) {
      errorText({key:"password",msg:"Please enter password"});
    }
    else {
      
        const fetchUrl = isLoginTab?`https://reqres.in/api/login`:"https://reqres.in/api/users";
        const postBody = isLoginTab?{email:'eve.holt@reqres.in',password:'cityslicka'}:details;
        
        axios.post(fetchUrl,postBody).then((res)=>{
          if(res.data) {
            if(!isLoginTab) {
              setLoginTab(true);
              setDetails({name:'',email:'',password:''})
            }
            else {
              localStorage.setItem('token', res.data.token);
              navigate("/");
            }
          }
        
        }).catch((error)=>console.log(error));
    }

    
  
  }

  return (
    <div className='maincontainer'>
      <div className='logincontainer'>
        <h3 className='formtitle'>Login Form</h3>
        <div className='d-flex formchangebtn'>
           
         <button type='button' onClick={()=>changeTab()} className={isLoginTab?'active':''}>Login</button>
          <button type='button' onClick={()=>changeTab()} className={!isLoginTab?'active':''} >Signup</button>
          
        </div>

        <div className='inputbody'>

          <input type="text" placeholder='Enter your name' value={details.name}  name='name' onChange={handleChange} className={isLoginTab?'d-none':''} ></input>
          {errors.name&&errors.name!==''?<p style={{marginBottom:"10px",marginTop:"-10px",textAlign:"center",fontWeight:"bold",color:"red"}}>{errors.name}</p>:""}

          <input type="text" placeholder='Enter your email' value={details.email} name='email' onChange={handleChange}></input>
          {errors.email&&errors.email!==''?<p style={{marginBottom:"10px",marginTop:"-10px",textAlign:"center",fontWeight:"bold",color:"red"}}>{errors.email}</p>:""}

          <input type="text" placeholder='Enter your password' value={details.password}  name='password' onChange={handleChange}></input>
          {errors.password&&errors.password!==''?<p style={{marginBottom:"10px",marginTop:"-10px",textAlign:"center",fontWeight:"bold",color:"red"}}>{errors.password}</p>:""}
           
          <button className='loginbtn' type='button' onClick={formAction}>{isLoginTab?"Login":"Signup"}</button> 

          <p className='instructiontext'>Not a member?<span onClick={()=>changeTab()}> {isLoginTab?"Sign up":"Login"}</span> </p>
        </div>

        <p onClick={()=>{navigate('/')}} className='backtohomelink'><i className='fa fa-arrow-left'></i> Back to home</p>
      </div>
    </div>
  )
}

export default Login