import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import ItemDetailVariants from "../components/common/itemdetailvariants";
import { fetchProductItems } from "../features/product/itemslice";
import ItemDetailFlavors from "../components/common/itemdetailflavors";

const ItemPage = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const {  status, error } = useSelector((state) => state.item);
    const item = useSelector((state) => state.item.items);
    console.log(item)

    useEffect(() => {
      dispatch(fetchProductItems(productId));
    }, [dispatch, productId]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="bg-secondary">
        {productId !== 0 && item && (productId === '3' ? <ItemDetailFlavors key={item.id} item={item} /> : <ItemDetailVariants key={item.id} item={item} />)}
        {/* {productId === '3' ? <ItemDetailFlavors key={item.id} item={item} /> : <ItemDetailVariants key={item.id} item={item} />} */}
      </div>
    );
}

export default ItemPage ;