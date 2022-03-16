import React,{useEffect,useState,useContext} from 'react'
import "../assets/css/product.scss";
import axios from 'axios';
import {cartContext} from "../App";
import { useParams,useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Product = () => {
    const { cart, setCart } = useContext(cartContext);
    
    const [product,setProduct] = useState();
    const[loading,setLoading] = useState(true);
    const urldata = useParams();
    const currentprodid  = urldata.prodid;
    const navigate = useNavigate();
    useEffect(()=>{

        const getallproducts = async  ()=>{
            await axios.get(`https://fakestoreapi.com/products/${currentprodid}`).then((response)=>{

                setProduct(response.data);
                setLoading(false);
                
            });
        }
        
        getallproducts();

    },[]);

    const addToCart = (cartproduct) => {
        if(cart.indexOf(cartproduct)!==-1) return;
        cartproduct.qty =1;
        setCart((prevdata)=>{ return [...prevdata,cartproduct] })
    }

    const ProdShow = () => {
        
        return(<>
            <div className='prodimagebox'>
                <img className="prodimg" alt='prodimg' src={product.image}/>
            </div>

            <div className='proddetails'>
                <h4 className='prodcat'>{product.category}</h4>
                <h1 className='prodname'>{product.title}</h1>
                <p  className='prodrating'>Rating {product.rating.rate} <i className='fa fa-star'></i></p>

                <h3  className='prodprice'>$ {product.price}</h3>

                <p  className='proddesc'>{product.description}</p>

                <div className='d-flex prodbtns'>
                    <button type='button' onClick={()=>{ addToCart(product) }}>Add to cart</button>
                    <button type='button' onClick={()=>{ navigate("/cart") }}>Go to cart</button>
                </div>
            </div>
        </>);
    }

    const Loading = () =>{
        return(<><div className='prodimagebox'>
                <Skeleton height={350}></Skeleton>
            </div>

            <div className='proddetails'>
                <Skeleton height={30} width={200}></Skeleton>
                <Skeleton height={30} width={300}></Skeleton>
                <Skeleton height={20}  width={50}></Skeleton>

                <Skeleton height={30}  width={100}></Skeleton>

               <Skeleton height={30}  width={150}></Skeleton>

                <div className='d-flex prodbtns'>
                   <Skeleton height={50} width={50}></Skeleton>
                   <Skeleton height={50} width={50}></Skeleton>
                </div>
            </div>
        </>);
    }
    
  return (
    <section className='productsection'>
        <div className='container d-flex'>
            {loading?<Loading/>:<ProdShow/>}
        </div>
    </section>
  )
}

export default Product