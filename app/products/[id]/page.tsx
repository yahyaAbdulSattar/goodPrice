import { getProductById } from "@/lib/actions"
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { formatNumber } from "@/lib/util";
import PriceInfoCard from "@/components/PriceInfoCard";
import Modal from "@/components/Modal";

type Props = {
    params: {id: string}
}

const ProductDetails = async ({params: {id}}: Props) => {

    const product: Product = await getProductById(id);

    if(!product) redirect('/');

    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={580}
                        height={400}
                        className="mx-auto"
                    />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap">
                        <div className="flex flex-col gap-3">
                            <p className="text-[-28px] text-secondary font-semibold">{product.title}</p>

                            <Link
                                href={product.url}
                                target="_blank"
                                className="text-base text-black opacity-50"
                            >
                                Visit Product
                            </Link>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                    src="/assets/icons/red-heart.svg"
                                    alt="heart"
                                    width={20}
                                    height={20}
                                />

                                <p className="text-base font-semibold text-[#D46F77]">{product.reviewsCount}</p>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src="/assets/icons/bookmark.svg"
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image 
                                    src="/assets/icons/share.svg"
                                    alt="share"
                                    width={20}
                                    height={20}
                                />

                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>
                            <p className="text-[21px] text-black opacity-50 line-through">
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>
                        </div>

                        <div className="product-reviews">
                            <Image 
                                src="/assets/icons/comment.svg"
                                alt="comment"
                                width={16}
                                height={16}
                            />

                            <p className="text-sm text-secondary font-semibold">
                                {product.reviewsCount} Reviews
                            </p>
                        </div>
                    </div>

                    <p className="text-sm text-black opacity-50">
                        <span className="text-primary-green font-semibold">93%</span> of buyers have recommended this product
                    </p>

                </div>
            </div>

            <div className="my-7 flex flex-col gap-5">
                <div className="flex gap-5 flex-wrap">
                    <PriceInfoCard 
                        title="Current Price"
                        iconSrc="/assets/icons/price-tag.svg"
                        value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                        
                    />
                    <PriceInfoCard 
                        title="Average Price"
                        iconSrc="/assets/icons/chart.svg"
                        value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                        
                    />
                    <PriceInfoCard 
                        title="Highest Price"
                        iconSrc="/assets/icons/arrow-up.svg"
                        value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                       
                    />
                    <PriceInfoCard 
                        title="Current Price"
                        iconSrc="/assets/icons/arrow-down.svg"
                        value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                     
                    />
                </div>

            </div>

            <Modal productId={id}/>

        </div>
    )
}

export default ProductDetails