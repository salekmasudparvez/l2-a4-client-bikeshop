import {Helmet} from "react-helmet";
import Carousel from "../../components/ui/Carousel";
import Features from "../../components/ui/Features";
import Testimonial from "../../components/ui/Testimonial";

export function Home() {

    return (
        <div className=""> 
            <Helmet>
                <meta charSet="utf-8" />
                <title>Gear Rush | Home</title>
            </Helmet>
            <Carousel/>
            <Features/>
            <Testimonial/>
        </div>
    );
}