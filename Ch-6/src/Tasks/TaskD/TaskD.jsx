import React from 'react'
import { Link, Routes, Route, useParams } from 'react-router-dom'
import Login from './Login'
import Registration from './Registration'
import { ToastContainer } from 'react-toastify'
import Create from './Create'
import Update from './Update'
import Read from './Read'
import Home from './Home'

export default function TaskD() {

    return (
        <>
            <Routes>
                <Route path='/' element={<Login />} > </Route>
                <Route path='/login' element={<Login />} >

                </Route>
                <Route path='/home' element={<Home />} > </Route>
                <Route path='/create' element={<Create />} />
                <Route path='/update/:id' element={<Update />} />
                <Route path='/read/:id' element={<Read />} />
            </Routes>
            <ToastContainer />

        </>
    )
}
