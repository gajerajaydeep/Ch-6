import axios from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import "./TaskF.css"
import {GridLoader
} from 'react-spinners'

export default function Home() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(2)
    const [loading, setLoading] = useState(false)
    const loaderRef = useRef();

    const getData = async (page) => {
        try {
            const url = `https://picsum.photos/v2/list?page=${page}&limit=10`
            const res = await fetch(url);
            const data = await res.json()
            return data
            console.log(data);


        } catch (error) {

        }
    }
    const loadMore = useCallback(async () => {
        if (loading) 
            return
            setLoading(true)
            const datas = await getData(page)
            setData((preData) => ([...preData, ...datas]))
            setLoading(false)
            setPage((prePage) => prePage + 1)

        
    }, [page, loading])

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            //last element refrence it can store multiple refrence and it returns a []
            const entry = entries[0];
            console.log(entries);
            
            if (entry.isIntersecting) {
                loadMore()
            }
        })
        if (loaderRef.current) {
            observer.observe(loaderRef.current)
        }
        return () => {
            if (loaderRef.current) {
                observer.unobserve(loaderRef.current)
            }
        }
    }, [])
    const firstPage = async () => {
        const datas = await getData(1)
        setData(datas)
    }
    //run after render
    useEffect(() => {
        firstPage();
    }, [])

    return (
        <>
            <h1 className='text-center my-5'>Infinite Scroller</h1>
            <div className="container images" >
                {
                    data
                        ?
                        data.map((item, index) => {
                            return (
                                <div
                                    key={index}>
                                    <img src={item.download_url} alt="user - image" width={50} />
                                </div>
                            )
                        })
                        :
                        ''
                }
            </div>
            <div ref={loaderRef} className='d-flex justify-content-center '><GridLoader className='w-50 h-50' loading={loading}/></div>
        </>
    )
}

