import React from "react";
import { useSelector } from "react-redux";

const Deals = ({ name, image }) => {
    return (
        <div className="carousel-item active">
            <img src={image} className="d-block w-100" alt={name} />
        </div>
    )
}

const DealsCarousel = () => {
    const products = useSelector((state) => state.deal.deals);
    const status = useSelector((state) => state.deal.deals);
  
    if (status === "loading") {
      return <p>Loading...</p>;
    }

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                {products.length === 0 ? (<></>) : (
                    <>
                        {products.map((item)=> {
                            return (
                            <Deals
                                key={item.id}
                                name={item.attributes.name}
                                image={`http://localhost:1337${item.attributes.image.data[0].attributes?.url}`}
                            />
                            )
                        })}
                    </>
                )}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default DealsCarousel ;