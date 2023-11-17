import { HeroCarousel, ProductCard, SearchBar } from "@/components"
import Image from "next/image"
import { getAllProduct } from "@/lib/action"
const Home = async () => {
  const allProducts = await getAllProduct()



  return (
    <>
      <section className="px-6 md:px-20">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Search Shopping Starts Here:
              <Image
                src={'/assets/icons/arrow-right.svg'}
                width={16}
                height={16}
                alt="arrow-right" />
            </p>
            <h1 className="head-text">
              Unleash the power of <span className="text-primary" >PriceGrabber</span>
            </h1>
            <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>

            <SearchBar/>
          </div>
          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">
        Trending
        </h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product:any)=>(
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>

  
      </section>
    </>
  )
}

export default Home