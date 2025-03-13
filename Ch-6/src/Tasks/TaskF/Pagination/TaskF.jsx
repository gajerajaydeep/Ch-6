import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Home'
import Create from './Create'
import Update from './Update'
import Read from './Read'


export default function TaskF() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/update/:id' element={<Update/>}/>
        <Route path='/read/:id' element={<Read/>}/>
    </Routes>
  )
}
