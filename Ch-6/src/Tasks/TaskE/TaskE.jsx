import React from 'react'
import { Routes, Route,Link } from 'react-router-dom'
import Login from './Components/Login'
import ChatContainer from './Components/ChatContainer'
import ChatList from './Components/ChatList'



export default function TaskE() {
    return (
        <>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/chat' element={<ChatContainer/>}/>
               
            </Routes>

        </>
    )
}
