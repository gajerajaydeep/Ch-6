import { createUserWithEmailAndPassword } from 'firebase/auth'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from './firebase'
import { toast } from 'react-toastify'
import { setDoc, doc } from 'firebase/firestore'


export default function Registration() {
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')
    const navigate = useNavigate()

    //handleRegisterSubmit
    const handleRegisterSubmit = async (e) => {
        e.preventDefault(); // Corrected typo

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            console.log(user);

            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    firstname: fname,
                    lastname: lname,
                    // password: user.password
                });

            }



            toast.success("successfully registerd!", { position: "top-center" })
            console.log("user registered successfully");
            navigate('/')
        } catch (error) {
            toast.error(error.message, { position: "bottom-center" })

        }

    };
    return (
        <>
            <div className="login-container container border p-2" >
                <h1 className='text-center mb-3'>Registration Here!!</h1>

                <form className='d-flex flex-column  justify-content-around text-center'
                    onSubmit={handleRegisterSubmit}
                    style={{ height: "400px" }}>

                    <label > First Name :
                        <input type="text"
                            value={fname}
                            placeholder='Enter First-name'
                            onChange={(e) => setFname(e.target.value)}
                        />
                    </label>
                    <label > Last Name :
                        <input type="text"
                            value={lname}
                            placeholder='Enter Last-name'
                            onChange={(e) => setLname(e.target.value)}
                        />
                    </label>
                    <label > Email :
                        <input type="email"
                            value={email}
                            placeholder='Enter email'
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                    <label > Password :
                        <input type="password"
                            value={password}
                            placeholder='Enter email'
                            onChange={(e) => setpassword(e.target.value)}
                        />
                    </label>
                    <div>
                        <button type='submit' className='btn btn-primary'>Sign in</button>
                    </div>
                </form>
            </div>
        </>
    )
}
