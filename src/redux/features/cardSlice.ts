import { createSlice, PayloadAction, } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";

export interface ApiCartItem {
    id: string;
    source: "api";
    coverImage: string;
    title: string;
    name: string;
    isPriceRange: number;
    quantity: number;
}

export interface ShippingOption {
    id: string;
    name: string;
    price: number;
}

export interface MongoCartItem {
    id: string;
    source: "mongo";
    image: string;
    name: string;
    price: number;
    quantity: number;
}

export type CartItem = ApiCartItem | MongoCartItem;

interface CartState {
    items: CartItem[];
    discount: number;
    taxRate: number;
    shippingCost: number;
    shippingOptions: ShippingOption[];
    selectedShippingId: string | null;
    couponCode: string | null;
}

const savedCart = typeof window !== "undefined" ? localStorage.getItem("cartItems") : null;

const initialState: CartState = {
    items: savedCart ? JSON.parse(savedCart) : [],
    discount: 0,
    taxRate: 0.18,
    shippingCost: 0,
    shippingOptions: [
        { id: "fast", name: "Fast Shipping", price: 15 },
        { id: "standard", name: "Standard Shipping", price: 7 },
        { id: "free", name: "Free Shipping", price: 0 },
    ],
    selectedShippingId: null,
    couponCode: null,
};

const saveToLocalStorage = (items: CartItem[]) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(items));
    }
};

const validCoupons: Record<string, number> = {
    "WELCOME10": 10,
    "VIP20": 20,
    "SPIN5": 5,
    "REACT19": 30,
    "NEXT14": 15,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
                toast.info(`${action.payload.name} quantity increased!`, {
                    position: "top-right",
                    autoClose: 2000,
                });
            } else {
                state.items.push(action.payload);
                toast.success(`${action.payload.name} added to cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
            saveToLocalStorage(state.items);
        },
        removeFromCart: (state, action: PayloadAction<string>) => {
            const removedItem = state.items.find((item) => item.id === action.payload);
            state.items = state.items.filter((item) => item.id !== action.payload);
            if (removedItem) {
                toast.error(`${removedItem.name} removed from cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
            saveToLocalStorage(state.items);
        },
        clearCart: (state) => {
            state.items = [];
            state.discount = 0;
            state.couponCode = null;
            toast.error("Cart has been cleared!", {
                position: "top-right",
                autoClose: 2000,
            });
            if (typeof window !== "undefined") {
                localStorage.removeItem("hasSpunWheel");
                localStorage.removeItem("wonCouponCode");
            }
            saveToLocalStorage(state.items);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                item.quantity += 1;
                saveToLocalStorage(state.items);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const item = state.items.find((i) => i.id === action.payload);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter((i) => i.id !== action.payload);
                }
                saveToLocalStorage(state.items);
            }
        },
        setShippingCost: (state, action: PayloadAction<number>) => {
            state.shippingCost = action.payload;
        },
        setDiscount: (state, action: PayloadAction<number>) => {
            state.discount = action.payload;
        },
        setTaxRate: (state, action: PayloadAction<number>) => {
            state.taxRate = action.payload;
        },
        selectShippingOption: (state, action: PayloadAction<string>) => {
            state.selectedShippingId = action.payload;
            const selected = state.shippingOptions.find(opt => opt.id === action.payload);
            state.shippingCost = selected ? selected.price : 0;
        },


        applyCoupon: (state, action: PayloadAction<string>) => {
            const code = action.payload.toUpperCase();
            if (validCoupons[code]) {
                state.discount = validCoupons[code];
                state.couponCode = code;
                toast.success(`Coupon applied: ${code} - ${validCoupons[code]}% off!`, {
                    position: "top-right",
                    autoClose: 2500,
                });
            } else {
                toast.warn("Invalid coupon code!", {
                    position: "top-right",
                    autoClose: 2500,
                });
                state.discount = 0;
                state.couponCode = null;
            }
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    setShippingCost,
    setDiscount,
    setTaxRate,
    selectShippingOption,
    applyCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartSummary = (state: RootState) => {
    const subtotal = state.cart.items.reduce((sum, item) => {
        const price = item.source === "api" ? item.isPriceRange : item.price;
        return sum + (Number(price) || 0) * item.quantity;
    }, 0);

    const discountAmount = (subtotal * (state.cart.discount || 0)) / 100;
    const taxAmount = (subtotal - discountAmount) * (state.cart.taxRate || 0);
    const total = subtotal - discountAmount + taxAmount + (state.cart.shippingCost || 0);

    return {
        subtotal,
        discountAmount,
        taxAmount,
        shipping: state.cart.shippingCost || 0,
        total,
    };
};
