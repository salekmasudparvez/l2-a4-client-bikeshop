import { Button, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";

export function ProductDetails() {
    const location = useLocation();
    const id = location?.pathname
    const { data: singleProduct, isLoading } = useGetSingleProductQuery({ id });

    if (isLoading) {
        return <div className="min-h-[calc(100vh-250px)] flex justify-center items-center">
            <Spin size="large"></Spin>
        </div>
    }
    return (
        <section className="bg-white ">
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={singleProduct?.data?.photoURL} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
                <div className="flex flex-col justify-center items-start  p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{singleProduct?.data?.productName}</h1>
                        <div className="space-y-2">
                            <p className="text-gray-400"><strong className="font-semibold">Brand:</strong> {singleProduct?.data?.brand}</p>
                            <p className="text-gray-400"><strong className="font-semibold">Model:</strong> {singleProduct?.data?.model}</p>
                            <p className="text-gray-400"><strong className="font-semibold">Category:</strong> {singleProduct?.data?.category}</p>
                            <p className="text-gray-400"><strong className="font-semibold">Description:</strong> {singleProduct?.data?.description}</p>
                            <p className="text-gray-400"><strong className="font-semibold">Price:</strong> <span className="text-red-400">${singleProduct?.data?.price}</span></p>
                            <p className="text-gray-400">
                                <strong className="font-semibold">Availability:</strong>{" "}
                                <span className={`${singleProduct?.data?.available ? "text-green-600" : "text-red-600"}`}>
                                    {singleProduct?.data?.available ? "Available" : "Out of Stock"}
                                </span>
                            </p>
                            <p className="text-gray-400"><strong className="font-semibold">Product Id:</strong> {singleProduct?.data?.productId}</p>
                        </div>
                        <div className="py-3">
                            <Button type="primary" disabled={!singleProduct?.data?.available}>Buy now</Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}