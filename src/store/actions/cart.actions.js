import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { userService } from "../../services/user.service";

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

export function checkout() {
    return async (dispatch, getState) => {
        try {
            // const state = getState()
            // const total = getState().toyModule.toy.reduce((acc, toy) => acc + toy.price, 0)
            // const total = getState().toyModule.cart.reduce((a, c) => a + c.qty * c.price, 0)

            const score = await userService.changeScore(getState().toyModule.cart.reduce((acc, toy) => acc + toy.price, 0))
            dispatch({ type: 'SET_SCORE', score })
            dispatch({ type: 'CLEAR_CART' })
            showSuccessMsg('Charged you: $' + score.toLocaleString())
        } catch (err) {
            showErrorMsg('Cannot checkout, login first')
            console.log('CarActions: err in checkout', err)
        }
    }
}
