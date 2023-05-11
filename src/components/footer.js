import React from "react";

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-3">
            <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <h4>About Us</h4>
                    <p>We are a fast food restaurant that offers delicious food and great customer service. Visit us today!</p>
                </div>
                <div className="col-md-4">
                    <h4>Opening Hours</h4>
                    <ul className="list-unstyled">
                    <li>Monday - Friday: 10am - 10pm</li>
                    <li>Saturday: 12pm - 10pm</li>
                    <li>Sunday: 12pm - 8pm</li>
                    </ul>
                </div>
                <div className="col-md-4">
                    <h4>Contact Us</h4>
                    <p>123 Main Street, Anytown USA</p>
                    <p>Phone: 555-555-5555</p>
                    <p>Email: info@fastfood.com</p>
                </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer ;