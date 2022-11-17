import React from 'react'

export const AppFooter = ({ setIsOpenCard, isOpenCard, cartItems }) => {
    return (
        <section className='app-footer'>
            {cartItems.length > 0 &&
                <h5>
                    <span>{cartItems.length}</span> Products in your Cart{" "}
                    <button className="btn-link" onClick={(ev) => {
                        ev.preventDefault();
                        setIsOpenCard(!isOpenCard)
                        window.scroll(0, 0)
                    }}>
                        {(isOpenCard) ? 'hide' : 'show'}
                    </button>
                </h5>
            }
        </section>
    )
}
