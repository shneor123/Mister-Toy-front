import { storageService } from './async-storage.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
}



function getUsers() {
    return storageService.get('user')
}


async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}

async function login(credentials) {
    const user = await storageService.post(STORAGE_KEY_LOGGEDIN_USER, credentials)
    if (user) {
        saveLocalUser(user)
        return user
    }
}

async function signup(credentials) {
    const user = await storageService.post(STORAGE_KEY_LOGGEDIN_USER, credentials)
    saveLocalUser(user)
    return user
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return await storageService.post(STORAGE_KEY_LOGGEDIN_USER)
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



