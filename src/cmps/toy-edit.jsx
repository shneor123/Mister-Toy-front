import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { toyService } from '../services/toy.service'
import { useForm } from '../hooks/useForm'
import { Loader } from '../general/loader'

export const ToyEdit = () => {

    const [toy, handleChange, setToy] = useForm(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])


    const loadToy = async () => {
        const toyId = params.toyId
        const toy = toyId ?
            await toyService.getById(toyId) :
            toyService.getEmptyToy()
        setToy(toy)
    }


    const onSaveToy = async (ev) => {
        ev.preventDefault()
        await toyService.save({ ...toy })
        navigate('/toy')
    }

    const handleLableChange = ({ target: { value } }) => {
        let currLables = [...toy.labels]
        if (currLables.includes(value)) {
            currLables = currLables.filter(label => {
                return label !== value
            })
        } else {
            currLables.push(value)
        }
        setToy({ ...toy, labels: currLables })
    }


    if (!toy) return <Loader />
    const allLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']

    const { name, price, src, inStock, author } = toy
    return (
        <section className="toy-edit">
            <h2>{toy._id ? 'Edit' : 'Add'} Toy</h2>
            <Link className='back-link' to={`/toy`}>
                <button className='back-btn'>Back</button>
            </Link>

            <form className="edit-container" onSubmit={onSaveToy}>
                <div className="basic-details-container">
                    <label>
                        <h3>Name</h3>
                        <input
                            type="text" name="name" value={name}
                            placeholder="Toy Name" required onChange={handleChange} />
                    </label>
                    <label>
                        <h3>Price</h3>
                        <input
                            type="number" name="price" value={price} min={0}
                            placeholder="Price" required onChange={handleChange} />
                    </label>

                    <label>
                        <h3>Image link</h3>
                        <input
                            type="text" name="src" value={src}
                            placeholder="Link" onChange={handleChange} />
                    </label>
                    <label>
                        <h3>author</h3>
                        <input
                            type="text" name="author" value={author}
                            placeholder="author exmpale (by Wonder House )" onChange={handleChange} />
                    </label>
                </div>

                <div className="stock-labels-container">
                    <label><h3>Is in stock?</h3>
                        <label>Yes
                            <input
                                type="radio" name="inStock" checked={inStock}
                                value={'yes'} onChange={handleChange} />
                        </label>
                        <label> No
                            <input
                                type="radio" name="inStock" checked={!inStock}
                                value={'no'} onChange={handleChange} />
                        </label>
                    </label>

                    <label className="labels">
                        <h3>Labels</h3>
                        {allLabels.map(label =>
                            <label key={label}>
                                <input type="checkbox"
                                    onChange={handleLableChange}
                                    checked={toy.labels?.includes(label)}
                                    value={label}
                                />
                                {label}
                            </label>
                        )}
                    </label>
                </div>
                <button className="save-btn">Save</button>
            </form>
        </section>
    )
}
