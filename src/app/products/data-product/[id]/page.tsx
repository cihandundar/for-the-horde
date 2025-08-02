"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomProductById } from "@/redux/features/customProductSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useParams } from "next/navigation";
import StarRating from "@/components/rating/StarRating";
import { addToCart } from "@/redux/features/cardSlice";
import { toggleFavorite } from "@/redux/features/favoriteSlice";

interface ProductFeatures {
    color: string;
    warranty: string;
    made_in: string;
    material: string;
    release_year: string;
}

interface ProductRatings {
    average: number;
    count: number;
}

interface Product {
    id: string;
    name: string;
    brand: string;
    category: string;
    sku: string;
    price: number;
    images: string[];
    features: ProductFeatures;
    ratings: ProductRatings;
}

export default function CustomProductDetail(): React.ReactElement {
    const params = useParams();
    const id = params?.id as string | undefined;

    const dispatch = useDispatch<AppDispatch>();
    const [activeHearts, setActiveHearts] = useState<{ [key: string]: boolean }>({});

    const { selectedProduct, loading, error } = useSelector(
        (state: RootState) => state.customproducts
    );

    useEffect(() => {
        if (id) {
            dispatch(fetchCustomProductById(id));
        }
    }, [dispatch, id]);

    if (loading)
        return (
            <div className="flex justify-center items-center py-10">
                <span className="loader"></span>
            </div>
        );

    if (error) return <p>Error: {error}</p>;
    if (!selectedProduct) return <p>Product not found</p>;

    const product: Product = selectedProduct as unknown as Product;

    const handleAddToCart = (product: Product) => {
        dispatch(
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0],
                quantity: 1,
                source: "mongo",
            })
        );
    };

    const handleToggleFavorite = (product: Product) => {
        const productId = product.id;
        setActiveHearts((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));

        dispatch(
            toggleFavorite({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.images?.[0] || "",
                description: product.name,
                slug: product.id,
            })
        );
    };

    const isActive = activeHearts[product.id];

    return (
        <section className="bg-white py-[75px]">
            <div className="container max-w-screen-xl mx-auto">
                {error && <p>Error: {error}</p>}

                <div className="flex md:flex-row flex-col items-center gap-10">
                    <img
                        className="shadow-2xl rounded-lg"
                        src={product.images[0]}
                        alt={product.name}
                    />
                    <div className="flex flex-col shadow-2xl p-10 rounded-2xl relative">
                        <div className="text-4xl font-bold">{product.name}</div>
                        <div className="font-thin mb-2 text-xl">{product.brand}</div>
                        <div className="flex items-center gap-2 mb-3">
                            <StarRating rating={product.ratings.average} />
                            <span className="font-bold">{product.ratings.average}</span>
                            <div className="font-thin text-gray">
                                ({product.ratings.count} reviews)
                            </div>
                        </div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-gray-900 text-white inline-block px-2 py-3 rounded-lg">
                                {product.category}
                            </div>
                            <div className="bg-gray-900 text-white py-3 px-2 rounded-lg">
                                {product.sku}
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-3">
                            <span className="border border-gray-200 p-2 rounded-lg bg-white flex flex-col items-center">
                                Color: {product.features.color}
                            </span>
                            <span className="border border-gray-200 p-2 rounded-lg bg-white flex flex-col items-center">
                                Warranty: {product.features.warranty}
                            </span>
                            <span className="border border-gray-200 p-2 rounded-lg bg-white flex flex-col items-center">
                                Made in: {product.features.made_in}
                            </span>
                            <span className="border border-gray-200 p-2 rounded-lg bg-white flex flex-col items-center">
                                Material: {product.features.material}
                            </span>
                            <span className="border border-gray-200 p-2 rounded-lg bg-white flex flex-col items-center">
                                Release year: {product.features.release_year}
                            </span>
                        </div>
                        <div className="pl-3 text-4xl mb-3">
                            {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "USD",
                            }).format(product.price)}
                        </div>
                        <div className="flex w-full items-center">
                            <button
                                onClick={() => handleAddToCart(product)}
                                className="w-full bg-green-500 py-3 font-bold shadow-lg rounded-lg cursor-pointer hover:bg-green-600 transition-colors duration-300"
                            >
                                Add to Cart
                            </button>
                            <div
                                className={`heart-sprite ${isActive ? "is-active" : ""}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleToggleFavorite(product);
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
