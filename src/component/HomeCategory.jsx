import React from 'react'
import { NavLink} from 'react-router-dom';

const HomeCategory = (props) => {
    let products = props.products;
    return (<>
                {products.filter((item, idx) => item.category===props.catname).map((ele,cnt)=>{
                    
                        
                        return cnt<4?<div id={ele.id} key={ele.id} className='productCard'>
                                <img className="prodimg" alt='prodimg' src={ele.image}/>
                                <div className='proddetails'>
                                    <NavLink to={'product/'+ele.id} className='pname truncate'>{ele.title}</NavLink>
                                    <h3 className='price'>${ele.price}</h3>
                                    <NavLink to={'product/'+ele.id} className='buynowbtn'>Buy Now</NavLink>
                                     
                                </div>
                            </div>:"";
            
                })}
        </>
    
  )
}

export default HomeCategory