import { Carousel } from "react-bootstrap";
import { BannerCarouselConfig } from "./banner-carousel.config";

const BannerCarousel = (props: any) => {
    const carouselList = BannerCarouselConfig;
    return (
        <Carousel>
             {carouselList.map(carousel => (
                <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={carousel.imageSrc}
                    alt="First slide"
                />
            </Carousel.Item>
             ))}
            
        </Carousel>
    )
};

export default BannerCarousel;