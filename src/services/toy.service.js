import { httpService } from './http.service';
import { storageService } from './async-storage.service';
import { utilService } from './util.service';
import axios from 'axios'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}
window.cs = toyService;
const BASE_URL = (process.env.NODE_ENV == 'production') ? '/api/toy' : '//localhost:3030/api/toy'
const TOY_BASE_ENDPOINT = 'toy'

async function query(filterBy = { name: '', inStock: 'all', labels: [], sort: 'created', pageIdx: 0 }) {
    if (filterBy.labels.length === 7 || filterBy.labels.includes('all')) filterBy.labels = []
    const url = `${BASE_URL}?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}&sortBy=${filterBy.sort}`
    const queryRes = await axios.get(url)
    const toys = queryRes.data
    return toys
}

async function getById(toyId) {
    const toysFromDB = await httpService.get(`${TOY_BASE_ENDPOINT}/${toyId}`)
    return toysFromDB
}

async function remove(toyId) {
    const toysFromDB = await httpService.delete(`${TOY_BASE_ENDPOINT}/${toyId}`)
    return toysFromDB
}

async function save(toy) {
    if (toy._id) {
        const savedToy = await httpService.put(`${TOY_BASE_ENDPOINT}/${toy._id}`, toy)
        return savedToy
    } else {
        try {
            const savedToy = await httpService.post(TOY_BASE_ENDPOINT, toy)
            return savedToy
        } catch (err) {
            console.log(err)
        }
    }
}


function getEmptyToy() {
    return {
        name: '',
        src: '',
        price: '',
        labels: '',
        createdAt: Date.now(),
        inStock: '',
    }
}

// TEST DATA
// storageService.post(STORAGE_KEY,{_id: utilService.makeId(4),  name: "shneor123",
// price: utilService.getRandomIntInclusive(1000, 9000),labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
// createdAt: Date.now(),inStock: true})

// // TEST DATA
// storageService.post(TOY_BASE_ENDPOINT, {
//     _id: utilService.makeId(4), title: "Tot Demo",
//     isStar: false,
//     createdAt: utilService.makeId(),
//     style: {
//         // backgroundColor: "#026aa7",
//         background: 'url(https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
//     }
// })