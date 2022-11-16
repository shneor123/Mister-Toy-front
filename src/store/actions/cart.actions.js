import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";

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

export function checkout(cartItem) {
    return async (dispatch, getState) => {
        try {
            const state = getState()
            const total = state.toyModule.cart.reduce((acc, car) => acc + car.price, 0)
            dispatch({ type: 'CLEAR_CART' ,cartItem})
            showSuccessMsg('Charged you: $' + total)
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('CarActions: err in checkout', err)
        }
    }
}