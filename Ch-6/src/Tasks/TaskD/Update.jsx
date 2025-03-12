import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

export default function Update() {
    // const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate= useNavigate()
      const [notes, setNotes] = useState({
            id: '',
            title: "",
            description: ""
        })

    useEffect(() => {
        axios.get("http://localhost:3000/user/" + id)
            .then((res) => setNotes(res.data))
            .catch((err) => console.log("error :", err))

    }, [])
    const handleFormSubmit = (e) => {
        e.preventDefault()

        axios.put("http://localhost:3000/user/"+id , notes)
            .then((res) => {
                navigate("/home")
            }
            )
            .catch((err) => console.log("error :", err))
    }
    return (
        <>


           <div className="note-form">
                          <h2> Update Note!! </h2>
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
          
                              <button className='btn btn-primary mt-3'>Update</button>
                              <Link to="/home" className='btn btn-secondary mt-3'>Back To Home</Link>
                          </form>
                      </div>
        </>
    )
}
