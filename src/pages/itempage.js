import React from "react";
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

import ItemDetailVariants from "../components/common/itemdetailvariants";
import ItemDetailFlavors from "../components/common/itemdetailflavors";

const ItemPage = () => {
    const { productId } = useParams();
    const {  status, error } = useSelector((state) => state.item);
    const item = useSelector((state) => state.item.items[productId - 1]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div className="bg-secondary">
        {productId === '3' ? <ItemDetailFlavors key={item.id} item={item} /> : <ItemDetailVariants key={item.id} item={item} />}
      </div>
    );
}

export default ItemPage ;