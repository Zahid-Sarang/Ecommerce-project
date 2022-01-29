import React from 'react';
import './Payment.css'
import CheckoutProduct from './CheckoutProduct';
import { useStateValue } from './StateProvider';

const Payment = () => {
    const [{cart,user},dispatch] = useStateValue();   

    return (
        <div className='payment'>
            <div className='payment__container'>
            {/* Delivery Address */}
             <div className='payment__section'>
             <h3>Delivery Address:</h3>
             <div className='payment_address'>
                 <p>{user?.email}</p>
                 <p>falt no: 301, Hiranandani</p>
                 <p> Washington, United States</p>
             </div>

             </div>
             {/* Cart Review */}
             <div className='payment__section'>
             <h3>Review yuor Item in Cart</h3>
             <div className='payment__item'>
             {
              cart.map((item) => (
                <CheckoutProduct
                key={item.id}
                id={item.id} 
                title={item.title} 
                price={item.price}
                image={item.image}
                 />
              ))
             }
             </div>
                 
             </div>
             {/* Payment Gateway */}
             <div className='payment__section'>
             <h3>Payment Method:</h3>
             <div className='payment__details'>
                 {/* Strip payment */}
             </div>
                 
             </div>
            </div>
        </div>
    )
}

export default Payment
