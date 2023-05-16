import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addToCart } from '../../features/cart/cartslice';

const ItemDetailVariants = ({ item }) => {
    const dispatch = useDispatch();
    const [activeVariantIndex, setActiveVariantIndex] = useState(0);
    const [activeVariantIdCall, setActiveVariantIdCall] = useState(1);
    const [activeVariantIdCallFix, setActiveVariantIdCallFix] = useState(0);
    
    const itemsVariants = item.attributes.variants.data;
    const activeVariant = itemsVariants[activeVariantIndex];

    const variants = useSelector((state) => state.variant.variants[activeVariantIdCall - 1]);

    const image = `http://localhost:1337${item.attributes.image.data[0].attributes?.url}`;
    const imageUrl = `http://localhost:1337${variants.attributes.image.data[0].attributes?.url}`;
    
    const priceInPKR = (activeVariant?.attributes.price || item.attributes.price).toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
    });
  
    const handleVariantClick = (variant, index) => {
        setActiveVariantIndex(index);
        setActiveVariantIdCall(variant.id);
        const num = 2
        setActiveVariantIdCallFix(num);
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
          item: item,
          itemsVariants: itemsVariants,
          id: item.id,
          name: item.attributes.name,
          image: image,
          price: activeVariant?.attributes.price || item.attributes.price,
          quantity: 1,
        }));
    }
      

    return (
        <div className="product-detail  text-white p-5 d-flex">
            <div className="rounded" style={{width: "25rem", height: "25rem"}} >
                <img className="card" src={activeVariantIdCallFix < 1 ? image : imageUrl} alt={item.attributes.name} />
            </div>
            <div className="product-detail-content p-2 px-4">
                <h2>{item.attributes.name}</h2>
                <p>{item.attributes.discription}</p>
                <div className="btn-group" role="group" aria-label="Variants">
                    {itemsVariants.map((variant, index) => (
                        <button
                            key={variant.id}
                            type="button"
                            className={`btn ${activeVariantIndex === index ? 'btn-primary active' : 'btn-outline-primary'}`}
                            onClick={() => handleVariantClick(variant, index)}
                        >
                            {variant.attributes.name}
                        </button>
                    ))}
                </div>
                <p>{priceInPKR}</p>
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemDetailVariants;
