"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import {
    EffectCoverflow,
    Pagination,
    Autoplay,
    Navigation,
} from "swiper/modules";

import Image from "next/image";
import Link from "next/link";

type SliderImage = {
    id: number;
    src: string;
    link: string;
};

const sliderImages: SliderImage[] = [
    { id: 1, src: "/images/hero1.jpg", link: "/products" },
    { id: 2, src: "/images/hero2.jpg", link: "/products" },
    { id: 3, src: "/images/hero3.jpg", link: "/products" },
    { id: 4, src: "/images/hero4.jpg", link: "/products" },
    { id: 5, src: "/images/hero5.jpg", link: "/products" },
    { id: 6, src: "/images/hero6.jpg", link: "/products" },
];

export default function Hero(): React.ReactElement {
    return (
        <section>
            <Swiper
                className="heroSlider"
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}

                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
                navigation={true}
                pagination={{ clickable: true }}
                loop={true}
                modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
            >
                {sliderImages.map((image: SliderImage) => (
                    <SwiperSlide key={image.id}>
                        <Link href={image.link}>
                            <Image
                                src={image.src}
                                alt={`Hero ${image.id}`}
                                width={1024}
                                height={1024}
                            />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
