import { Button, Modal, Result, Skeleton } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { useState } from "react";
import CheckoutForm from "../../components/ui/CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useAppSelector } from "../../redux/hooks";

export function ProductDetails() {
  const productIdDb = useParams();
  const [openResponsive, setOpenResponsive] = useState(false);
  const [openOnSeccess, setOpenOnSeccess] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);
   const user = useAppSelector((state) => state.auth.user);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate()
  const stripePromise = loadStripe("pk_test_51QrhmoQIO6UUbte6TT60QTCzKDOiVs8i8PruR0QBEaGrppKDCBKIiIQPpN62wiYUJD5RNTDrfOVOTGWBXrrd7AVg00rjEtpvA7");

  const { data: singleProduct, isLoading } = useGetSingleProductQuery({ id: productIdDb?.id });
  const handleBooking = () => {
    setOpenResponsive(!openResponsive)
  }
  if (isLoading || !singleProduct) {
    return (
      <section className="bg-white">
        <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
          <div className="flex items-center lg:w-1/2 justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
            <Skeleton.Image style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="flex flex-col lg:w-1/2 justify-center items-start p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
            <div className="max-w-md w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
              <Skeleton active title={{ width: '60%' }} paragraph={{ rows: 1, width: ['80%'] }} />
              <div className="space-y-2">
                <Skeleton active paragraph={{ rows: 5, width: ['100%', '90%', '85%', '95%', '80%'] }} />
              </div>
              <div className="py-3">
                <Skeleton.Button active size="large" shape="round" />
              </div>
            </div>
          </div>
        </div>
      </section>
    );

  }

  return (
    <section className="bg-white ">
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
        <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
          <img src={singleProduct?.data?.photoURL} alt="Bike Image" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
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
                <span className={`${singleProduct?.data?.isAvailable ? "text-green-600" : "text-red-600"}`}>
                  {singleProduct?.data?.isAvailable ? "Available" : "Out of Stock"}
                </span>
              </p>

            </div>
            <div className="flex justify-items-start items-center gap-3">
              {user && user !== null?(<><div className="flex justify-center items-center gap-0">
                <button onClick={() => setQuantity(quantity + 1)} className="btn shadow-none border-none btn-sm btn-square rounded-none bg-[#8f8f8f]">+</button>
                <span className="btn btn-sm shadow-none border-none rounded-none bg-white text-black">{quantity}</span><button onClick={() => {
                  quantity <= 1 ?
                    setQuantity(1) :
                    setQuantity(quantity - 1)
                }} className="btn shadow-none border-none btn-sm btn-square rounded-none bg-[#8f8f8f]">-</button>
              </div>
              <div className="py-3">
                <Button type="primary" onClick={() => handleBooking()} disabled={!singleProduct?.data?.isAvailable}>Buy now</Button>
              </div></>):(<><Button type="primary" onClick={() => navigate('/login')} >Please Login </Button></>)}
            </div>
          </div>
        </div>
      </div>



      <Modal
        title="Confirm Payment"
        centered
        open={openResponsive}
        footer={null}
        onCancel={() => setOpenResponsive(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            productName={singleProduct?.data.productName}
            productId={singleProduct?.data.productId}
            price={singleProduct?.data.price}
            quantity={quantity}
            setOpenOnSeccess={setOpenOnSeccess}
            setOpenFailed={setOpenFailed}
            setOpenResponsive={setOpenResponsive}
          />
        </Elements>
      </Modal>
      <Modal
        
        centered
        open={openOnSeccess}
        footer={null}
        onCancel={() => setOpenOnSeccess(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Result
          status="success"
          title="Successfully Purchased "
          subTitle="Thanks for purchasing this product and your subscription"
          extra={[
            <Button type="primary" key="console">
             View all products
            </Button>,
            <Button key="buy">Give a review</Button>,
          ]}
        />
      </Modal>
      <Modal
        title="Payment Failed"
        centered
        open={openFailed}
        footer={null}
        onCancel={() => setOpenFailed(false)}
        width={{
          xs: '90%',
          sm: '80%',
          md: '70%',
          lg: '60%',
          xl: '50%',
          xxl: '40%',
        }}
      >
        <Result
          status="warning"
          title="Your payment has been failed. Contact with us for more information"
          extra={
            <Button type="primary" key="console">
              Contact with us
            </Button>
          }
        />
      </Modal>
    </section>
  );
}