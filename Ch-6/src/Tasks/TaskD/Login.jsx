import { signInWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { auth } from './firebase'
import { toast } from 'react-toastify'




export default function Login() {
  

    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const navigate= useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        try {
            await signInWithEmailAndPassword(auth, email, password)
            console.log("Login Successfull");
            toast.success("success", { position: "top-center" })
           navigate("/home")

        } catch (error) {
            console.log("Error:", error);
            toast.error(error.message, { position: "bottom-center" })
        }

    }
    return (
        <div className="login-container container border p-2"  >
            <h1 className='text-center mb-3'>Login Here!!</h1>
            <form className='d-flex flex-column  justify-content-around text-center'
                style={{ height: "250px" }}
                onSubmit={handleLoginSubmit}
            >
                {/* <label > User Name :
                    <input type="text"
                        value={name}
                        placeholder='Enter name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </label> */}

                <label > Email :
                    <input type="text"
                        value={email}
                        placeholder='Enter email'
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label > Password :
                        <input type="password"
                            value={password}
                            placeholder='Enter password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                <div className='container d-flex flex-column'>
                    <button type='submit' className='btn btn-primary'>Login</button><br />
                    <Link to="/registration" className='btn btn-success'>Registration</Link>
                </div>
            </form>
        </div>
    )
}
