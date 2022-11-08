import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showSuccessMsg } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'
import { loadReviews, removeReview } from '../../store/actions/review.action'

export const ReviewsInfo = (props) => {
    const { reviews } = useSelector((storeState) => storeState.reviewModule)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(loadReviews(null))
    }, [])

    const getStarsStr = (count) => {
        const str = count === 0 ?
            '-no rate specified-' : String.fromCharCode(9733).repeat(count)
        return str
    }
    const onRemoveReview = (reviewId) => {
        showSuccessMsg('Review removed')
        dispatch(removeReview(reviewId))
    }
    // console.log(reviews)
    if (!reviews) return <></>
    if (reviews.length === 0) return <h3> Waiting for the first reviews!</h3>
    // const { createdAt } = props.reviews
    return (
        <section className="reviews-container">
            <div className="review-inf">reviews: {reviews.length}</div>
            <div className="toy-reviews">
                <h2>Reviews:</h2>
                {reviews.map((review) =>
                    <div key={review._id} className="toy-review" >

                        <div>
                            <strong>Rate:{" "}</strong>
                            {getStarsStr(review.rate)}
                        </div>
                        <div>
                            <strong>Posted by:{" "}</strong>
                            <Link to={'/users'}>
                                {review.byUser.username}
                            </Link>
                        </div>
                        <p className="content">
                            <strong>Content:{" "}</strong>
                            {review.content}
                        </p>
                        <p className='since-review'>
                            <strong>since:{" "}</strong>
                            {utilService.makeId(review.createdAt)}
                        </p>
                        {(!props.loggedInUser?.isAdmin || props.loggedInUser?._id === review.byUser._id)
                            && <button className='delete-btn'
                                onClick={() => onRemoveReview(review._id)}>
                                &times;
                            </button>
                        }
                    </div>
                )}

            </div>
        </section>

    )
}
