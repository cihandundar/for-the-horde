"use client"
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import { fetchBlogs } from '@/redux/features/blogSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'
import { CiUser } from 'react-icons/ci'

interface Blog {
    _id: string
    id: string
    title: string
    content: string
    author: string
    imageUrl: string
    tags: string[]
}

export default function Blog() {
    const dispatch = useDispatch<AppDispatch>()

    const blogs = useSelector((state: RootState) => state.blogs.blogs) as Blog[]
    const loading = useSelector((state: RootState) => state.blogs.loading)
    const error = useSelector((state: RootState) => state.blogs.error)

    useEffect(() => {
        dispatch(fetchBlogs())
    }, [dispatch])

    return (
        <>
            <Breadcrumb />
            <section className="py-[75px] bg-gray-100 sm:px-0 px-2">
                <div className="container max-w-screen-xl mx-auto">
                    {loading && (
                        <div className='flex justify-center items-center py-10'>
                            <span className="loader"></span>
                        </div>
                    )}
                    {error && <p>Error: {error}</p>}
                    {!loading && !error && (
                        <>
                            <div className="grid grid-cols-4 gap-6">
                                {blogs?.map((item) => (
                                    <div key={item?.id}>
                                        <Link href={`/blog/${item?.id}`} className="shadow-xl hover:shadow-2xl inline-block h-full rounded-lg overflow-hidden">
                                            <Image src={item?.imageUrl} alt={item?.title} width={300} height={250} className='object-cover object-center lg:w-[300px] lg:h-[200px] w-full h-full' />
                                            <div className="p-3 flex flex-col gap-3">
                                                <div className="font-bold line-clamp-1 overflow-hidden">{item?.title}</div>
                                                <div className="font-thin  line-clamp-3">{item?.content}</div>
                                                <div className="flex items-center gap-2">
                                                    <CiUser />
                                                    <div>{item?.author}</div>
                                                </div>
                                                <div className=" grid grid-cols-3 gap-2">
                                                    {
                                                        item?.tags?.map((tag, index) => (
                                                            <div key={index} className='col-span-1 bg-gray-200 rounded-lg px-1 py-2 text-sm text-center'>
                                                                {tag}
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </>
    )
}
