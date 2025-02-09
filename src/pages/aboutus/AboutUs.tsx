import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate()
    return (
        <div className=" py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center border-b border-b-gray-400 pb-5">
                    <h1 className="text-3xl font-bold text-black ">
                        Gear Rush
                    </h1>
                    <p className="mt-3 text-base text-gray-400 sm:mt-4">
                        Fueling Your Passion for the Open Road
                    </p>
                </div>

                {/* main part */}
                <div className="mt-10">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                        {/* Left part */}
                        <div className="prose prose-lg text-gray-600 lg:max-w-none">
                            <h2 className="text-xl font-bold text-gray-900">Our Story</h2>
                            <p className="text-sm text-gray-400">
                                At Gear Rush, our journey began with a shared love for motorcycles and the thrill of the open road. Founded in [year], we set out to create a one-stop destination for riders who demand the best in performance, style, and reliability. Whether you're a seasoned rider or just starting your journey, Gear Rush is here to fuel your passion.
                            </p>
                            <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                            <p className="text-sm text-gray-400">
                                Our mission is simple: to provide riders with top-quality gear, accessories, and expert advice to enhance every ride. We believe that the right gear can make all the difference, and we’re committed to helping you find exactly what you need.
                            </p>
                            <h2 className="text-xl font-bold text-gray-900">What Sets Us Apart</h2>
                            <p className="text-sm text-gray-400">
                                We don’t just sell products—we live the lifestyle. Every item in our store is handpicked by our team of riders, ensuring you get gear that’s as tough as you are. From helmets to boots, we’ve got you covered. Plus, we’re proud to support local riding communities and promote safe, responsible riding.
                            </p>
                        </div>

                        {/* Right part */}
                        <div className="mt-10 lg:mt-0">
                            <img
                                className="rounded-lg shadow-lg"
                                src="https://images.unsplash.com/photo-1600679472829-3044539ce8ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                                alt="Gear Rush Team"
                            />
                        </div>
                    </div>
                </div>

                {/* contact part*/}
                <div className="mt-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Join the Gear Rush Family</h2>
                    <p className="mt-4 text-lg text-gray-400">
                        Ready to gear up for your next adventure? Explore our collection today and experience the Gear Rush difference.
                    </p>
                    <div className="mt-6">
                        <Button
                           onClick={()=>navigate('/all-products')}
                           type="primary"
                           size="large"
                        >
                            Shop Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;