const initialState = {
    cart: [],
    cartItems: []
}

export function cartReducer(state = initialState, action) {
    var newState = state
    var cart
    switch (action.type) {
        case 'ADD_TO_CART':
            newState = { ...state, cart: [...state.cart, action.cart] }
            break
            
        case 'REMOVE_FROM_CART':
            cart = state.cart.filter(cart => cart !== action.cartId)
            newState = { ...state, cart }
            break

        case 'CLEAR_CART':
            newState = { ...state, cart: [] }
            break
        default:
    }

    // For debug:
    // window.carState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState
}