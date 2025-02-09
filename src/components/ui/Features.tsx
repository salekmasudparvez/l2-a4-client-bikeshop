import { Button, Spin } from "antd";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../redux/features/product/productSlice";
import { useNavigate } from "react-router-dom";

export default function Features() {
    const navigate = useNavigate()
    const dataLimit = 6
    const { data: getProducts, isLoading } = useGetProductsQuery({ limit: dataLimit });
    return (
        <div className="space-y-5 mb-5">
            <div className="flex justify-center items-center flex-col gap-3">
                <h1 className="text-3xl font-bold text-center text-black">Features</h1>
                <p className="text-sm lg:w-2/3 text-center text-gray-400">Discover our top picks from the All Bikes collection! These handpicked motorbikes combine performance, style, and reliability to give you the ultimate riding experience. Whether you're looking for speed, comfort, or cutting-edge design, these featured bikes are sure to impress. Explore now and find your perfect ride!</p>
            </div>
            <div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-2">
                    {!isLoading ? (getProducts?.data?.map((product: TProduct, idx: any) => (
                        <ProductCard
                            key={idx}
                            productName={product?.productName}
                            model={product?.model}
                            category={product?.category}
                            brand={product?.brand}
                            price={product?.price}
                            available={product?.available}
                            photoURL={product?.photoURL}
                            url={`/product/${product?._id}`}
                        />
                    ))) : (<div className="flex justify-center items-center lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1">
                        <Spin size="large" />
                    </div>)}
                </div>

            </div>
            <div className="flex justify-center items-center">
                <Button onClick={()=>navigate('/all-products')} size="large" type="primary">
                    View All
                </Button>
            </div>
        </div>
    );
}