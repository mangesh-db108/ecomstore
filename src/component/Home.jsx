import React, { useEffect, useState, lazy, Suspense } from 'react'
import "../assets/css/home.scss";
import { NavLink} from 'react-router-dom';

import axios from 'axios';
import HomeCategory from './HomeCategory';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
const Banner = lazy(()=>import('./Banner'));

const Home = () => {

    const [loading,setLoading] = useState(true);
     const [products,setProducts] = useState([]);
     
    const getallproducts = ()=>{
        axios.get("https://fakestoreapi.com/products").then((response)=>{
            setProducts(response.data);
            setLoading(false)
        });
    }

    useEffect(()=>{
        getallproducts();
    },[]);

     const Loading = () =>{
        return(<><div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
            <div className='productCard'><Skeleton height={250}></Skeleton></div>
        </>);
    } 

    const BannerLoading = () =>{
        return(<><Skeleton height={500} color={"red"}></Skeleton> </>);
    }

    return (
      <>
        <Suspense fallback={<BannerLoading/>}>
            <div className='bannercontainer'>
                <Banner/>
            </div>
        </Suspense>
        
        <section className='categorywiseSection'>
            <div className='container'>
                <h2 className='categorytitle'>Men's Clothing <NavLink to="products/men's clothing" className='viewallbtn'>View All</NavLink></h2> 

                <div className='productCards'>
                    {loading?<Loading/>:<HomeCategory products={products} catname="men's clothing"/>}
                </div>
            </div>

            <div className='container'>
                <h2 className='categorytitle'>Women's Clothing <NavLink to="products/women's clothing" className='viewallbtn'>View All</NavLink></h2> 

                <div className='productCards'>
                    {loading?<Loading/>:<HomeCategory products={products} catname="women's clothing"/>}
                </div>
            </div>

            <div className='container'>
                <h2 className='categorytitle'>Jewelery <NavLink to="products/jewelery" className='viewallbtn'>View All</NavLink></h2> 

                <div className='productCards'>
                    {loading?<Loading/>:<HomeCategory products={products} catname="jewelery"/>}
                </div>
            </div>

            <div className='container'>
                <h2 className='categorytitle'>Electronics  <NavLink to="products/electronics" className='viewallbtn'>View All</NavLink></h2> 

                <div className='productCards'>
                    {loading?<Loading/>:<HomeCategory products={products} catname="electronics"/>}
                </div>
            </div>
        </section>
      </>
    
  )
}

export default Home