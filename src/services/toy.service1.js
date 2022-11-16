import { storageService } from './async-storage.service'
import { utilService } from './util.service'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
}

window.cs = toyService;

const STORAGE_KEY = 'toy'


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

async function remove(toyId) {
    await storageService.remove(STORAGE_KEY, toyId)
}

async function save(toy) {
    if (toy._id) {
        const savedToy = await storageService.put(STORAGE_KEY, toy)
        return savedToy
    } else {
        try {
            const savedToy = await storageService.post(STORAGE_KEY, toy)
            return savedToy
        } catch (err) {
            console.log(err)
        }
    }
}

function getEmptyToy() {
    return {
        name: 'shneor',
        src: '',
        price: '22',
        labels: '',
        createdAt: Date.now(),
        inStock: 'no'
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY, {
//     _id: utilService.makeId(4), name: "shneor123",
//     price: utilService.getRandomIntInclusive(1000, 9000), labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
//     createdAt: Date.now(),inStock: true
// })


// storageService.post(STORAGE_KEY, ourBoard).then(x => console.log(x))

// // TEST DATA
// storageService.post(STORAGE_KEY, {
//     _id: utilService.makeId(4),  title: "Tot Demo",
//     isStar: false,
//     createdAt: utilService.makeId(),
//     style:{
//         backgroundColor: "#026aa7",
//         background: 'url(https://images.unsplash.com/photo-1604147706283-d7119b5b822c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
//     }
// })