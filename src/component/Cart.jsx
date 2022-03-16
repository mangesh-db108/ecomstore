import react,{useContext} from 'react'
import "../assets/css/cart.scss";
import { cartContext } from '../App';
const Cart = () => {
    const { cart, setCart } = useContext(cartContext);
    
    const changeCart = (param) =>{
        let prodid = param.id, type = param.type;
        setCart((oldCart)=>{
            return oldCart.map((arr,ind)=>{ 
                if(arr.id==prodid) {
                    arr.qty = type==="inc"?arr.qty+1:arr.qty-1;
                    arr.qty = arr.qty<1?1:arr.qty;
                }

                return arr;
            });
        })
    }

    const removeCart = (prodid) =>{
        setCart((oldCart)=>{
            return oldCart.filter((arr,ind)=>{
                return arr.id!==prodid;
            });
        })
    }

    const CartBox = () => { return (<>{ cart.map((ele,key)=>{
            return(<><div className='cartprodrow'>
                        <div className='container cartbox'>
                            <div className='prodimg'>
                                <img alt={ele.title} src={ele.image}/>
                            </div>
                            <div className='proddetails'>
                                <h3 className='prodname'>
                                    {ele.title}
                                </h3>

                                <p className='prodqtyprice'>
                                    <span>{ele.qty}</span> X <span>${ele.price}</span> = <span>${ele.price*ele.qty}</span>
                                </p>

                                <p className='prodbtns'>
                                    <button type='button' onClick={()=>{changeCart({type:'dec',id:ele.id})}}><i className='fa fa-minus'></i></button>
                                    <button type='button' onClick={()=>{changeCart({type:'inc',id:ele.id})}}><i className='fa fa-plus'></i></button>
                                </p>

                                <button className='removecartbtn' type='button' onClick={()=>{removeCart(ele.id)}}>Remove <i className='fa fa-trash'></i></button>
                            </div>
                        </div>
                    </div>
            </>);
        }) }</>)
        }

        const NoCart = () =>{
            return(<><img className='nocart' alt='no cart' src='https://vividparts.com/site_assets/images/empty_cart.gif'/></>);
        }

    return (
    <section className="cartcontainer">
        {console.log(cart)}
        {  cart.length?<CartBox/>:<NoCart/> }
        
    </section>
  )
}

export default Cart