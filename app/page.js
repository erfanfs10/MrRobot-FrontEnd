import UpdateNavigation from "@/components/navigation/UpdateNavigation";
import Hero from "@/components/home/Hero";
import HeroItems from "@/components/home/HeroItems";
import Features from "@/components/home/Features";
import TopSellersProducts from "@/components/home/TopSellersProducts";
import NewProducts from "@/components/home/NewProducts";
import RandomPosts from "@/components/home/RandomPosts";
import FAQ from "@/components/home/FAQ";

export default async function Home() {

  const navigationItems = [];

  return (
    <>
      <UpdateNavigation items={navigationItems} />
      <Hero/>
      <HeroItems/>
      <Features/>
      {/* <Categories /> */}
      <TopSellersProducts
        title="🔥 پرفروش ترین ها"
        buttonText="نمایش همه پرفروش ترین ها"
      />
      <NewProducts
        title="⚡ محصولات جدید"
        buttonText="نمایش همه محصولات جدید"
      />
      <RandomPosts
        title="پست های جدید"
      />
      <FAQ/>
      {/* <ProductDetail /> */}
    </>
  );
}
