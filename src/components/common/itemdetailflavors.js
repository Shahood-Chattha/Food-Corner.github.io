import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { addToCart } from '../../features/cart/cartslice';

const ItemDetailFlavors = ({ item }) => {
    const { productId } = useParams();
    const [activeFlavorIndex, setActiveFlavorIndex] = useState(0);
    const [activeSizeIndex, setActiveSizeIndex] = useState(0);
    const [activeFlavorIdCall, setActiveFlavorIdCall] = useState(1);
    const [activeSizeIdCall, setActiveSizeIdCall] = useState(1);
    const [activeFlavorIdCallFix, setActiveFlavorIdCallFix] = useState(0);
    const [activeSizeIdCallFix, setActiveSizeIdCallFix] = useState(0);
    const dispatch = useDispatch();
    const itemsFlavors = item.attributes.flavors.data;
    const itemsSizes = item.attributes.sizes.data;
    const activeFlavor = itemsFlavors[activeFlavorIndex];
    const activeSize = itemsSizes[activeSizeIndex];
    const flavors = useSelector((state) => state.flavor.flavors[activeFlavorIdCall - 1]);
    const image = `http://localhost:1337${item.attributes.image.data[0].attributes?.url}`;
    const imageUrl = `http://localhost:1337${flavors.attributes.image.data[0].attributes?.url}`;
    const priceInPKR = (activeSize?.attributes.price + activeFlavor?.attributes.extra_price || item.attributes.price).toLocaleString("en-PK", {
        style: "currency",
        currency: "PKR",
    });
  
    const handleFlavorClick = (flavor, index) => {
        setActiveFlavorIndex(index);
        setActiveFlavorIdCall(flavor.id);
        const num = 2
        setActiveFlavorIdCallFix(num);
    }

    const handleSizeClick = (size, index) => {
        setActiveSizeIndex(index);
        setActiveSizeIdCall(size.id);
        const num = 2
        setActiveSizeIdCallFix(num);
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
          itemsFlavors: itemsFlavors,
          id: item.id,
          name: item.attributes.name,
          image: image,
          price: activeSize?.attributes.price + activeFlavor?.attributes.extra_price || item.attributes.price,
          quantity: 1,
        }));
    }
      

    return (
        <div className="product-detail text-white p-5 d-flex">
            <div className="rounded" style={{width: "20rem", height: "20rem"}} >
                <img src={activeFlavorIdCallFix < 1 ? image : imageUrl} alt={item.attributes.name} />
            </div>
            <div className="product-detail-content p-2 px-4">
                <h2>{item.attributes.name}</h2>
                <p>{item.attributes.discription}</p>
                <div className="btn-group" role="group" aria-label="Flavors">
                    {itemsFlavors.map((flavor, index) => (
                        <button
                            key={flavor.id}
                            type="button"
                            className={`btn ${activeFlavorIndex === index ? 'btn-primary active' : 'btn-outline-primary'}`}
                            onClick={() => handleFlavorClick(flavor, index)}
                        >
                            {flavor.attributes.name}
                        </button>
                    ))}
                </div>
                <div className="btn-group my-2" role="group" aria-label="Flavors">
                    {itemsSizes.map((size, index) => (
                        <button
                            key={size.id}
                            type="button"
                            className={`btn ${activeSizeIndex === index ? 'btn-primary active' : 'btn-outline-primary'}`}
                            onClick={() => handleSizeClick(size, index)}
                        >
                            {size.attributes.name}
                        </button>
                    ))}
                </div>
                <p>{priceInPKR}</p>
                <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            </div>
        </div>
    )
}

export default ItemDetailFlavors;
