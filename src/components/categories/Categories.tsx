"use client"
import { fetchBrand } from '@/redux/features/brandSlice'
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'



interface Brand {
    _id: string
    name: string
}

export default function Brands(): React.ReactElement {

    const dispatch = useDispatch<AppDispatch>()

    const brands = useSelector((state: RootState) => state.brands.brands) as Brand[]
    const loading = useSelector((state: RootState) => state.brands.loading)
    const error = useSelector((state: RootState) => state.brands.error)

    useEffect(() => {
        dispatch(fetchBrand())
    }, [dispatch])

    return (
        <section className="py-[75px] bg-gray-100 sm:px-0 px-2">
            <div className="container max-w-screen-xl mx-auto">
                <div className="text-4xl font-bold text-center mb-10 uppercase">Brands</div>
                {loading && <div className='flex justify-center items-center py-10'><span className="loader"></span></div>}
                {error && <p>Error: {error}</p>}
                {!loading && !error && (

                    <>
                        <div className="grid grid-cols-4 gap-6">
                            {brands?.map((item) => (
                                <div key={item?.name}>
                                    <div className="shadow-xl hover:shadow-2xl rounded-lg bg-white p-10 cursor-pointer">
                                        <div className="text-xl font-bold text-center">
                                            {item?.name}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </section>
    )
}
