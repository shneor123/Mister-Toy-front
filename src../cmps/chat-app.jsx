import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EVENT_SAVE_CHAT_HISTORY, SOCKET_EVENT_TYPING } from '../services/socket.service'
import { GrClose } from 'react-icons/gr'
import { useDispatch } from 'react-redux'
import { addToy } from '../store/actions/toy.actions'
import { utilService } from '../services/util.service'


export const ChatApp = (props) => {
    const dispatch = useDispatch()

    const [msg, setMsg] = useState({ txt: '' })
    const [msgs, setMsgs] = useState([])
    const [isBotMode, setIsBotMode] = useState(false)
    const [typing, setTyping] = useState(null)
    const { user } = useSelector((storeState) => storeState.userModule)


    let timeout
    let typingTimeOutId = useRef()
    const msgsContainerRef = useRef()

    useEffect(() => {
        if (props?.toy?.chatHistory) setMsgs([...props.toy?.chatHistory])
        socketService.emit('chat topic', props.toy._id)
        socketService.off(SOCKET_EMIT_SEND_MSG)
        socketService.on(SOCKET_EMIT_SEND_MSG, addMsg)
        socketService.on(SOCKET_EVENT_TYPING, showIsTyping)

        return () => {
            socketService.off(SOCKET_EMIT_SEND_MSG, addMsg)
            clearTimeout(timeout)
        }

    }, [isBotMode])


    useEffect(() => {
        msgsContainerRef.current.scrollTop = msgsContainerRef.current.scrollHeight
        const { toy } = props
        toy.chatHistory = msgs
        socketService.emit(SOCKET_EVENT_SAVE_CHAT_HISTORY, toy)
    }, [msgs])

    const addMsg = (newMsg) => {
        newMsg.createdAt = Date.now()
        setMsgs(prevMsgs => [...prevMsgs, newMsg])
        if (isBotMode) sendBotResponse()
    }

    const deleteToyChat = () => {
        props.toy.userChat = null
        setMsgs([])
        dispatch(addToy(props.toy, true))
    }

    const sendBotResponse = () => {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(() => {
            setMsgs(prevMsgs => ([...prevMsgs, { from: 'Bot', txt: 'You cen chat from the best toy stor - MISTER TOY!' }]))
        }, 1500)
    }

    const sendMsg = ev => {
        ev.preventDefault()
        const from = user?.fullname || 'Me'
        socketService.emit('chat newMsg', { from, txt: msg.txt, isBotMode })
        setMsg({ from: 'Me', txt: '' })
    }

    const msgHandleChange = ev => {
        const { name, value } = ev.target
        setMsg(prevMsg => ({ ...prevMsg, [name]: value }))
        const from = user?.fullname || 'user'
        socketService.emit(SOCKET_EVENT_TYPING, { from, isTyping: value !== '' })
    }

    const toggleIsBotMode = (ev) => {
        console.log(ev.target.checked)
        setIsBotMode(ev.target.checked)
    }

    const showIsTyping = (typing) => {
        setTyping(typing)
        clearTimeout(typingTimeOutId)
        typingTimeOutId = setTimeout(() => {
            setTyping(null)
        }, 3000)
    }
    if (!props.toy) return <></>
    return (
        <section className="chat-container">
            <div className="task-details-back-btn"
                onClick={props.onToggleModal}>
                <GrClose />
            </div>

            <h1>Lets Chat about: <br />
                <span className='toy-name'>{props.toy.name}</span>
            </h1>
            {typing?.isTyping &&
                <div className="isTyping fade">{typing.from} is typing...</div>}
            <div className="msgs-container" ref={msgsContainerRef}>
                <ul>
                    {msgs.map((msg, idx) => (
                        <li className='chat-msg' key={idx}>
                            <strong>{msg.from}:{" "}</strong>
                            {msg.txt}{" "}
                            <span className="chat-msg-timestamp">{utilService.timeSince(msg.createdAt)}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="chat-form" >
                <label>
                    <input type="checkbox"
                        name="isBotMode"
                        checked={isBotMode}
                        onChange={toggleIsBotMode}
                    />
                    Bot Mode

                </label>
                <form onSubmit={sendMsg}>
                    <input
                        type="text"
                        value={msg.txt}
                        onChange={msgHandleChange}
                        name="txt"
                        autoComplete="off"
                        placeholder='Enter Message'
                        required
                    />
                    <button>Send</button>
                    <button className='clear-msg' type="button" onClick={() => deleteToyChat()}>Clear Chat</button>


                </form>
            </div>
        </section >
    )
}