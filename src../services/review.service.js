import { httpService } from './http.service'
import { getActionRemoveReview, getActionAddReview } from '../store/actions/review.action.js'


const reviewChannel = new BroadcastChannel('reviewChannel')

export const reviewService = {
  add,
  query,
  remove,
  subscribe,
  unsubscribe,
}


function query(filterBy) {
  const queryStr = (!filterBy) ? '' : `?byUserId=${filterBy.byUserId || ''}&aboutToyId=${filterBy.aboutToyId || ''}`
  return httpService.get(`review${queryStr}`)
  // return storageService.query('review')
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
  reviewChannel.postMessage(getActionRemoveReview(reviewId))
}

async function add(review) {
  const addedReview = await httpService.post('review', review)

  // review.byUser = userService.getLoggedinUser()
  // review.aboutUser = await userService.getById(review.aboutUserId)
  // const addedReview = await storageService.post('review', review)

  reviewChannel.postMessage(getActionAddReview(addedReview))
  return addedReview
}

function subscribe(listener) {
  reviewChannel.addEventListener('message', listener)
}

function unsubscribe(listener) {
  reviewChannel.removeEventListener('message', listener)
}