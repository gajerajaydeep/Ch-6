import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './TaskG.css'
import axios from 'axios'


export default function Create() {
    const [notes, setNotes] = useState({
        id: '',
        title: "",
        description: ""
    })

    //navigate
    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault()

        axios.post("http://localhost:3000/user", notes)
            .then((res) => {
                navigate("/")
            }
            )
            .catch((err) => console.log("error :", err))
    }
    return (
        <>
            <div className="note-form">
                <h2> Create Note! </h2>
                <form className='d-flex flex-column mt-4' onSubmit={handleFormSubmit}>
                    <label ><b>Title : </b>
                        <input
                            type="text"
                            name='title'
                            placeholder='Enter Note Title Here!!'
                            value={notes.title}
                            onChange={(e) => (setNotes({ ...notes, title: e.target.value }))}
                        />
                    </label>

                    <label ><b> Description : </b></label>
                    <textarea
                        name='description'
                        rows={10}
                        cols={50}
                        placeholder='Enter Description Here!!'
                        value={notes.description}
                        onChange={(e) => (setNotes({
                            ...notes,
                            description: e.target.value
                        }))}
                    ></textarea>

                    <button className='btn btn-primary mt-3'>Save</button>
                    <Link to="/" className='btn btn-secondary mt-3'>Back To Home</Link>
                </form>
            </div>
        </>
    )
}
