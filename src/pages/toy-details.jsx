import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AiFillWechat } from 'react-icons/ai'

import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"
import { showSuccessMsg } from "../services/event-bus.service"

import { ToyReview } from "../cmps/reviews/toy-review"
import { ReviewForm } from "../cmps/reviews/review-form"
import { addReview, loadReviews, removeReview } from '../store/actions/review.action'

import { ChatApp } from "../cmps/chat-app"
import { Loader } from "../general/loader"

import imgDef from '../assets/img/default.jpg'
import imgSale from '../assets/img/sale-1.jpeg'


export const ToyDetails = () => {
    const { reviews } = useSelector((storeState) => storeState.reviewModule)
    const [toggleShow, setToggleShow] = useState(false)
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toyId } = useParams()

    const onToogleShow = () => {
        setToggleShow(!toggleShow)
    }
    useEffect(() => {
        loadToy()
    }, [toyId])

    const loadToy = async () => {
        if (!toyId) return navigate('/toy')
        const toy = await toyService.getById(toyId)
        if (!toy) return navigate('/toy')
        setToy(toy)
    }

    const onRemoveReview = (reviewId) => {
        dispatch(removeReview(reviewId))
        showSuccessMsg('Review removed')
    }

    const onAddReview = async ({ rate, content }) => {
        dispatch(addReview({ rate, content, aboutToyId: toy._id }))
        dispatch(loadReviews({ aboutToyId: toy._id }))
        showSuccessMsg('Review added')
    }

    if (!toy) return <Loader />
    const stockDesc = toy.inStock ? '' : 'Not '
    const color = toy.inStock ? 'green' : 'red'
    const labels = toy.labels ? toy.labels.join(', ') + '.' : 'No labels specified'
    const loggedInUser = userService.getLoggedinUser()
    return (
        <section className="details-page-container">
            <Link className='back-btn' to={'/toy'}> Back </Link>
            <div className="details-section">
                <div className="details-container">
                    <div className="container">
                        <h4><strong>Name: </strong>{toy.name.length > 20 ? toy.name.substring(0, 15) + '...' : toy.name}</h4>
                        <p><strong>Price: </strong> ${toy.price}</p>
                        <p><strong>Author: </strong>{toy.author}</p>
                        <img className="img_details" src={toy.price < 60 ? imgSale : ""} alt="" />
                        <h5 style={{ color }}>{stockDesc}in stock</h5>
                        {/* <p className="labels"><strong>Labels: </strong>{labels.length > 30 ? labels.substring(0, 25) + '...' : labels}</p> */}
                        <p><strong>Labels: </strong>{labels}</p>
                        <img src={toy.src || imgDef}></img>
                        <span><strong>Uploaded site: </strong>{utilService.dateToString(toy.createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className="details-section">
                <div className="reviews-container"><h1>Reviews:</h1>
                    <ReviewForm onAddReview={onAddReview} />
                    <ToyReview reviews={reviews} loggedInUser={loggedInUser} onRemoveReview={onRemoveReview} />
                </div>
            </div>
            <div className="toogle__modal">
                <span className={`${toggleShow ? 'toggle-icon stop' : 'toggle-icon slide-in-right'}`}
                    onClick={onToogleShow} ><AiFillWechat className='wobble-hor-bottom' />
                </span>
                {toggleShow && <div className='chat-container-open'><ChatApp toy={toy} onToggleModal={onToogleShow} /></div>}
            </div>
        </section>
    )
}