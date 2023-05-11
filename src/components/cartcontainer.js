import React from "react";
import { useSelector } from "react-redux";
import CartItem from "./cartitem";
import { emptyCart } from '../features/cart/cartslice'
import { useDispatch } from 'react-redux'


const CartContainer = () => {
    const dispatch = useDispatch()
    const cart = useSelector((store) => store.cart.cart)

    const getTotal = () => {
        let totalQuantity = 0
        let totalPrice = 0
        cart.forEach(item => {
          totalQuantity += item.quantity
          totalPrice += item.price * item.quantity
          totalPrice = (totalPrice).toLocaleString("en-PK", {
            style: "currency",
            currency: "PKR",
        })
        })
        return {totalPrice, totalQuantity}
    }

    if(cart.length < 1){
        return (
            <section className="bg-secondary cart py-3">
                <header>
                    <h2 className="py-2 mx-5">Your Cart</h2>
                    <h4 className="empty-cart mx-5"> is currently empty</h4>
                </header>
            </section>
        );
    }

    return (
        <div>
            <section className="bg-secondary cart py-3">
                <header className="pb-2">
                    <h2 className="py-2 mx-5">Your Cart</h2>
                </header>
                <div>
                    {cart?.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            image={item.image}
                            title={item.name}
                            price={item.price} 
                            quantity={item.quantity}
                        />
                    ))}
                </div>
                <footer className="d-flex justify-content-between align-items-center py-3 border-top">
                    <h4 className="">
                        <p className="px-4 my-auto">
                            Total ({getTotal().totalQuantity} items) 
                            : <strong>{getTotal().totalPrice}</strong>
                        </p>
                    </h4>
                    <button className="btn btn-danger mx-4" onClick={() => dispatch(emptyCart())}>clear cart</button>
                </footer>
            </section>
        </div>
    );
};

export default CartContainer ;
