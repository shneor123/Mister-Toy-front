import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { socketService, } from './socket.service'
import { showSuccessMsg } from '../services/event-bus.service'


const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const AUTH_ENDPOINT = 'auth'

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
    changeScore
}


async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function getUsers() {
    return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get('user', userId)
    return user
}


async function remove(userId) {
    // return storageService.remove('user', userId)
    const user = await httpService.delete(`user/${userId}`)
    return user
}



async function update(user) {
    await storageService.put('user', user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(user)
    return user;
}


async function login(userCred) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/login`, userCred)
    if (user) {
        socketService.login(user._id)
        return saveLocalUser(user)
    }
}

async function signup(userCred) {
    const user = await httpService.post(`${AUTH_ENDPOINT}/signup`, userCred)
    socketService.login(user._id)
    return saveLocalUser(user)
}


async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    socketService.logout()
    return await httpService.post(`${AUTH_ENDPOINT}/logout`)
}

function saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}



// ;(async ()=>{
//     await userService.login({fullname: 'Puki Norma', username: 'user1', password:'123',score: 10000, isAdmin: false})
//     await userService.login({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.login({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()