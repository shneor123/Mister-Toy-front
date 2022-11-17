import { reviewService } from '../../services/review.service'


export function getActionAddReview(review) {
  return { type: 'ADD_REVIEW', review }
}

export function getActionRemoveReview(reviewId) {
  return { type: 'REMOVE_REVIEW', reviewId }
}
let subscriber

export function loadReviews(filterBy) {
  return async (dispatch) => {
    try {
      const reviews = await reviewService.query(filterBy)
      dispatch({ type: 'SET_REVIEWS', reviews })

      if (subscriber) reviewService.unsubscribe(subscriber)
      subscriber = (ev) => {
        // console.log('Got notified', ev.data)
        // dispatch(ev.data)
      }
      reviewService.subscribe(subscriber)
    } catch (err) {
      console.log('ReviewActions: err in loadReviews', err)
    }
  }
}

export function addReview(review) {
  return async (dispatch) => {
    try {
      const addedReview = await reviewService.add(review)
      dispatch(getActionAddReview(addedReview))
      const {score} = addedReview.byUser
      // userService.saveLocalUser(addedReview.byUser)
      dispatch({ type: 'SET_SCORE', score })
    } catch (err) {
      console.log('Error:', err)
    }
  }
}

export function removeReview(reviewId) {
  return async dispatch => {
    try {
      await reviewService.remove(reviewId)
      dispatch(getActionRemoveReview(reviewId))
    } catch (err) {
      console.log('Error:', err)
    }
  }
}