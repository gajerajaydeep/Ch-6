import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./TaskC.css"

export default function Home() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        axios.get("http://localhost:3000/user")
            .then((res) => setData(res.data))
            .catch((err) => console.log("error :", err))

    }, [])

    //handle delete
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure?")
        if (confirm) {
            // "http://localhost:3000/user/"+id
            axios.delete("http://localhost:3000/user/"+id)
                .then((res) => {
                    location.reload()
                })
                .catch((err) => console.log(err)
                )
        }


    }
    return (
        <>
            <h1 className='text-center my-5'>Notes : </h1>
            <div className="add-notes text-center">


                <Link to='/create' className='btn btn-success'>Add Notes +</Link>

            </div>
            {
                data.map((item, index) => {
                    return (
                        <div className="note-container container border mt-2 p-4">
                            <div className="note-heading">
                                <h2 className='m-0'>Title : {item.title}</h2>
                            </div>
                            <div className="card-body">
                                <p className='m-0 p-0'> <b>Description : </b>{item.description} </p>
                            </div>
                            <div className="note-btn ">
                                <Link to={`/read/${item.id}`} className='btn btn-info'> Read
                                </Link> &nbsp;
                                <Link  className='btn btn-primary'>Edit</Link> &nbsp;
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }

        </>
    )
}
