import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {
    BarLoader, GridLoader
} from 'react-spinners';

export default function TaskA() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        setTimeout(() => {
            // // "https://jsonplaceholder.typicode.com/users"
            axios.get("https://jsonplaceholder.typicode.com/users")
                .then((res) => {

                    if (res.ok) {
                        throw new Error("throw error : ")
                    }

                    setData(res.data)
                    setLoading(false);
                })
                .catch((error) => {


                    alert("API data is not fetched!!! " + error.message);
                    setLoading(false);
                });
        }, 2000)
    }, [])

    if (loading) {
        return (
            <div>
                <BarLoader loading={loading} style={{ textAlign: "center" }} />
                <GridLoader loading={loading} style={{}} />

            </div>
        )
    }



    return (
        <>
            <div>
                {
                    data.map((item) => {
                        return (
                            <div className='container card p-2 mt-3 '>

                                <h2>User Name : {item.name}</h2>
                                <p><b>User E-mail :</b> {item.email}</p>
                                <p><b>Address :</b> {item.address.street} , {item.address.suite} , {item.address.city} , code: {item.address.zipcode}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}
