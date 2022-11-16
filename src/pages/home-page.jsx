import React from "react"
import { Link } from "react-router-dom";

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
        </section >
    );
};







