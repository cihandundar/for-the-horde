import Blogs from '@/components/blogs/Blogs'
import Hero from '@/components/hero/Hero'
import PopularProducts from '@/components/popular-products/PopularProducts'
import React from 'react'

export default function HomePage() {
    return (
        <main>
            <Hero />
            <PopularProducts />
            <Blogs />
        </main>
    )
}
