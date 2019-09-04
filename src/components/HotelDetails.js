import React from 'react';

export default function HotelDetails(props) {
    const menu = ["Maps", "Photo gallery", "Amenities", "Dynamic Form"]

    return (
        <section>
        <main className="container">
                <article className="hotel-details">
                    <figure className="main-figure">
                        <img src="../hotelexterior.jpg" className="rounded" width="650" alt="Hotel Exterior" />
                    </figure>
                    <h3><strong>Hilton Chicago</strong></h3>
                    <p>720 South Michigan Avenue<br />
                        Chicago, Illinois, 60605</p>
                    <a href="tel:+13129224400">1-312-922-4400</a>
                </article>
            </main>
            <nav className="container">
                <ul>
                    {menu.map((el, key) => <li key={key}><a href="/dynamicform">{el}<i className="fa fa-chevron-right"></i></a></li>)}
                </ul>
            </nav>
        </section>
    )
}