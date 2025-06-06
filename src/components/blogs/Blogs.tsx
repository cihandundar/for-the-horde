"use client"
import { fetchBlogs } from '@/redux/features/blogSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface Blog {
    _id: string
    id: string
    title: string
    content: string
    author: string
    createdAt: Date
    imageUrl: string
    tags: string[]
}

export default function Blogs(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()

    const blogs = useSelector((state: RootState) => state.blogs.blogs) as Blog[]
    const loading = useSelector((state: RootState) => state.blogs.loading)
    const error = useSelector((state: RootState) => state.blogs.error)

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    return (
        <section className="py-[75px] bg-gray-100 sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <>
                    {loading && <div className='flex justify-center items-center py-10'><span className="loader"></span></div>}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
                            {blogs?.map((item) => (
                                <div key={item?._id} className="col-span-1 flex flex-col items-center justify-center text-center shadow-xl rounded-lg bg-white p-5 border-1 border-gray-300">
                                    <Image src={item?.imageUrl} alt={item?.title} width={100} height={80} className='object-contain w-[80px] h-[80px]' />
                                    <div className="text-lg py-3 font-bold">{item?.title}</div>
                                    <div className="font-thin">{item?.content}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            </div>
        </section>
    )
}
