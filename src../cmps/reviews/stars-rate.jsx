import { useEffect, useState } from "react"

export const StarsRate = (props) => {

    const [originalRate, setOriginalRate] = useState(props.rate)
    const [rate, setRate] = useState(props.rate)

    const emptyStar = String.fromCharCode(9734)
    const fullStar = String.fromCharCode(9733)

    const onMouseIn = (idx) => {
        setRate(idx + 1)
    }

    const onMouseOut = () => {
        setRate(originalRate)
    }

    useEffect(() => {
        props.onChangeRate(originalRate)
    }, [originalRate])

    const stars = []
    for (let i = 0; i < 5; i++) {
        stars.push(i < rate ? fullStar : emptyStar)
    }

    return (
        <section className="stars-rate">
            <ul className="clean-list">
                {stars.map((star, idx) =>
                    <li key={idx}
                        onMouseEnter={() => onMouseIn(idx)}
                        onMouseLeave={onMouseOut}
                        onClick={() => setOriginalRate(idx + 1)}>
                        {star}
                    </li>
                )}
            </ul>
        </section>
    )
}