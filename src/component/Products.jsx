import React, { useEffect, useState } from 'react'
import "../assets/css/product.scss";
import { NavLink,useParams} from 'react-router-dom';
import axios from 'axios';

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Products = () => {

    const [products,setProducts] = useState([]);
    const [filter,setFilter] = useState([]);
    const [loading,setLoading] = useState(true); 
    const urlParam = useParams();
    
    const getallproducts = async ()=>{
        await axios.get("https://fakestoreapi.com/products").then((response)=>{
            setProducts( response.data);
            setFilter( response.data)  
            
            if(urlParam.categoryname)
                filterProduct(urlParam.categoryname,response.data)

            setLoading(false)
        });
    }

    useEffect(()=>{
        getallproducts();
    },[]);

    const ProductCards = () =>{
        console.log("came to render")
        return(<>
            {filter.map((ele,key)=>{
                        return(<>
                            <div id={ele.id} key={ele.id} className='productCard'>
                                <img className="prodimg" alt='prodimg' src={ele.image}/>
                                <div className='proddetails'>
                                    <NavLink to={'../product/'+ele.id} className='pname truncate'>{ele.title}</NavLink>
                                    <h3 className='price'>${ele.price}</h3>
                                    <button type='button' className='buynowbtn'>Buy Now</button>
                                </div>
                            </div>
                        </>)
                    })}
        </>)
    }

    const Loading = () =>{
        return(<><div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
        </>);
    }

    const filterProduct = (catType,data) =>{
        if(data) {
            setLoading(true)
            catType==="all"?setFilter(data):setFilter(data.filter((prod)=>prod.category===catType));
            setLoading(false)
        }
        else {
             setLoading(true)
            catType==="all"?setFilter(products):setFilter(products.filter((prod)=>prod.category===catType));
            setLoading(false)
        }
       
    }

  return (
    <section className='categorySection'>
            <div className='container'>
                <h2 className='categorytitle'>Latest Product</h2>

                <div className='productCatBtn'>
                    <button onClick={()=>{filterProduct("all")}}> All  </button>
                    <button onClick={()=>{filterProduct("men's clothing")}}> Men's Clothing  </button>
                    <button onClick={()=>{filterProduct("women's clothing")}}> Women's Clothing  </button>
                    <button onClick={()=>{filterProduct("jewelery")}}> Jewelery  </button>
                    <button onClick={()=>{filterProduct("electronics")}}> Electronc  </button>
                </div>

                <div className='productCards'>
                    {loading?<Loading/>:<ProductCards/>}
                </div>
            </div>
        </section>
  )
}

export default Products