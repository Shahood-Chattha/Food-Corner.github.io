import React from "react";

import ProductsList from "../components/productlist";
import DealsCarousel from "../components/dealscarousel";

const Home = () => {
    return (
        <div className="bg-secondary">
            <DealsCarousel />
            <ProductsList />
        </div>
    )
}

export default Home ;