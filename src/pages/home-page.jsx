import React from "react"
import { Link } from "react-router-dom";
import ScratchCard from "react-scratch-coupon";


export const HomePage = () => {
    return (
        <section className="homepage-container">
            <Link to={'/login'}>Login</Link>
            <section className="homepage-wrapper">
                <section className="homepage">
                    <div className="homepage-text">
                        <h1 className="homepage-title">
                            Mister Toy helps teams move work forward.
                        </h1>
                        <p className="homepage-paragraph">
                            Collaborate, manage projects, and reach new productivity peaks.
                            From high rises to the home office, the way your team works is
                            unique—accomplish it all with N  Mister Toy.
                        </p>
                    </div>
                </section>
            </section>
            <>
                <ScratchCard width={300} height={300}>
                <h1>react-scratch-coupon</h1>
                    <form className="form">
                        <h2>Hello There!</h2>
                        <h1>
                            <code>Coupon code : 1651613335</code>
                        </h1>
                        <div>
                            <input type="text" name="code" placeholder="Coupon Code"></input>
                        </div>
                        <div>
                            <input type="submit" value="Submit"></input>
                        </div>
                    </form>
                </ScratchCard>
            </>
        </section >
    );
};







