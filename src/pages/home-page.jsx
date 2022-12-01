import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultRobotImg from '../assets/img/blue-robot.png'
import { toyService } from "../services/toy.service";

export const HomePage = () => {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [robotImg, setRobotImg] = useState(defaultRobotImg)
    const [blinkImgClass, setBlinkImgClass] = useState(false)
    const robotImgIntervalId = useRef()

    useEffect(() => {
        robotImgIntervalId.current = setInterval(() => {
            setBlinkImgClass(false)
            const robotImg = toyService.getRandomRobotImg()
            setRobotImg(robotImg)
        }, 3000)

        return () => {
            clearInterval(robotImgIntervalId.current)
        }
    }, [])

    return (
        <section className="home-page main-layout">
            <section className='hero'>
                <div>
                    <h1>Robo Store</h1>
                    <h2>The best place to get your robot</h2>
                </div>
                <img className={`robot-img blink-img ${blinkImgClass ? 'visible' : 'invisible'}`}
                    onLoad={() => setBlinkImgClass(true)} src={robotImg} alt="robot"
                    onError={({ target }) => { setBlinkImgClass(true); target.src = defaultRobotImg }}
                />
            </section>
            {!loggedInUser && <section className='login'>
                <Link to={'/login'} className='login'>Login</Link>
                <Link to={'/toy'}>Start Anonymously</Link>
            </section>}
            {loggedInUser && <section className='get-started'>
                <Link to='/toy'>Take me in</Link>
            </section>}
        </section>
    )
}







