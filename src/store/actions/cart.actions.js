import { cartService } from "../../services/cart.service";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";


export function removeFromCart(cartId) {
    return (dispatch) => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            cartId
        })
    }
}

export function addToCart(cart) {
    return (dispatch) => {
        dispatch({
            type: 'ADD_TO_CART',
            cart
        })
    }
}
export function clearCart(cart) {
    return (dispatch) => {
        dispatch({
            type: 'CLEAR_CART',
            cart
        })
    }
}





// export function checkout() {
//     return async (dispatch, getState) => {
//         try {
//             const state = getState()
//             const total = state.carModule.cart.reduce((acc, car) => acc + car.price, 0)
//             // const score = await userService.changeScore(-total)
//             dispatch({ type: 'SET_SCORE', score })
//             dispatch({ type: 'CLEAR_CART' })
//             showSuccessMsg('Charged you: $' + total.toLocaleString())
//         } catch (err) {
//             showErrorMsg('Cannot checkout, login first')
//             console.log('CarActions: err in checkout', err)
//         }
//     }
// }