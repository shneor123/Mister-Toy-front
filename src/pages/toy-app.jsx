import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { DragDropContext } from 'react-beautiful-dnd'
import { AiOutlineSearch } from "react-icons/ai"

import { Toylist } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { CartApp } from '../general/cart-app'
import { Loader } from "../general/loader"

import { userService } from '../services/user.service'
import { showSuccessMsg } from '../services/event-bus.service'

import { loadToys, setFilter } from '../store/actions/toy.actions'
import { addToCart, clearCart, removeFromCart } from '../store/actions/cart.actions'

export const ToyApp = () => {
  const { toys } = useSelector((storeState) => storeState.toyModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const [characters, updateCharacters] = useState()
  const [toggleShow, setToggleShow] = useState(false)
  const [isOpenCard, setIsOpenCard] = useState(true)
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
    onLoadToys()
  }, [])

  const onLoadToys = () => {
    dispatch(loadToys())
  }

  const onChangeFilter = (filterBy) => {
    dispatch(setFilter(filterBy))
    dispatch(loadToys())
  }

  const onDragEnd = (result) => {
    if (!result.destination) return
    const items = characters
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    updateCharacters(items)
  }

  const onAddToCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id)
    if (exist) {
      dispatch(addToCart(setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x))))
    } else {
      dispatch(addToCart(setCartItems([...cartItems, { ...product, qty: 1 }])))
      showSuccessMsg(`Added ${product.name} to Cart`)
    }
  }
  const onRemoveCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id)
    if (exist.qty === 1) {
      dispatch(removeFromCart(setCartItems(cartItems.filter((x) => x._id !== product._id))))
      showSuccessMsg(`Removed ${product.name} From Cart`)
    } else {
      dispatch(removeFromCart(setCartItems(cartItems.map((x) => x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x))))
    }
  }
  const onClearCart = (productToRemove) => {
    dispatch(clearCart(setCartItems(cartItems.filter(product => product._id === productToRemove))))
    showSuccessMsg('Clear all cart successfully')
  }
  const onToggleCard = () => {
    setIsOpenCard(!isOpenCard)
  }


  const loggedInUser = userService.getLoggedinUser()
  if (!toys) return <Loader />
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <section className='toy-app'>
          <div>
            <p className="upper-side-menu ">
              <button onClick={() => setToggleShow(!toggleShow)}
                className="btn-opt"><AiOutlineSearch /> Filter cards</button>
            </p>
            {toggleShow && <div className='filter-open'><ToyFilter onChangeFilter={onChangeFilter} /></div>}
            {(loggedInUser?.isAdmin) && <Link to={'/toy/edit'}><span className='add-btn'>Add New Toy</span></Link>}
          </div>
          {toys && <Toylist
            // toys={characters}
            toys={toys}
            cartItems={cartItems}
            onAddToCart={onAddToCart}
            onRemoveCart={onRemoveCart}
            onToggleCard={onToggleCard}
          />
          }
          {cartItems.length !== 0 && (<>
            <button onClick={onToggleCard} className='btn-svg'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
              <span className='shop-icon' style={{ display: 'block' }}>{cartItems.length}</span>
            </button>
            {isOpenCard && <div className='slide-in-right'>
              {user.isAdmin && <button className="admin-clear-cart " onClick={onClearCart}>Clear Cart</button>}
              <CartApp
                cartItems={cartItems}
                onAddToCart={onAddToCart}
                onRemoveCart={onRemoveCart}
                onToggleCard={onToggleCard}
                onClearCart={onClearCart}
              />
            </div>
            }
          </>)}
        </section>
      </DragDropContext>
    </>
  )
}