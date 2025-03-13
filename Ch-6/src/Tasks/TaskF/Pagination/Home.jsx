import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./TaskF.css"

export default function Home() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate()

    //pagination logic
    const [currentPage, setCurrentPage] = useState(1) //1page visible
    const recordsPerpage = 2; //2notes shown
    const lastIndex = currentPage * recordsPerpage; // 1*2 =2nd index
    const firstIndex = lastIndex - recordsPerpage; // 2-2 = 0th index

    //slice method for notes
    const records = data.slice(firstIndex, lastIndex) //data is slice here

    const nOfPage = Math.ceil(data.length / recordsPerpage) // 10/2 = 5pages
    const numbers = [...Array(nOfPage + 1).keys()].slice(1)

    function nextPage() {
        if (currentPage < nOfPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    function prevPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    function changeCPage(no) {
        setCurrentPage(no);
    }
    //pagination logic

    //fetch data
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
            <h1 className='text-center my-5'>Notes : </h1>
            <div className="add-notes text-center">


                <Link to='/create' className='btn btn-success'>Add Notes +</Link>

            </div>
            <div className="notes-display">
                {
                    records.map((item, index) => {
                        return (
                            <div className="note-container container border mt-2 p-4" key={index}>
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
            </div>
            <div className="notes-pagination d-flex justify-content-center mt-3">
                <ul className='pagination'>
                    <li className='page-item'>
                        <a href="#" className='page-link'
                            onClick={prevPage}
                        >Prev</a>
                    </li>
                    {numbers.map((no, i) => (
                        <li className={`page-item ${currentPage === no ? 'active' : ''}`} key={i}>
                            <button className='page-link' onClick={() => changeCPage(no)}>{no}</button>
                        </li>
                    ))}
                    <li className='page-item'>
                        <a href="#" className='page-link'
                            onClick={nextPage}
                        >Next</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

