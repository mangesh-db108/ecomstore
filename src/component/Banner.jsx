import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerList from "./BannerList";

const Banner = () => {

  return (
    <>
      <Carousel>
          {
            BannerList.map((ele,ind)=>{
              return(<div id={ind} key={ind}><img style={{maxHeight:"500px"}} alt="banner"  src={ele} /></div>)
            })
          }
      </Carousel>  

        

    </>
  )
}

export default Banner