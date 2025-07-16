'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductBySlug } from '@/redux/features/productSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import StarRating from '@/components/rating/StarRating'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import type { Swiper as SwiperType } from 'swiper'
import { FreeMode, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

type Specification = {
    icon: string
    name: string
    value: string
}

type Variant = {
    id: string
    coverImage: string
    color: { name: string }
    isPriceRange: number
}

type RatingDetail = {
    name: string
    value: string
}

type Review = {
    name: string
    comment: string
    rating: number
    createdAt: string
}

type ProductProperties = {
    productDetails?: { specifications?: Specification[] }
    customerReviews?: {
        ratingDetails?: RatingDetail[]
        reviews?: Review[]
    }
}

type Product = {
    title: string
    name: string
    description: string
    images?: string[]
    isPriceRange: number
    rating: number
    ratingCount: number
    inStock: boolean
    variantList?: Variant[]
    properties?: ProductProperties
}

export default function ProductDetail() {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null)
    const dispatch = useDispatch<AppDispatch>()
    const { slug } = useParams()
    const { data: session } = useSession()

    const product = useSelector((state: RootState) => state.products.currentProduct as Product | null)
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)

    useEffect(() => {
        if (slug) {
            const slugStr = Array.isArray(slug) ? slug[0] : slug
            dispatch(fetchProductBySlug(slugStr))
        }
    }, [slug, dispatch])

    if (loading) return <p className="text-center py-10">Loading...</p>
    if (error) return <p className="text-center text-red-600 py-10">Error: {error}</p>
    if (!product) return <p className="text-center py-10">Product not found.</p>

    return (
        <>
            <Breadcrumb />

            <section className="py-16 bg-white px-4 sm:px-6 lg:px-8">
                <div className="container max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="flex flex-col items-center w-full md:max-w-[500px] max-w-[250px] mx-auto">
                        <Swiper
                            loop
                            spaceBetween={10}
                            navigation
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper2 w-full overflow-hidden mb-[-100px]"
                        >
                            {product.images?.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-[400px] object-contain rounded-lg"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <Swiper
                            onSwiper={(swiper) => setThumbsSwiper(swiper)}
                            loop
                            spaceBetween={10}
                            slidesPerView={4}
                            freeMode
                            watchSlidesProgress
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="mySwiper w-full"
                        >
                            {product.images?.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className="w-full h-[100px] object-contain rounded-lg shadow-xl cursor-pointer border border-gray-200"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="shadow-2xl p-10 rounded-2xl">
                            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                            <h2 className="text-xl font-semibold mb-4">{product.name}</h2>

                            <div className="flex items-center gap-2 mb-4">
                                <StarRating rating={product.rating} />
                                <span className="font-bold">{product.rating}</span>
                                <span className="text-gray-500 text-sm">
                                    ({product.ratingCount} reviews)
                                </span>
                            </div>

                            <p className="text-gray-700 mb-6">{product.description}</p>

                            <div className="mb-4 flex flex-wrap items-center gap-5">
                                {(product.variantList ?? []).map((variant) => (
                                    <div key={variant.id} className="flex flex-col shadow-xl p-5 rounded-lg border border-gray-200">
                                        <img
                                            src={variant.coverImage}
                                            alt={variant.color.name}
                                            className="w-[100px] h-[100px] object-contain"
                                        />
                                        <span>{variant.color.name}</span>
                                        <span>
                                            {new Intl.NumberFormat('en-US', {
                                                style: 'currency',
                                                currency: 'USD',
                                            }).format(variant.isPriceRange)}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <p className="text-2xl font-bold text-green-600 mb-2">
                                {new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                }).format(product.isPriceRange)}
                            </p>

                            <div
                                className={`font-semibold mb-6 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}
                            >
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </div>

                            {!product.inStock ? (
                                <button className="bg-gray-400 px-10 py-3 font-bold shadow-lg rounded-lg cursor-not-allowed">
                                    Out of Stock
                                </button>
                            ) : session ? (
                                <button className="cursor-pointer bg-green-500 text-white px-10 py-3 font-bold shadow-lg rounded-lg hover:bg-green-600 transition">
                                    Add to Cart
                                </button>
                            ) : (
                                <Link href="/signin">
                                    <button className="cursor-pointer bg-blue-500 text-white px-10 py-3 font-bold shadow-lg rounded-lg hover:bg-blue-600 transition">
                                        Log in to Purchase
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container max-w-screen-xl mx-auto grid grid-cols-12 md:gap-10 gap-0">
                    {product?.properties?.productDetails?.specifications?.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center gap-2 mb-5 md:col-span-3 col-span-12 shadow-2xl p-5 rounded-lg border border-gray-200 md:mb-0"
                        >
                            <span className="w-10 text-gray-600">
                                <img
                                    src={item.icon}
                                    alt={item.name}
                                    className="w-full h-auto object-contain"
                                />
                            </span>
                            <span className="font-medium text-black">{item.name}:</span>
                            <span className="text-gray-700">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container max-w-screen-xl mx-auto px-5 md:px-0">
                    {(() => {
                        const ratingDetails = product?.properties?.customerReviews?.ratingDetails
                        if (!ratingDetails || ratingDetails.length === 0) return null

                        const totalReviews = ratingDetails.reduce((acc: number, item) => acc + parseInt(item.value), 0) || 1

                        return ratingDetails.map((item, index) => {
                            const value = parseInt(item.value)
                            const percentage = (value / totalReviews) * 100

                            return (
                                <div key={index} className="mb-4">
                                    <div className="flex justify-between items-center mb-1 text-sm">
                                        <span className="font-medium">{item.name} Rating</span>
                                        <span className="text-gray-600">
                                            {value} User (%{percentage.toFixed(1)})
                                        </span>
                                    </div>
                                    <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
                                        <div
                                            className="h-4 bg-yellow-400 rounded transition-all duration-300"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    })()}
                </div>
            </section>

            <section className="py-16 bg-white">
                <div className="container max-w-screen-xl mx-auto px-5 md:px-0 grid grid-cols-12 md:gap-10 gap-0">
                    {product?.properties?.customerReviews?.reviews?.map((item, index) => (
                        <div
                            key={index}
                            className="flex justify-between col-span-12 mb-5 md:mb-0 w-full shadow-2xl p-5 rounded-lg border border-gray-200"
                        >
                            <div className="flex flex-col gap-2">
                                <span className="font-medium text-black">{item.name}:</span>
                                <div className="text-xl">{item.comment}</div>
                                <span className="text-gray-700">
                                    <StarRating rating={item.rating} />
                                </span>
                            </div>
                            <div className="text-xl">
                                {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
