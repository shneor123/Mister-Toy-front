
export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    loadFromStorage,
    saveToStorage

}

function query(entityType, delay = 600) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // reject('OOOOPs')
            resolve(entities)
        }, delay)
    })
    // return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}

async function post(entityType, newEntity) {
    try {
        newEntity._id = _makeId()
        const entities = await query(entityType)
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    } catch (err) {
        console.log(err);
    }
}

function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId)
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}



function _makeId(length = 5) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function saveToStorage(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function loadFromStorage(key) {
    const val = localStorage.getItem(key);
    return JSON.parse(val);
}