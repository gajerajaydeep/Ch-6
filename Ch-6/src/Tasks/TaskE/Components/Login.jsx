import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import _ from 'lodash'

export default function Login({setUserName}) {
  const [name, setName] = useState('')
  const handleLoginUserName = (e) => {
    setName(e.target.value)

  }
  const handleLoginBtn =()=>{
    if(!name){
      return
    }
      // localStorage.clear();
    localStorage.setItem("user",name)
    setUserName(name);
    localStorage.setItem("avatar",`https://picsum.photos/${_.random(1,1000)}/300/?blur`)
  }
  return (
    <>
      <div className="container text-center ">

        <h1>Login Here!!!</h1>
        <div className="container mt-3 border border-dark p-5 d-flex justify-content-around">
          <input type="text"
            value={name}
            className='w-50'
            onChange={handleLoginUserName}
            placeholder='Enter Your Name!!' />
          <Link to='/chat' onClick={handleLoginBtn} className='btn btn-success w-25'>Login</Link>
        </div>
      </div>
    </>
  )
}
