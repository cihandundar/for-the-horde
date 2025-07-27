"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity, selectShippingOption } from "@/redux/features/cardSlice";
import { selectCartSummary } from "@/redux/features/cardSlice";
import Link from "next/link";
import { FaRegTrashAlt, FaCartArrowDown } from "react-icons/fa";
import SpinWheel from "@/components/spin-wheel/SpinWheel";
import { useState } from "react";
interface ApiCartItem {
    id: string;
    source: "api";
    coverImage: string;
    title: string;
    name: string;
    isPriceRange: number;
    quantity: number;
}

interface MongoCartItem {
    id: string;
    source: "mongo";
    image: string;
    name: string;
    price: number;
    quantity: number;
}

type CartItem = ApiCartItem | MongoCartItem;

export default function CartPage() {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector<RootState, CartItem[]>((state) => state.cart.items);
    const { subtotal, discountAmount, taxAmount, total, shipping } = useSelector(selectCartSummary);
    const [showSpinWheel, setShowSpinWheel] = useState(true);
    const shippingOptions = useSelector((state: RootState) => state.cart.shippingOptions);
    const selectedShippingId = useSelector((state: RootState) => state.cart.selectedShippingId);

    const apiItems = cartItems.filter((item): item is ApiCartItem => item.source === "api");
    const mongoItems = cartItems.filter((item): item is MongoCartItem => item.source === "mongo");

    return (
        <section className="py-10 container max-w-screen-xl mx-auto">

            {cartItems.length === 0 ? (
                <section className="flex flex-col items-center gap-5">
                    <FaCartArrowDown className="text-5xl" />
                    <div className="font-bold text-2xl">Your cart is currently empty</div>
                    <Link href={"/products"} className="text-gray text-xl">
                        Start Shopping
                    </Link>
                </section>
            ) : (
                <section className="grid grid-cols-12 gap-5">
                    <div className="md:col-span-8 col-span-12 flex flex-col gap-4">
                        {apiItems.map((item) => (
                            <div key={item.id} className="flex md:flex-row flex-col items-center md:justify-between justify-center p-4 shadow-lg rounded-lg">
                                <img src={item.coverImage} alt={item.title} className="w-28 h-28 object-contain rounded-md" />
                                <div className="flex-1 px-4">
                                    <div className="text-xl font-thin">{item.name}</div>
                                    <div className="text-lg mt-1">
                                        {typeof item.isPriceRange === "number"
                                            ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.isPriceRange)
                                            : item.isPriceRange}
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer"
                                        aria-label={`Remove ${item.name} from cart`}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 mr-3">
                                    <button
                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                        className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <div className="text-lg font-semibold w-6 text-center">{item.quantity}</div>
                                    <button
                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                        className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}

                        {mongoItems.map((item) => (
                            <div key={item.id} className="flex gap-3 md:text-left text-center md:flex-row flex-col items-center md:justify-between justify-center p-4 shadow-lg rounded-lg">
                                <img src={item.image} alt={item.name} className="w-28 h-28 object-contain rounded-md" />
                                <div className="flex-1 px-4">
                                    <div className="text-xl font-thin">{item.name}</div>
                                    <p className="text-lg mt-1">
                                        {typeof item.price === "number"
                                            ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.price)
                                            : item.price}
                                    </p>
                                    <button
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                        className="bg-red-500 text-white px-3 py-2 rounded-lg cursor-pointer"
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2 md:mr-3 mr-0">
                                    <button
                                        onClick={() => dispatch(decreaseQuantity(item.id))}
                                        className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                    >
                                        -
                                    </button>
                                    <div className="text-lg font-semibold w-6 text-center">{item.quantity}</div>
                                    <button
                                        onClick={() => dispatch(increaseQuantity(item.id))}
                                        className="bg-gray-300 px-3 py-1 rounded cursor-pointer"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="md:col-span-4 col-span-12 p-5 bg-white rounded-lg shadow-lg flex flex-col gap-3">
                        <div className="text-xl font-bold mb-3">Order Summary</div>
                        {showSpinWheel && <SpinWheel onClose={() => setShowSpinWheel(false)} />}
                        <select
                            id="shippingMethod"
                            className="w-full border border-gray-300 rounded p-2 cursor-pointer"
                            value={selectedShippingId ?? ""}
                            onChange={(e) => dispatch(selectShippingOption(e.target.value))}
                        >
                            <option value="" disabled>
                                Select a shipping method
                            </option>
                            {shippingOptions.map((option) => (
                                <option key={option.id} value={option.id}>
                                    {option.name} - ${option.price.toFixed(2)}
                                </option>
                            ))}
                        </select>
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Discount:</span>
                            <span>
                                -{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
                                    .format(discountAmount)}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Tax:</span>
                            <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(taxAmount)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping:</span>
                            <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(shipping)}</span>
                        </div>
                        <hr />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>{new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(total)}</span>
                        </div>
                        <button className="mt-4 bg-green-500 text-white py-3 rounded-lg cursor-pointer">Proceed to Checkout</button>
                        {cartItems.length > 0 && (
                            <button
                                onClick={() => dispatch(clearCart())}
                                className="cursor-pointer bg-gray-700 text-white px-8 py-3 rounded-lg"
                            >
                                Clear Cart
                            </button>
                        )}
                    </div>
                </section>
            )}

        </section>
    );
}
