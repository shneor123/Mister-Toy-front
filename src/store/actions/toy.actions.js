import { toyService } from "../../services/toy.service";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { socketService } from "../../services/socket.service";

//Action
export function getActionRemoveToy(toyId) {
    return {
        type: 'REMOVE_TOY',
        toyId
    }
}
export function getActionAddToy(toy) {
    return {
        type: 'ADD_TOY',
        toy
    }
}
export function getActionUpdateToy(toy) {
    return {
        type: 'UPDATE_TOYS',
        toy
    }
}


export function loadToys() {
    return (dispatch, getState) => {
        const filterBy = getState().toyModule.filterBy
        return toyService.query(filterBy)
            .then(toys => {
                dispatch({ type: 'SET_TOYS', toys })
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Cannot load toys')
            })
    }
}

export function removeToy(toyId) {
    return async (dispatch) => {
        try {
            await toyService.remove(toyId)
            dispatch(getActionRemoveToy(toyId))
            showSuccessMsg('Toy removed')
            console.log('toy removed successfully');
        } catch (err) {
            showErrorMsg('Cannot remove toy')
            console.log('Cannot remove toy', err)
        }
    }
}

export function addToy(toy) {
    return (dispatch) => {
        toyService.save(toy)
            .then(savedToy => {
                dispatch(getActionAddToy(savedToy))
                socketService.emit('toy-saved')
                showSuccessMsg('Toy addd')
            })
            .catch(err => {
                console.log('Cannot add toy', err)
                showErrorMsg('Cannot save toy')
            })
    }
}

export function updateToy(toy) {
    return (dispatch) => {
        toyService.save(toy)
            .then(savedToy => {
                dispatch(getActionUpdateToy(savedToy))
                showSuccessMsg('Toy saved')
            })
            .catch(err => {
                console.log('Cannot save toy', err)
                showErrorMsg('Cannot save toy')
            })
    }
}

export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}