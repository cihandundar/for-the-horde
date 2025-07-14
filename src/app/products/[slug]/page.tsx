'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductBySlug } from '@/redux/features/productSlice'
import { AppDispatch, RootState } from '@/redux/store'
import Breadcrumb from '@/components/breadcrumb/Breadcrumb'
import Image from 'next/image'
import StarRating from '@/components/rating/StarRating'
import Link from 'next/link'
import { useSession } from 'next-auth/react'



export default function ProductDetail() {
    const dispatch = useDispatch<AppDispatch>()
    const { slug } = useParams()
    const { data: session } = useSession()
    const product = useSelector((state: RootState) => state.products.currentProduct)
    const loading = useSelector((state: RootState) => state.products.loading)
    const error = useSelector((state: RootState) => state.products.error)

    useEffect(() => {
        if (slug) {
            const slugStr = Array.isArray(slug) ? slug[0] : slug;
            dispatch(fetchProductBySlug(slugStr))
        }
    }, [slug, dispatch])

    if (loading) return <p>Loading...</p>
    if (error) return <p className="text-red-600">Error: {error}</p>
    if (!product) return <p>Product not found.</p>

    return (
        <>
            <Breadcrumb />
            <section className="py-[75px] bg-white sm:px-0 px-2">
                <div className="container max-w-screen-xl mx-auto grid md:grid-cols-2 gap-10">
                    <div className="flex justify-center">
                        {product.coverImage ? (
                            <Image
                                src={product.coverImage}
                                alt={product.name || 'Ürün görseli'}
                                width={400}
                                height={400}
                                className="rounded shadow-lg"
                            />
                        ) : (
                            <div
                                style={{
                                    width: 400,
                                    height: 400,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: '#f3f3f3',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                }}
                            >
                                <span>No Image</span>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col justify-center">
                        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
                        <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                        <div className="flex items-center gap-2 mb-4">
                            <StarRating rating={product.rating} />
                            <span className="font-bold">{product.rating}</span>
                            <span className="text-gray-500 text-sm">({product.ratingCount} reviews)</span>
                        </div>

                        <p className="text-gray-700 mb-4">{product.description}</p>

                        <p className="text-2xl font-bold text-green-600 mb-2">
                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.isPriceRange)}
                        </p>

                        <div className={`font-semibold mb-4 ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </div>

                        {!product.inStock ? (
                            <button className="bg-gray-400 px-10 py-2 font-bold shadow-lg rounded-lg cursor-not-allowed">
                                Out of Stock
                            </button>
                        ) : session ? (
                            <button className="bg-green-500 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer">
                                Add to Cart
                            </button>
                        ) : (
                            <Link href="/signin">
                                <button className="bg-blue-400 px-10 py-2 font-bold shadow-lg rounded-lg cursor-pointer">
                                   Log in
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}
