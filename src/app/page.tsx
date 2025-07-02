import AboutCards from "@/components/about/AboutCards";
import Accordion from "@/components/faq/Accordion";
import Blogs from "@/components/blogs/Blogs";
import Cta from "@/components/cta/Cta";
import Hero from "@/components/hero/Hero";
import OurServices from "@/components/our-services/OurServices";
import PopularProducts from "@/components/popular-products/PopularProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutCards />
      <OurServices />
      <PopularProducts />
      <Blogs />
      <Accordion />
      <Cta />
    </>
  );
}
