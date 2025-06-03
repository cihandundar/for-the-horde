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

interface Product {
    slug: string
    coverImage: string
    name: string
    isPriceRange: number | string
    rating: number
    title: string
}

export default function PopularProducts(): React.ReactElement {
    const dispatch = useDispatch<AppDispatch>()

    const products = useSelector((state: RootState) => state.products.products) as Product[]
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    return (
        <section className="py-[75px] bg-white sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <div className="text-center text-4xl font-bold  mb-10 uppercase">Popular Products</div>
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
                                    <Link href={"/"} className='flex flex-col items-start justify-center shadow-lg rounded-lg py-5 relative'>
                                        <Image src={item?.coverImage} alt={item?.name} width={250} height={250} className='pb-3' />
                                        <div className="pl-5">
                                            <div className="text-xl font-thin ">{item?.title}</div>
                                            <div className="font-bold ">{item?.name}</div>
                                            <div className='flex items-center gap-2'> <StarRating rating={item?.rating} /> <span className='font-bold'>{item?.rating} </span></div>
                                            <div className=' py-2'>
                                                {typeof item?.isPriceRange === 'number'
                                                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })?.format(item.isPriceRange)
                                                    : item?.isPriceRange}
                                            </div>
                                        </div>
                                    </Link >
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    )}
                </>
            </div>
        </section>
    )
}
