import React from "react";

interface StarRatingProps {
    rating: number;
    maxStars?: number;
}

export default function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const decimal = rating - fullStars;
    const hasHalfStar = decimal >= 0.25 && decimal < 0.75;
    const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(
            <svg
                key={"full_" + i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.044 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
        );
    }

    if (hasHalfStar) {
        stars.push(
            <svg
                key="half"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="url(#half-gradient)"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs>
                    <linearGradient id="half-gradient">
                        <stop offset="50%" stopColor="#fbbf24" />
                        <stop offset="50%" stopColor="#d1d5db" />
                    </linearGradient>
                </defs>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.044 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
        );
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(
            <svg
                key={"empty_" + i}
                className="w-5 h-5 text-gray-300"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.39 2.462a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.54 1.118l-3.39-2.462a1 1 0 00-1.175 0l-3.39 2.462c-.784.57-1.838-.197-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.044 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
            </svg>
        );
    }

    return <div className="flex space-x-1">{stars}</div>;
}
