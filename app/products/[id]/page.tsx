
import { Modal, PriceInfoCard, ProductCard } from "@/components"
import { getProductById, getSimilarProduct } from "@/lib/action"
import { formatNumber } from "@/lib/utils"
import { Product } from "@/types"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

type Props = {
  params: { id: string }
}

const productDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id)
  // console.log(product)

  if (!product) redirect('/')

  const similarProducts = await getSimilarProduct(id)
  // console.log(similarProducts)
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            width={580}
            height={400}
            className="mx-auto " />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex  flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">{product.title}</p>
              <Link href={product.url} target="_black" className="text-base opacity-50 text-black">
                Visit Product
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-[#FFF0F0] rounded-10">
                <Image
                  src={"/assets/icons/red-heart.svg"}
                  alt="heart"
                  width={20}
                  height={20} />
                <p className="text-[#D46F77] text-base font-semibold">{product.reviewsCount}</p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/bookmark.svg"}
                  alt="bookmark"
                  width={20}
                  height={20} />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  src={"/assets/icons/share.svg"}
                  alt="share"
                  width={20}
                  height={20} />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">{product.currency} {formatNumber(product.currentPrice)}</p>
              <p className="text-[21px] text-black opacity-50 line-through">{product.currency} {formatNumber(product.originalPrice)}</p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    src={"/assets/icons/star.svg"}
                    alt="star"
                    width={16}
                    height={16}
                    style={{
                      
                    }} />
                  <p className="text-sm text-primary-orange font-semibold">{product.stars}</p>
                </div>
                <div className="product-reviews">
                  <Image
                    src={"/assets/icons/comment.svg"}
                    alt="comment"
                    width={16}
                    height={16} />
                  <p className="text-sm text-secondary font-semibold">{product.reviewsCount}</p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93%</span>buyers have recommeded this.
              </p>
            </div>
          </div>

          <div className="flex my-7 flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title='current Price'
                iconssrc='/assets/icons/price-tag.svg'
                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                />

              <PriceInfoCard
                title='Average Price'
                iconssrc='/assets/icons/chart.svg'
                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                 />

              <PriceInfoCard
                title='Highest Price'
                iconssrc='/assets/icons/arrow-up.svg'
                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                 />

              <PriceInfoCard
                title='Lowest Price'
                iconssrc='/assets/icons/arrow-down.svg'
                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
               />
                
        
            </div>
          </div>
          <Modal productId = {id}/>
        </div>
      </div>
      <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl text-secondary font-semibold">Product Description</h1>
            <div className="flex flex-col gap-4">
              {
                product?.description?.split('\n')
              }
            </div>
          </div>
          <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
            <Image
            src='/assets/icons/bag.svg'
            width={22}
            height={22}
            alt="bag"/>
            <Link href={product.url} target="_blank">
            Buy Now
            </Link>
          </button>
        </div>
        { similarProducts &&
          similarProducts?.length>0 && (
            <div className="py-14 flex flex-col gap-2 w-full">
              <p className="section-text">Similar Product</p>
              <div className="flex flex-wrap w-full gap-10 mt-7">
                {
                  similarProducts.map((product:any)=><ProductCard key={product._id} product={product}/>)
                }
              </div>
            </div>
          )
        }
    </div>
  )
}

export default productDetails