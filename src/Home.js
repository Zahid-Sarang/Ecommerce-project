import axios from 'axios';
import React,{useEffect, useState} from 'react';
import './Home.css';
import { Data } from './MobileData';

import Product from './Product';

function Home() {
  // const [product,setProduct] = useState([])
  // useEffect(() => {
  //   const data = async () => {
  //     const response = await axios.get('https://fakestoreapi.com/products');
  //     console.log(`product data ${response.data}`)
  //     setProduct(response.data)
  //   }
  //  data()
  // }, [])
 
    
    return (
        <div className="home">
            <div className="home__container">
                <img className="home__image" src="https://m.media-amazon.com/images/I/71UhgZQzskL._SX3000_.jpg" alt="" />

               <div className="home__row">
               {
                Data.filter((item) => item.id <=4
                ).map((item) => {
                  return (
                    <Product key={item.id} id={item.id} title={item.title} price={item.price} image={item.img} quantity={item.quantity} 
                    category={item.category} />
                  )
                })
              }
                </div>

                <div className="home__row">
                {
                Data.filter((item) => item.id > 5 && item.id <= 9
                ).map((item) => {
                  return (
                    <Product key={item.id} id={item.id} title={item.title} price={item.price} image={item.img} quantity={item.quantity} 
                    category={item.category} />
                  )
                })
              }

                </div>

                <div className="home__row">
               
                </div>
            </div>
              
            
            
        </div>
    )
}

export default Home


