import React from 'react'


export function ToyReview({ reviews, loggedInUser, onRemoveReview }) {
    if (!reviews) return <></>
    if (reviews.length === 0) return <h3>Weite first review!</h3>

       const createdAt = Date.now()
    const getStarsStr = (count) => {
        const str = count === 0 ?
            '-no rate specified-' : String.fromCharCode(9733).repeat(count)
        return str
    }
    return (
        <div className="toy-reviews">
            {reviews.map(review =>
                <div key={review._id} className="toy-review" >
                    <div>
                        <strong>Rate:{" "}</strong>
                        {getStarsStr(review.rate)}
                    </div>
                    <div>
                        <strong>Posted by:{" "}</strong>
                        {review.byUser.username}
                    </div>
                    <p className="content">
                        <strong>Content:{" "}</strong>
                        {review.content}
                    </p>
                    {(!loggedInUser?.isAdmin || loggedInUser?._id === review.byUser._id)
                        && <button className='delete-btn'
                            onClick={() => onRemoveReview(review._id)}>
                            &times;
                        </button>
                    }
                </div>
            )}
        </div>
    )
}