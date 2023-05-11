import React from "react";
import { incrementQuantity, decrementQuantity, removeItem} from '../features/cart/cartslice'
import { useDispatch } from 'react-redux'

const CartItem = ({ id, image, title, price, quantity=0 }) => {
    const dispatch = useDispatch()

    const priceInPKR = (price).toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
    })

    return (
        <div className="cart-item table-responsive">
            <table className="table table-borderless">
            <tbody>
                <tr>
                <td className="m-auto"><h2>{title}</h2></td>
                <td><img className="rounded" src={image} alt={title} width={130} height={130}/></td>
                <td className="px-2 my-auto">
                    <h4 className="mx-1">{priceInPKR}</h4>
                    <div className='d-flex'>
                    <button className="btn btn-warning mx-1" onClick={() => dispatch(decrementQuantity(id))}>-</button>
                    <h3>{quantity}</h3>
                    <button className="btn btn-warning mx-1" onClick={() => dispatch(incrementQuantity(id))}>+</button>
                    </div>
                    <button className='btn btn-primary m-1 mt-3' onClick={() => dispatch(removeItem(id))}>
                    Remove
                    </button>
                </td>
                </tr>
            </tbody>
            </table>
        </div>
    );
};

export default CartItem;
