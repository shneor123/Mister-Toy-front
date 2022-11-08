import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"

import { toyService } from "../services/toy.service"
import { userService } from "../services/user.service"
import { showSuccessMsg } from "../services/event-bus.service"

import { ToogleChat } from "../cmps/toogle-chat"
import { ToyReview } from "../cmps/reviews/toy-review"
import { ReviewForm } from "../cmps/reviews/review-form"
import { addReview, loadReviews, removeReview } from '../store/actions/review.action'

import imgDef from '../assets/img/default.jpg'
import loader from '../assets/img/loader.gif'
import { utilService } from "../services/util.service"

export const ToyDetails = () => {
    const { reviews } = useSelector((storeState) => storeState.reviewModule)

    const [toy, setToy] = useState(null)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        loadToy()
    }, [params.toyId])

    const loadToy = async () => {
        const toyId = params.toyId
        if (!toyId) return navigate('/toy')

        const toy = await toyService.getById(toyId)
        if (!toy) return navigate('/toy')
        setToy(toy)
    }

    const onRemoveReview = (reviewId) => {
        showSuccessMsg('Review removed')
        dispatch(removeReview(reviewId))
    }

    const onAddReview = async ({ rate, content }) => {
        dispatch(addReview({ rate, content, aboutToyId: toy._id }))
        dispatch(loadReviews({ aboutToyId: toy._id }))
    }

    if (!toy) return <div className="loader-container">
        <img src={loader}></img></div>

    const stockDesc = toy.inStock ? '' : 'Not '
    const color = toy.inStock ? 'green' : 'red'
    const labels = toy.labels ? toy.labels.join(', ') + '.' : 'No labels specified'
    const loggedInUser = userService.getLoggedinUser()
    return (
        <section className="details-page-container">
            <Link className='back-btn' to={'/toy'}> Back </Link>
            <div className="details-section">
                <div className="reviews-container"><h1>Reviews:</h1>
                    <ReviewForm onAddReview={onAddReview} />
                    <ToyReview reviews={reviews} loggedInUser={loggedInUser} onRemoveReview={onRemoveReview} />
                </div>
                <div className="details-container">
                    <h1>{toy.name.length > 20 ? toy.name.substring(0, 15) + '...' : toy.name}</h1>
                    <h3>${toy.price}</h3>
                    <p><strong>author: </strong>{toy.author}</p>
                    <h4>Labels:{labels}</h4>
                    <h4 style={{ color }}>{stockDesc}in stock</h4>
                    <img src={toy.src || imgDef}></img>
                    <p><strong>Uploaded site: </strong>{utilService.dateToString(toy.createdAt)}</p>
                </div>
            </div>
            <div className="toogle__modal">
                <ToogleChat toy={toy} />
            </div>
        </section>
    )

}