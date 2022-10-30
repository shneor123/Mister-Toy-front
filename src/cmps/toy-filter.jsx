import React, { useState, useRef } from 'react'
import { useForm } from '../hooks/useForm'

export const ToyFilter = (props) => {
    const [isLabels, setIsLables] = useState(false)
    const [filterBy, handleChange, setFilterBy] = useForm({
        name: '',
        inStock: '',
        labels: '',
        sort: '',
        pageIdx: 0,
    }, submitFilter)

    const inputRef = useRef(null);
    function submitFilter() {
        props.onChangeFilter(filterBy)
    }

    console.log(filterBy);
    const { name, labels, inStock, sort } = filterBy
    const allLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor']

    return (
        <section className='toy-filter'>

            <h3>Filter By: </h3>
            <div className="toy-filter-opts">
                <select name="inStock" id="inStock" onChange={handleChange}>
                    {/* <option checked={inStock === 'all'} value={'all'}>All</option> */}
                    <option checked={inStock === 'yes'} value={'yes'}>In-stuck</option>
                    <option checked={inStock === 'no'} value={'no'}>Not-in-stock</option>
                </select>
                <div onClick={() => setIsLables(!isLabels)} className="labels-contianer">
                    <input type="text" placeholder='Filter by labels' disabled className='disabeld-inp' value={labels} />
                    <svg className='svg' width='24' height='24' role='presentation' focusable='false' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><path d='M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z' fill='currentColor'></path></svg>
                    {isLabels && <>
                        <select name='labels' className='filter-labels' multiple onChange={handleChange} >
                            <option value='all'>All</option>
                            {allLabels.map(label =>
                                <option key={label} value={label}>{label}</option>
                            )}
                        </select>
                        <div onClick={() => setIsLables(!isLabels)} className='toggle-visable'></div>
                    </>
                    }
                </div>
                <input type="text" placeholder="Search by toy name" name="name"
                    value={name} onChange={handleChange} ref={inputRef} autoComplete='off' />

                <div className='sortBy sort'>
                    <strong>Sort By:</strong>
                    <select name="sort" id="sort" onInput={handleChange}>
                        <option checked={sort === 'created'} value={'created'}>Posted At</option>
                        <option checked={sort === 'name'} value={'name'}>Name</option>
                        <option checked={sort === 'price'} value={'price'}>Price</option>
                    </select>
                </div>
            </div>
        </section>
    )
}

{/* <div className="page-btns">
    <button type='button' className='btn-classic' onClick={() => setPage(false)}>Prev Page</button>
    <button type='button' className='btn-classic' onClick={() => setPage(true)}>Next Page</button>
</div> */}