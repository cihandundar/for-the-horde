"use client"
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import StarRating from '@/components/rating/StarRating'
import { fetchProducts } from '@/redux/features/productSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useSession } from 'next-auth/react'

interface Product {
    _id: string
    id: string
    title: string
    name: string
    wasPriceRange: number
    isPriceRange: number
    description: string
    coverImage: string
    images: string[]
    inStock: boolean
    slug: string
    rating: number
    ratingCount: number
}

export default function Product(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const searchParams = useSearchParams()
    const { data: session } = useSession()
    const currentPage = Number(searchParams.get("page")) || 1

    const products = useSelector((state: RootState) => state.products.products) as Product[]
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)
    const totalPages = useSelector((state: RootState) => state.products.totalPages)

    useEffect(() => {
        dispatch(fetchProducts(currentPage))
    }, [dispatch, currentPage])

    return (
        <>
            <Breadcrumb />
            <section className='py-[75px] bg-white sm:px-0 px-2'>
                <div className="container max-w-screen-xl mx-auto">
                    {loading && (
                        <div className='flex justify-center items-center py-10'>
                            <span className="loader"></span>
                        </div>
                    )}
                    {error && <p className='text-red-600'>Error: {error}</p>}

                    <div className="grid grid-cols-12 gap-5">
                        {!loading && !error && products?.map((item) => (
                            <div key={item.slug} className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
                                <Link href={`/products/${item?.slug}`} className='flex flex-col md:items-start items-center justify-center shadow-lg rounded-lg py-5 border-1 border-gray-300'>
                                    <Image src={item?.coverImage} alt={item?.name} width={250} height={250} className='pb-3' />
                                    <div className="pl-5">
                                        <div className="text-xl font-thin ">{item?.title}</div>
                                        <div className="font-bold ">{item?.name}</div>
                                        <div className='flex items-center gap-2'>
                                            <StarRating rating={item?.rating} />
                                            <span className='font-bold'>{item?.rating}</span>
                                        </div>
                                        <div className='py-2'>
                                            {typeof item?.isPriceRange === 'number'
                                                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })?.format(item.isPriceRange)
                                                : item?.isPriceRange}
                                        </div>
                                        <div className={`font-semibold pb-2 ${item?.inStock ? 'text-green-600' : 'text-red-600'}`}>
                                            {item?.inStock ? 'In Stock' : 'Out of Stock'}
                                        </div>


                                        {!item?.inStock ? (
                                            <button className='bg-gray-400 px-10 py-2 font-bold shadow-lg rounded-lg cursor-not-allowed'>
                                                Out of Stock
                                            </button>
                                        ) : session ? (
                                            <button className='bg-green-500 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer'>
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <button className='bg-blue-400 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer'>
                                                View Details
                                            </button>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center mt-10 gap-2">

                        <Link
                            href={`/products?page=${currentPage - 1}`}
                            className={`p-2 rounded-full border hover:bg-blue-100 transition ${currentPage <= 1 ? "opacity-30 pointer-events-none" : "text-blue-600"
                                }`}
                        >
                            <FaChevronLeft className="w-4 h-4" />
                        </Link>


                        {Array.from({ length: totalPages }, (_, i) => {
                            const page = i + 1
                            return (
                                <Link
                                    key={page}
                                    href={`/products?page=${page}`}
                                    scroll={false}
                                    className={`px-4 py-2 rounded border text-sm transition ${page === currentPage
                                        ? "bg-blue-600 text-white pointer-events-none"
                                        : "bg-white text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {page}
                                </Link>
                            )
                        })}


                        <Link
                            href={`/products?page=${currentPage + 1}`}
                            className={`p-2 rounded-full border hover:bg-blue-100 transition ${currentPage >= totalPages ? "opacity-30 pointer-events-none" : "text-blue-600"
                                }`}
                        >
                            <FaChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                </div>
            </section>
        </>
    )
}
