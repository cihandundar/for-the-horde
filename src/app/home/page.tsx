import Blogs from '@/components/blogs/Blogs'
import Brands from '@/components/brands/Brands'
import Hero from '@/components/hero/Hero'
import PopularProducts from '@/components/popular-products/PopularProducts'
import React from 'react'

export default function HomePage() {
    return (
        <main>
            <Hero />
            <Brands />
            <PopularProducts />
            <Blogs />
        </main>
    )
}
