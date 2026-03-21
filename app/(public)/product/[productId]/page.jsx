'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import BestSelling from "@/components/BestSelling";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSyncProductsFromLocalStorage } from "@/lib/hooks/useSyncProductsFromLocalStorage";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    // Sincronizar con localStorage (solo en cliente)
    useSyncProductsFromLocalStorage()

    useEffect(() => {
        if (products.length > 0) {
            const foundProduct = products.find((product) => product.id === productId);
            setProduct(foundProduct);
        }
        scrollTo(0, 0)
    }, [productId, products]);

    return (
        <div className="mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrums */}
                <div className="text-gray-600 text-sm mt-8 mb-5">
                    Home / Products / {product?.category}
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}

                {/* Related Products */}
                <hr className="border-gray-300 my-16" />
                <div className="mt-20 mb-28">
                    <h1 className="text-2xl text-slate-500">You may also <span className="text-slate-800 font-medium">like</span></h1>
                    <BestSelling />
                </div>
            </div>
        </div>
    );
}