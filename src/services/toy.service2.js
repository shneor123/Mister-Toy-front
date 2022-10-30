import { storageService } from './async-storage.service'

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
        name: '',
        src: '',
        price: '',
        labels: '',
        createdAt: '',
        inStock: ''
    }
}
// TEST DATA
// storageService.post(STORAGE_KEY,{_id: utilService.makeId(4),  name: "shneor123",
// price: utilService.getRandomIntInclusive(1000, 9000),labels: ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor"],
// createdAt: Date.now(),inStock: true})