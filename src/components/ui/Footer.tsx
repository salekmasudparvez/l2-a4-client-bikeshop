
import { TwitterOutlined, InstagramOutlined, FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 space-y-5">
        <div className="flex flex-col md:flex-row  items-center md:justify-between justify-center  space-y-6">
          {/* Logo with Bounce Animation */}
          <div className="md:w-1/3 text-center">
          <Logo/>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-8  justify-center md:w-1/3">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-125"
            >
              <TwitterOutlined className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors duration-300 transform hover:scale-125"
            >
              <InstagramOutlined className="text-2xl" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-125"
            >
              <FacebookOutlined className="text-2xl" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-red-600 transition-colors duration-300 transform hover:scale-125"
            >
              <YoutubeOutlined className="text-2xl" />
            </a>
          </div>

          {/* Footer Links */}
         <div className="md:w-1/3 flex justify-center">
         <div className="flex   md:flex-col space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              Home
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              About Us
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              Bikes
            </a>
            <a href="#" className="hover:text-yellow-400 transition-colors duration-300">
              Contact
            </a>
          </div>
         </div>

        </div>
        
          {/* Copyright part */}
          <p className="text-sm text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Gear Rush. All rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;