import React, { useState } from 'react'
import { ChatApp } from './chat-app'
import { AiFillWechat } from 'react-icons/ai';

export const ToogleChat = ({ toy }) => {
    const [isOpenModal, setIsOpenModal] = useState(false)

    const onToggleModal = () => {
        setIsOpenModal(!isOpenModal)
    }

    return (
        <div>
            <span
                className={`${isOpenModal ? 'toggle-icon stop' :'toggle-icon slide-in-right'}`}
                onClick={onToggleModal} >
                <AiFillWechat className='wobble-hor-bottom' />
            </span> 
            {isOpenModal && <div className='chat-container-open'>
                <ChatApp toy={toy} onToggleModal={onToggleModal} />
            </div>
            }
        </div >
    )
}

