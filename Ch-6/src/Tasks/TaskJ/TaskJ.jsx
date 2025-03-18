import axios from 'axios';
import React, {useState, useEffect } from 'react'

export default function TaskJ() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async (attempt = 1) => {
            try {
                const response = await axios.get("http://localhost:3001/user")
                setData(response.data)
                setLoading(false)
            } catch (error) {
                if (attempt <= 5) {
                    console.log(`Retry attempt ${attempt} failed. Retrying in ${500}ms...`);
                    setTimeout(() => fetchData(attempt + 1), 500);
                } else {
                    setError(err.message || 'Failed to fetch data after multiple retries.');
                    setLoading(false);
                }
            }
        }
        fetchData();
    }, [])
console.log(data);

    return (
        <>
            <div className="container">
                {
                    data.map((item, index) => {
                        return    <li key={index}>{item.title}</li>
                    })
                }
            </div>

        </>
    )
}
