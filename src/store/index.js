
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunk from 'redux-thunk'

import { toyReducer } from './reducer/toy.reducer';
import { userReducer } from './reducer/user.reducer';
import { reviewReducer } from './reducer/review.reducer';
// import { cartReducer } from './reducer/cart.reducer';


const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
    reviewModule: reviewReducer,
    // cartModule: cartReducer,


})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))


