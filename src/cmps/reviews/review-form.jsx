import React from "react"
import { useState } from "react"
import { StarsRate } from "./stars-rate"
import { utilService } from "../../services/util.service"

export const ReviewForm = ({ onAddReview }) => {

    const [state, setState] = useState({
        rate: 4,
        content: '',
        imgUrl: ''
    })

    const focusRef = React.createRef()

    const handleChange = ev => {
        const { name, value } = ev.target
        if (name === 'rate') value = +value
        setState({ ...state, [name]: value })
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        onAddReview(state)
        setState({ rate: 0, content: '' })
    }

    const onChangeRate = (rate) => {
        setState((prevState) => ({ ...prevState, rate }))
    }

    return (
        <form className="review-form" onSubmit={onSubmit}>
            <StarsRate rate={state.rate}
                onChangeRate={onChangeRate}
            />
            <textarea ref={focusRef}
                name="content"
                id="review-text"
                value={state.content}
                placeholder="Add your review here"
                required
                onChange={handleChange}>
            </textarea>
            <button>Add New Review</button>
        </form>
    )
}
