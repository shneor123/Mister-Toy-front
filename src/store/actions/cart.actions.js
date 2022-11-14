import { cartService } from "../../services/cart.service";
import { showErrorMsg } from "../../services/event-bus.service";

export function removeFromCart(toyId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            toyId
        })
    }
}

export function addToCart(toy) {
    return (dispatch) => {
        cartService.save(toy)
            .then(savedToy => {
                dispatch({
                    type: 'ADD_TO_CART',
                    savedToy
                })

            })
    }
}
export function clearCart(cart) {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR_CART',
            cart
        })
    }
}

// return function dispatch => {
//     try {
//         dispatch({ type: 'CLEAR_CART' })
//     } catch (err) {
//         showErrorMsg('Cannot checkout, login first')
//         console.log('CarActions: err in checkout', err)
//     }
// }