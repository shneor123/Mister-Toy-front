import { storageService } from './async-storage.service'

export const cartService = {
    query,
    getById,
    save,
    remove,
}

window.cs = cartService;

const STORAGE_KEY = 'toy'


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(cartId) {
    return storageService.get(STORAGE_KEY, cartId)
}

async function remove(cartId) {
    await storageService.remove(STORAGE_KEY, cartId)
}

async function save(cart) {
    const exist = cart._id
    if (exist) {
        const savedCart = await storageService.put(STORAGE_KEY, cart)
        console.log('save');
        return savedCart
    } else {
        try {
            const savedCart = await storageService.post(STORAGE_KEY, cart)
            console.log('no save');
            return savedCart
        } catch (err) {
            console.log(err)
        }
    }
}
