import React from 'react'
import { ToyPreview } from './toy-preview'

export function Toylist({ toys, onRemoveToy, onAddCart ,onRemoveCart}) {
    return (
        <section className='toys-list-container'>
            {toys.map((toy) => {
                return (
                    <ToyPreview
                        key={toy._id}
                        toy={toy}
                        toyId={toy._id}
                        onRemoveToy={onRemoveToy}
                        onAddCart={onAddCart}
                        onRemoveCart={onRemoveCart}
                    />
                )
            })}
        </section>
    )
}

