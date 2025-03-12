import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ChatList from './ChatList'
import InputText from './InputText'
import Login from './Login'
import '../Styles.css'
import socketIoClient from 'socket.io-client'


export default function ChatContainer() {
    const [userName, setUserName] = useState(localStorage.getItem("user"))
    const [chats, setChats] = useState([])

    //connect to server
    const socketio = socketIoClient('http://localhost:3001')


    useEffect(() => {
        socketio.on('chat', (chats) => {
            setChats(chats)

        })
    })
    //chat sen to socket.io
const senToSocket=(chat)=>{
socketio.emit('chat',chat)
}
    //add message
    const addMessage = (chat) => {
        const newChat = { ...chat, user: localStorage.getItem("user"), avatar: localStorage.getItem("avatar") };
        setChats([...chats,newChat])
        senToSocket([...chats,newChat])
    }
    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("avatar")
        setUserName("")
    }
    return (
        <>
            {userName
                ?
                (<div className="chat-container">
                    <div className="container border d-flex justify-content-around mb-3">
                        <h2>User Name : {userName}</h2>
                        <button onClick={handleLogout} className='btn btn-success w-10' >Logout</button>
                    </div>
                    <ChatList chats={chats} />
                    <InputText addMessage={addMessage} />
                </div>)
                :
                (<Login setUserName={setUserName} />)
            }

        </>
    )
}
