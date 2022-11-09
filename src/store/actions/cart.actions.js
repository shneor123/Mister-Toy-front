import { cartService } from "../../services/cart.service";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { socketService } from "../../services/socket.service";

export function getActionRemoveCart(cartId) {
    return {
        type: 'REMOVE_CART',
        cartId
    }
}
export function getActionAddCart(cart) {
    return {
        type: 'ADD_CART',
        cart
    }
}
export function getActionUpdateCart(cart) {
    return {
        type: 'UPDATE_CARTS',
        cart
    }
}
export function getActionSetCart(cart) {
    return {
        type: 'SET_CARTS',
        cart
    }
}


export function loadCarts() {
    return async (dispatch) => {
        try {
            await cartService.query()
            dispatch(getActionSetCart())
            showSuccessMsg('Cart query')
            console.log('cart query successfully');
        } catch (err) {
            console.error('Error:', err)
            showErrorMsg('Cannot load toys')
        }
    }
}


export function removeCart(cartId) {
    return async (dispatch) => {
        try {
            await cartService.remove(cartId)
            dispatch({ type: 'REMOVE_CART', cartId })
            showSuccessMsg('Cart removed')
            console.log('cart removed successfully');
        } catch (err) {
            showErrorMsg('Cannot remove cart')
            console.log('Cannot remove cart', err)
        }
    }
}

export function addToy(cart) {
    return (dispatch) => {
        cartService.save(cart)
            .then(savedCart => {
                dispatch(getActionAddCart(savedCart))
                socketService.emit('toy-saved')
                showSuccessMsg('Cart saved')
            })
            .catch(err => {
                console.log('Cannot add cart', err)
                showErrorMsg('Cannot save cart')
            })
    }
}

export function updateCart(cart) {
    return (dispatch) => {
        cartService.save(cart)
            .then(savedCart => {
                dispatch(getActionUpdateCart(savedCart))
                showSuccessMsg('Cart saved')
            })
            .catch(err => {
                console.log('Cannot save cart', err)
                showErrorMsg('Cannot save cart')
            })
    }
}