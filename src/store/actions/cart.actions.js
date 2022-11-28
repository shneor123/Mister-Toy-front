import { showErrorMsg } from "../../services/event-bus.service";

export function addToCart(toy) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            toy
        })
    }
}

export function removeFromCart(toyId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            toyId
        })
    }
}
export function clearCart(toy) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CART',
            toy
        })
    }
}

export function Checkout() {
    return async (dispatch) => {
        try {
            dispatch({ type: 'CLEAR_CART' })
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('CarActions: err in checkout', err)
        }
    }
}

