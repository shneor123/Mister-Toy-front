import { toyService } from "../../services/toy.service";
import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service";
import { socketService } from "../../services/socket.service";

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
export function getActionSetToy(toy) {
    return {
        type: 'SET_TOY',
        board: toy
    }
}


export function loadToys() {
    return (dispatch, getState) => {
        const filterBy = getState().toyModule.filterBy
        return toyService.query(filterBy)
            .then(toys => {
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
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
                dispatch({
                    type: 'SET_MSG',
                    msg: { type: 'success', txt: 'Toy saved' }
                })
                socketService.emit('toy-saved')
                // showSuccessMsg('Toy saved')
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



export function handleDrag(
    toy,
    droppableIdStart,
    droppableIdEnd,
    droppableIndexStart,
    droppableIndexEnd,
    type
) {
    console.log('toy start', toy.id);
    return async dispatch => {
        if (type === 'toy') {
            // take out group from old index
            const group = toy.splice(droppableIndexStart, 1);
            // insert group to new index
            toy.splice(droppableIndexEnd, 0, ...group);
        } else {
            // Moving task in the same group
            if (droppableIdStart === droppableIdEnd) {
                const group = toy.find(group => group._id === droppableIdStart);
                const task = group.splice(droppableIndexStart, 1);
                group.splice(droppableIndexEnd, 0, ...task);
            } else {
                // Moving task between differents groups // CR: also refactor name
                // if (droppableIdStart !== droppableIdEnd) {
                // Find the group where drag happened
                const groupStart = toy.find(group => group._id === droppableIdStart);

                // Pull out task from this group
                const task = groupStart.splice(droppableIndexStart, 1);

                // Find the group where drag ended
                const groupEnd = toy.find(group => group._id === droppableIdEnd);

                // Put the task in the new group
                groupEnd.splice(droppableIndexEnd, 0, ...task);
            }
            // }
        }
        console.log(toy.id);
        const saveToy = await toyService.save(toy);

        dispatch({
            type: 'SAVE_TOYS',
            toy: saveToy,
        });
    };
}


export function saveBg(toy, color) {
    return async (dispatch) => {
        try {
            const savedToy = await toyService.getById(toy._id)
            savedToy.style.background = color
            toyService.save(savedToy)
                .then(toys => {
                    dispatch(getActionUpdateToy(toys))
                    showSuccessMsg('Toy saved')
                })
        } catch (err) {
            console.log('err in saving task')
            showErrorMsg('Cannot save toy')
        }
    }
}
