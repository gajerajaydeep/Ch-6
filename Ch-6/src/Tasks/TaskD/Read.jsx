import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams,Link } from 'react-router-dom'

export default function Read() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        axios.get("http://localhost:3000/user/" + id)
            .then((res) => setData(res.data))
            .catch((err) => console.log("error :", err))

    }, [])


    return (

        <>
            <h1 className='text-center mb-5 '>Read Notes Here!!</h1>
            <div className="read-note-container container border p-5 border-info ">
                <div className="read-note-heading ">
                    <h3> <b className='text-success'>Title : </b>   {data.title}</h3>
                </div>
                <div className="read-note-body">
                    <h3><b className='text-success'>Description : </b>{data.description}</h3>
                </div>
                <Link to={`/update/${id}`} className='btn btn-primary mt-2'>Update</Link>&nbsp;
                <Link to='/' className='btn btn-primary mt-2'>Back</Link>
            </div>
        </>




    )
}
