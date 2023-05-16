import React from "react";

import ProductsList from "../components/productlist";
import DealsCarousel from "../components/dealscarousel";

const Home = () => {
    return (
        <div className="" style={{ backgroundColor: "#616161"}}>
            <div className="mx-5 px-5 z-1">
                <DealsCarousel />
            </div>
            <div className="d-flex justify-content-center text-black">
                    <ProductsList />
            </div>
        </div>
    )
}

export default Home ;