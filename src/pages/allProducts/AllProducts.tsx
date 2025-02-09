import { Button, Divider, Input, Spin } from "antd";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import ProductCard from "../../components/ui/ProductCard";
import { TProduct } from "../../redux/features/product/productSlice";
import { FilterFilled } from "@ant-design/icons";
import { useState } from "react";
import { FilterModal } from "../../components/filter/Filtermodal";
import { toast } from "sonner";



export default function AllProducts() {
    const [openFilter, setOpenFilter] = useState(false)
    const [searchTerm, setSearchTerm] = useState('');
    const [getminPrice, setMinPrice] = useState(0)
    const [getmaxPrice, setMaxPrice] = useState(Infinity)
    const [getmodel, setModel] = useState('');
    const [getbrand, setBrand] = useState('');

    const { data: getProducts, isLoading } = useGetProductsQuery({ search: searchTerm, brand: getbrand, model: getmodel, maxPrice: getmaxPrice, minPrice: getminPrice });

    const { Search } = Input
    const srcLoading = false
    const handleFillter = async (value: any) => {
        setMinPrice(value?.minPrice)
        setMaxPrice(value?.maxPrice)
        setModel(value?.model)
        setBrand(value?.brand)
    }
    const modelArray = [
        { name: "Homda", value: 'honda' },
        { name: "Yamaha", value: 'yamaha' }
    ]
    const brandArray = [
        { name: "Ford", value: 'ford' }
    ]
    const handleFillterFailed = (error: any) => {
        toast.error('Failed to filter')
    }
    const handleSearch = (event: any) => {
        event.preventDefault();
        setSearchTerm(event.target.value);
    }
    return (
        <div className="bg-white text-black ">
            <FilterModal
                models={modelArray}
                open={openFilter}
                setOpen={setOpenFilter}
                handleFillter={handleFillter}
                brands={brandArray}
                handleFillterFailed={handleFillterFailed}
            />
            {/*  header */}
            <div className="px-5 ">
                <h1> <Divider style={{ borderColor: '#7cb305', fontSize: '30px', fontWeight: 'bold' }}>All Products</Divider></h1>
            </div>
            {/* seacrh and filter  */}
            <div className="flex flex-row rounded-box justify-between shadow-md items-center my-5">
                <div className="px-5 md:w-1/2 w-2/3 flex justify-center items-center py-5">
                    <Search onChange={handleSearch} size="middle" placeholder="Search by name,brand, category" enterButton="Search" loading={srcLoading} />
                </div>
                <div className=" md:w-1/2 w-1/3 p-5   flex justify-end">
                    <Button onClick={() => setOpenFilter(!openFilter)} type="primary" icon={<FilterFilled />} />
                </div>
            </div>
            {/* show card */}
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-2">
                {!isLoading ? (getProducts?.data?.map((product: TProduct, idx: any) => (
                    <ProductCard
                        key={idx}
                        productName={product?.productName}
                        model={product?.model}
                        category={product?.category}
                        brand={product?.brand}
                        price={product?.price}
                        available={product?.isAvailable}
                        photoURL={product?.photoURL}
                        url={`/product/${product?._id}`}
                    />
                ))) : (<div className="flex justify-center items-center lg:col-span-4 md:col-span-3 sm:col-span-2 col-span-1">
                    <Spin size="large" />
                </div>)}
            </div>

        </div>
    );
}