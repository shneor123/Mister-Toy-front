let initialState = {}

initialState = {
    users: [],
    user:null,
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    var newState = state;
    var user
    switch (action.type) {
        case 'SET_USER':
            newState = { ...state, user: action.user }
            break;

        case 'SET_WATCHED_USER':
            newState = { ...state, watchedUser: action.user }
            break;

        case 'REMOVE_USER':
            newState = {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
            break;

        case 'SET_USERS':
            newState = { ...state, users: action.users }
            break;

        case 'SET_SCORE':
            newState = { ...state, user: { ...state.user, score: action.score } }
            break;

        default:
    }
    // For debug:
    // window.userState = newState;
    // console.log('State:', newState);

    return newState;
}
