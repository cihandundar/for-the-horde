"use client"

import { fetchCustomProducts } from '@/redux/features/customProductSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import StarRating from '../rating/StarRating'
import Link from 'next/link'
import { addToCart } from '@/redux/features/cardSlice'

interface CustomProduct {
    _id: string
    id: string
    name: string
    category: string
    categoryId: string
    sku: string
    price: number
    brand: string
    currency: string
    stock: number
    description: string
    features: string[]
    images: string[]
    createdAt: string
    average: number
    count: number
}

export default function Products(): React.ReactElement {

    const dispatch = useDispatch<AppDispatch>()

    const customproducts = useSelector((state: RootState) => state.customproducts.customproducts);
    const loading = useSelector((state: RootState) => state.customproducts.loading)
    const error = useSelector((state: RootState) => state.customproducts.error)

    useEffect(() => {
        dispatch(fetchCustomProducts())
    }, [dispatch])

    const handleAddToCart = (product: CustomProduct) => {
        dispatch(addToCart({
            id: product.id || product._id,
            name: product.name,
            price: product.price,
            image: product.images?.[0],
            quantity: 1,
            source: "mongo"
        }))
    }

    return (
        <section className="py-[75px] bg-white sm:px-0 px-2">
            <div className="text-center text-4xl font-bold uppercase mb-3">Products</div>
            <div className="container max-w-screen-xl mx-auto">
                {loading && (
                    <div className='flex justify-center items-center py-10'>
                        <span className="loader"></span>
                    </div>
                )}

                {error && <p>Error: {error}</p>}

                <div className="grid grid-cols-12 gap-6">
                    {!loading && !error && customproducts?.map((item) => (
                        <div
                            key={item?.id}
                            className="md:col-span-4 col-span-12 shadow-xl hover:shadow-2xl rounded-lg bg-white md:p-10 p-3 cursor-pointer"
                        >
                            <Link href={`/products/data-product/${item.id}`}>
                                <img
                                    src={item?.images?.[0]}
                                    alt={item?.name}
                                    className="object-contain object-center w-full h-48"
                                />
                            </Link>
                            <div className="flex flex-col md:pl-5 pl:0">
                                <div className="font-thin mt-2">{item?.brand}</div>
                                <div className="text-xl font-bold break-words mb-2">{item?.name}</div>

                                <div className="flex items-center gap-2">
                                    <StarRating rating={item?.ratings?.average || item?.average || 0} />
                                    <span className="font-bold">{item?.ratings?.average || item?.average || 0}</span>
                                </div>

                                <div className="text-xl my-3">
                                    {typeof item?.price === 'number'
                                        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price)
                                        : item?.price}
                                </div>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className='bg-green-500 px-10 py-3 font-bold shadow-lg rounded-lg cursor-pointer'
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
