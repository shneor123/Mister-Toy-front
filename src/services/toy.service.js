import { httpService } from './http.service';
import axios from 'axios'
import { storageService } from './async-storage.service';

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    changeBgc
}
window.cs = toyService;
const BASE_URL = (process.env.NODE_ENV == 'production') ? '/api/toy' : '//localhost:3030/api/toy'
const TOY_BASE_ENDPOINT = 'toy'




async function query(filterBy = { name: '', inStock: 'all', labels: [], sort: 'created' }) {
    if (filterBy.labels.length === 7 || filterBy.labels.includes('all')) filterBy.labels = []
    const url = `${BASE_URL}?name=${filterBy.name}&inStock=${filterBy.inStock}&labels=${filterBy.labels}&sortBy=${filterBy.sort}`
    const queryRes = await axios.get(url)
    const toys = queryRes.data
    return toys
}

function changeBgc(toyId, color) {
    const toys = storageService.query()
    const toy = toys.find(toy => toy._id === toyId)
    toy.style.backgroundColor = color
    storageService.saveToStorage(toys)
    return Promise.resolve(toy)
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