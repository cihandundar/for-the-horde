"use client"
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchProducts } from '@/redux/features/productSlice'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import Link from 'next/link'
import StarRating from '../rating/StarRating'
import { useSession } from 'next-auth/react'
import { addToCart } from '@/redux/features/cardSlice'

interface Product {
    _id: string
    id: string
    title: string
    name: string
    wasPriceRange: number
    isPriceRange: number | string
    description: string
    coverImage: string
    images: string[]
    inStock: boolean
    slug: string
    rating: number
    ratingCount: number
}

export default function PopularProducts(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()
    const { data: session } = useSession()

    const products = useSelector((state: RootState) => state.products.products) as Product[]
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)

    useEffect(() => {
        dispatch(fetchProducts(1))
    }, [dispatch])

    const handleAddToCart = (product: Product) => {
        dispatch(addToCart({
            id: product.slug,
            source: "api",
            coverImage: product.coverImage,
            title: product.title,
            name: product.name,
            isPriceRange: typeof product.isPriceRange === 'number' ? product.isPriceRange : parseFloat(product.isPriceRange),
            quantity: 1,
        }));
    }

    return (
        <section className="py-[75px] bg-white sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <div className="text-center text-4xl font-bold uppercase">Popular Products</div>
                <>
                    {loading && <div className='flex justify-center items-center py-10'><span className="loader"></span></div>}
                    {error && <p>Error: {error}</p>}

                    {!loading && !error && (
                        <Swiper
                            modules={[Autoplay, Navigation, Pagination]}
                            spaceBetween={20}
                            slidesPerView={4}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            navigation={true}
                            pagination={{ clickable: true }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                450: { slidesPerView: 1 },
                                640: { slidesPerView: 2 },
                                1024: { slidesPerView: 4 },
                            }}
                        >
                            {products?.map((item) => (
                                <SwiperSlide key={item?.slug}>
                                    <div className='flex flex-col md:items-start items-center justify-center shadow-lg rounded-lg py-5 border-1 border-gray-300'>
                                        <Link href={`/products/${item?.slug}`} className='w-full flex flex-col items-center'>
                                            <Image src={item?.coverImage} alt={item?.name} width={250} height={250} className='pb-3' />
                                        </Link>
                                        <div className="pl-5 w-full">
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
                                                <button
                                                    onClick={() => handleAddToCart(item)}
                                                    className='bg-green-500 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer'
                                                >
                                                    Add to Cart
                                                </button>
                                            ) : (
                                                <Link href={`/products/${item.slug}`}>
                                                    <button className='bg-blue-400 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer'>
                                                        View Details
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    )}
                </>
            </div>
        </section>
    )
}
