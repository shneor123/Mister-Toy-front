import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";

import { CartApp } from './cart-app'
import { Toylist } from '../cmps/toy-list'
import { ToyFilter } from '../cmps/toy-filter'
import { userService } from '../services/user.service'
import { loadToys, removeToy, setFilter } from '../store/actions/toy.actions'
import { Button } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';

export const ToyApp = () => {
  const { toys } = useSelector((storeState) => storeState.toyModule)
  const { user } = useSelector((storeState) => storeState.userModule)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isOpenCard, setIsOpenCard] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onToggleModal = () => {
    setIsOpenModal(!isOpenModal)
  }
  const onToggleCard = () => {
    setIsOpenCard(!isOpenCard)
  }

  useEffect(() => {
    if (!user) navigate('/login')
    onLoadToys()
  }, [])

  const onLoadToys = () => {
    dispatch(loadToys())
  }

  const onRemoveToy = (toyId) => {
    dispatch(loadToys())
    dispatch(removeToy(toyId))
  }

  const onChangeFilter = (filterBy) => {
    dispatch(setFilter(filterBy))
    dispatch(loadToys())
  }

  const onAddCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist) {
      setCartItems(cartItems.map((x) =>
        x._id === product._id ? { ...exist, qty: exist.qty + 1 } : x))
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  const onRemoveCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  }

  const clearCart = (productToRemove) => {
    setCartItems(cartItems.filter(product => product._id === productToRemove))
  }

  const [characters, updateCharacters] = useState(toys);
  console.log(characters);

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
}


const loggedInUser = userService.getLoggedinUser()
if (!toys) return <>Loading...</>
return (
  <section className='toy-app'>
    <div>
      <section className="upper-side-menu ">
        <button onClick={onToggleModal} className="btn-opt"><AiOutlineSearch /> Filter cards</button>
      </section>

      {
        isOpenModal && <div className='filter-open slide-in-left '>
          <ToyFilter onChangeFilter={onChangeFilter} />
        </div>
      }

      {(loggedInUser?.isAdmin) && <Link to={'/toy/edit'}><span className='add-btn'>Add New Toy</span></Link>}
    </div>
    <DragDropContext onDragEnd={handleOnDragEnd}>

      <Toylist
        toys={characters}
        onRemoveToy={onRemoveToy}
        onAddCart={onAddCart}
        onRemoveCart={onRemoveCart}
      />
    </DragDropContext>
    {cartItems.length !== 0 && (<>
      <Button onClick={onToggleCard} className='btn-svg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" /></svg>
        <span className='shop-icon' style={{ display: 'block' }}>{cartItems.length}</span>
      </Button>
      {isOpenCard && <div className='slide-in-right'>
        {user.isAdmin && <button className="admin-clear-cart " onClick={clearCart}>Clear Cart</button>}

        <CartApp
          cartItems={cartItems}
          onAddCart={onAddCart}
          onRemoveCart={onRemoveCart}
          onToggleCard={onToggleCard}
          clearCart={clearCart}
        />
      </div>
      }</>)}
  </section>
)
}