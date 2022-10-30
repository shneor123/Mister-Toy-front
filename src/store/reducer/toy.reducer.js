const initialState = {
    toys: [],
    filterBy: {
        name: '',
        inStock: '',
        labels: '',
    }
}



export function toyReducer(state = initialState, action) {
    var newState = state
    var toys
    switch (action.type) {

        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break

        case 'REMOVE_TOY':
            const lastRemovedToy = state.toys.find(toy => toy._id === action.toyId)
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            newState = { ...state, toys, lastRemovedToy }
            break

        case 'ADD_TOY':
            newState = { ...state, toys: [...state.toys, action.toy] }
            break

        case 'UPDATE_TOYS':
            toys = state.toys.map(toy => (toy._id === action.toy._id) ? action.toy : toy)
            newState = { ...state, toys }
            break

        case 'SET_FILTERBY':
            newState = { ...state, filterBy: { ...action.filterBy } }
        default:
    }

    // For debug:
    // window.carState = newState
    // console.log('Prev State:', state)
    // console.log('Action:', action)
    // console.log('New State:', newState)
    return newState
}