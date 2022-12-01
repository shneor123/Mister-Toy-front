import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { AiFillWechat } from 'react-icons/ai'

import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { userService } from "../services/user.service"
import { showSuccessMsg } from "../services/event-bus.service"

import { loadToys, removeToy } from "../store/actions/toy.actions"
import { ToyReview } from "../cmps/reviews/toy-review"
import { ReviewForm } from "../cmps/reviews/review-form"
import { addReview, loadReviews, removeReview } from '../store/actions/review.action'

import { ChatApp } from "../cmps/chat-app"
import { Loader } from "../general/loader"

import imgDef from '../assets/img/default.jpg'
import trash from "../assets/img/trash.png"
import edit from "../assets/img/edit.png"

export const ToyDetails = () => {
    const { reviews } = useSelector((storeState) => storeState.reviewModule)
    const [toggleShow, setToggleShow] = useState(false)
    const [toy, setToy] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { toyId } = useParams()

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

    const onRemoveToy = (toyId) => {
        dispatch(removeToy(toyId))
        navigate('/toy')
        dispatch(loadToys())
    }
    const onToogleShow = () => {
        setToggleShow(!toggleShow)
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
                <div className="reviews-container">
                    <h1>Reviews:</h1>
                    <ReviewForm onAddReview={onAddReview} />
                    <ToyReview reviews={reviews} loggedInUser={loggedInUser} onRemoveReview={onRemoveReview} />
                </div>
                <div className="details-container">
                    <p className="name_d"><strong>Name: </strong>{toy.name.length > 20 ? toy.name.substring(0, 15) + '...' : toy.name}</p>
                    <p className="price_d"><strong>Price: </strong>US ${toy.price}</p>
                    <p className="author_d"> <strong>Author: </strong>{toy.author}</p>
                    <p><strong>Labels: </strong>{labels}</p>
                    <h5 style={{ color }}>{stockDesc}in stock</h5>
                    <img src={toy.src || imgDef}></img>
                    <span><strong>Uploaded site: </strong>{utilService.dateToString(toy.createdAt)}</span>

                    <section className="btns-container">
                        {(loggedInUser?.isAdmin) && <>
                            <button onClick={() => onRemoveToy(toy._id)}><img src={trash} /></button>
                            <Link to={`/toy/edit/${toy._id}`}><button><img src={edit}></img></button></Link>
                        </>}
                    </section>
                </div>
                <div className="toogle__modal">
                    <span className={`${toggleShow ? 'toggle-icon stop' : 'toggle-icon slide-in-right'}`}
                        onClick={onToogleShow} ><AiFillWechat className='wobble-hor-bottom' />
                    </span>
                    {toggleShow && <div className='chat-container-open'><ChatApp toy={toy} onToggleModal={onToogleShow} /></div>}
                </div>
            </div>
        </section>
    )
}






