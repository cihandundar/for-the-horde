import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import OurServices from "@/components/our-services/OurServices";
import PopularProducts from "@/components/populer-products/PopularProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <OurServices />
      <PopularProducts />
    </>
  );
}
