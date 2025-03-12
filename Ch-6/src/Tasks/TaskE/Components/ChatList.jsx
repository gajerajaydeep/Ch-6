import React from 'react'
import '../Styles.css'


export default function ChatList({ chats }) {
    const user = localStorage.getItem("user")

    const SenderChat = ({ message, avatar, username }) => {
        return (
            <div className='chat_sender sender'>
                <img src={avatar} alt="" />
                <p className='chat_sender'><b>{username} </b> : {message}</p>
            </div>
        )
    }
    const ReceiverChat = ({ message, avatar, username }) => {
        return (
            <div className='chat_receiver receiver'>
                <img src={avatar} alt="" />
                <p className='chat_receiver'><b>{username} </b> : {message}</p>
            </div>
        )
    }
    return (
        <>

            <div className='border chats-list'>
                {
                    chats.map((chat, index) => {
                        if (chat.user == user) {
                            return (<SenderChat
                                key={index}
                                message={chat.message}
                                username={chat.user}
                                avatar={chat.avatar} />)
                        }
                        else {
                            return (<ReceiverChat
                                key={index}
                                message={chat.message}
                                username={chat.user}
                                avatar={chat.avatar} />)
                        }
                    })

                }

                {/* <ReceiverChat /> */}
            </div>
        </>
    )
}
