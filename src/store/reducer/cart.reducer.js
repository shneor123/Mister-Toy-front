const initialState = {
    carts: [],
}

export function cartReducer(state = initialState, action) {
    var newState = state
    var carts
    switch (action.type) {
        case 'SET_CARTS':
            newState = { ...state, carts: action.carts }
            break

        case 'REMOVE_CART':
            const exist = state.carts.find(cart => cart._id === action.cartId)
            if (exist.qty === 1) {
                carts = state.carts.filter(cart => cart._id !== action.cartId)
            } else {
                carts = state.carts.map((cart) =>
                    cart._id === cart._id ? { ...exist, qty: exist.qty - 1 } : cart)
            }
            newState = { ...state, carts, exist }
            break

        case 'ADD_CART':
            newState = { ...state, carts: [...state.carts, action.cart] }
            break

        case 'UPDATE_CARTS':
            carts = state.carts.map(cart => (cart._id === action.cart._id) ? action.cart : cart)
            newState = { ...state, carts }
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