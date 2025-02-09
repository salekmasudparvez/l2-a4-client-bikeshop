import { Spin } from "antd";
import { EffectCoverflow, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";


export default function Testimonial() {
    const comments = [
        {
            "customerName": "John Doe",
            "customerImage": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            "customerComment": "The bike is amazing! I love the design and the performance is top-notch. Highly recommend it.",
            "rating": 5,
            "productId": "MTR-001"
        },
        {
            "customerName": "Sarah Lee",
            "customerImage": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            "customerComment": "Great purchase! The delivery was fast, and the bike is smooth to ride. Definitely worth the money.",
            "rating": 4,
            "productId": "MTR-012"
        },
        {
            "customerName": "David Miller",
            "customerImage": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            "customerComment": "Comfortable and reliable, but I had a few issues with the braking system. Customer support was helpful though.",
            "rating": 3,
            "productId": "MTR-023"
        },
        {
            "customerName": "Emily Johnson",
            "customerImage": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            "customerComment": "I absolutely love my new bike! It's everything I wanted and more. Excellent quality and performance.",
            "rating": 5,
            "productId": "MTR-045"
        },
        {
            "customerName": "Michael Brown",
            "customerImage": "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
            "customerComment": "The bike has good performance but it was a bit heavier than I expected. Still, a great overall experience.",
            "rating": 4,
            "productId": "MTR-056"
        }
    ]

    return (
        <section className="my-8 bg-white ">
            <div className="container flex gap-3 flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
                <h1 className="p-4 text-3xl text-black font-bold leading-none text-center">What What Our Customers Are Saying</h1>
                <p className="text-base text-gray-400">Real Reviews from Real Riders – Gear Up with Confidence!</p>
            </div>
            <div className="container flex flex-col items-center justify-center mx-auto lg:flex-row lg:flex-wrap lg:justify-evenly lg:px-10">

                <Swiper
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}  
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {comments ? comments.map((comment, idx) => (<SwiperSlide key={idx}> <div className="flex flex-col max-w-sm mx-4 my-6 shadow-lg">
                        <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 ">
                            <p className="relative px-6 py-1 text-lg italic text-center text-gray-500">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF6F01" className="w-8 h-8 text-blue-400">
                                    <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                                    <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                                </svg>{comment?.customerComment}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#FF6F01" className="absolute right-0 w-8 h-8 text-blue-400">
                                    <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                                    <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                                </svg>
                            </p>
                        </div>
                        <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-blue-400 text-gray-900">
                            <img src={comment?.customerImage} alt={comment?.customerName} className="w-16 h-16 bg-white border  mb-2 -mt-16 bg-center bg-cover rounded-full " />
                            <p className="text-lg font-semibold leading-tight">{comment?.customerName}</p>

                        </div>
                    </div>  </SwiperSlide>)) : (
                        <div className="flex justify-center items-center">
                            <Spin></Spin>
                        </div>
                    )}



                </Swiper>
            </div>
        </section>
    );
}