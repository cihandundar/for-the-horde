import Blogs from '@/components/blogs/Blogs'
import Brands from '@/components/brands/Brands'
import Hero from '@/components/hero/Hero'
import PopularProducts from '@/components/popular-products/PopularProducts'
import Products from '@/components/products/Products'
import React from 'react'

export default function HomePage() {
    return (
        <>
            <Hero />
            <Brands />
            <Products />
            <PopularProducts />
            <Blogs />
        </>
    )
}
