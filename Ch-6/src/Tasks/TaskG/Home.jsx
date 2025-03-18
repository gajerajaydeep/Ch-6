import axios from 'axios'
import React, { useEffect, useState,useRef } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./TaskG.css"
import _ from 'lodash';


export default function Home() {

    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [filterByTitle, setFilterByTitle] = useState(data);

 const throttledSearch = useRef(
    _.throttle((searchTerm, data) => {
      const results = data.filter((item) => {
        if (typeof item.title === 'string') {
          return item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim());
        }
        return false;
      });
      setFilterByTitle(results);
    }, 500) 
  ).current;

    useEffect(() => {
        axios.get("http://localhost:3000/user")
            .then((res) => setData(res.data))
            .catch((err) => console.log("error :", err))

    }, [])

    useEffect(() => {
        throttledSearch(search, data);
      }, [search, data, throttledSearch]);
    
    //handle delete
    const handleDelete = (id) => {
        const confirm = window.confirm("Are you sure?")
        if (confirm) {
            // "http://localhost:3000/user/"+id
            axios.delete("http://localhost:3000/user/" + id)
                .then((res) => {
                    location.reload()
                })
                .catch((err) => console.log(err)
                )
        }


    }
  return (
        <>
            {/* search */}

            <div className='text-center my-5'>
                <h1 className='text-center my-5'>Notes : </h1>
                <label  >Search here :  &nbsp;
                    <input type="text"
                        value={search}
                        onChange={(e) => { setSearch(e.target.value.toLocaleLowerCase()) }}
                    />
                </label>
            </div>
            <div className="add-notes text-center">


                <Link to='/create' className='btn btn-success'>Add Notes +</Link>

            </div>
            {
                filterByTitle.map((item, index) => {
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
                                <Link className='btn btn-primary'>Edit</Link> &nbsp;
                                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                            </div>
                        </div>
                    )
                })
            }


        </>
    )
}
