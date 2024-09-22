import carousel1Small from "../../assets/images/Carousel-1_480.webp";
import carousel2Small from "../../assets/images/Carousel-2_480.webp";
import carousel3Small from "../../assets/images/Carousel-3_480.webp";
import carousel1Medium from "../../assets/images/Carousel-1_768.webp";
import carousel2Medium from "../../assets/images/Carousel-2_768.webp";
import carousel3Medium from "../../assets/images/Carousel-3_768.webp";
import carousel1Large from "../../assets/images/Carousel-1_1280.webp";
import carousel2Large from "../../assets/images/Carousel-2_1280.webp";
import carousel3Large from "../../assets/images/Carousel-3_1280.webp";
import carousel1ExtraLarge from "../../assets/images/Carousel-1_1920.webp";
import carousel2ExtraLarge from "../../assets/images/Carousel-2_1920.webp";
import carousel3ExtraLarge from "../../assets/images/Carousel-3_1920.webp";

const Carousel = () => {
  return (
    <div className="carousel w-full">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-full">
        <picture>
          <source
            srcSet={carousel1ExtraLarge}
            media="(min-width: 1280px)"
            type="image/webp"
          />
          <source
            srcSet={carousel1Large}
            media="(min-width: 1024px) and (max-width: 1279px)"
            type="image/webp"
          />
          <source
            srcSet={carousel1Medium}
            media="(min-width: 768px) and (max-width: 1024px)"
            type="image/webp"
          />
          <source
            srcSet={carousel1Small}
            media="(max-width: 767px)"
            type="image/webp"
          />
          <img
            src={carousel1ExtraLarge}
            alt="carousel-1"
            className="object-cover w-full h-full"
          />
        </picture>
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Embrace the Cold</h2>
            <p className="text-xl mb-4">
              Explore our exclusive Winter Collection
            </p>
            <button aria-label="shop now" className="btn btn-primary">
              Shop Now
            </button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide3"
            className="btn btn-circle"
            aria-label="Previous Slide"
          >
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle" aria-label="Next Slide">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-full">
        <picture>
          <source
            srcSet={carousel2ExtraLarge}
            media="(min-width: 1280px)"
            type="image/webp"
          />
          <source
            srcSet={carousel2Large}
            media="(min-width: 1024px) and (max-width: 1279px)"
            type="image/webp"
          />
          <source
            srcSet={carousel2Medium}
            media="(min-width: 768px) and (max-width: 1024px)"
            type="image/webp"
          />
          <source
            srcSet={carousel2Small}
            media="(max-width: 767px)"
            type="image/webp"
          />
          <img
            src={carousel2ExtraLarge}
            alt="carousel-2"
            className="object-cover w-full h-full"
          />
        </picture>
        <div className="absolute inset-0 flex items-center justify-start bg-black bg-opacity-10 p-14">
          <div className="text-center text-black">
            <h2 className="text-5xl font-bold mb-4">Step Into Elegance</h2>
            <p className="text-xl mb-4">
              Discover our new range of Formal Shoes
            </p>
            <button aria-label="view collection" className="btn btn-primary">
              View Collection
            </button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide1"
            className="btn btn-circle"
            aria-label="Previous Slide"
          >
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle" aria-label="Next Slide">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-full">
        <picture>
          <source
            srcSet={carousel3ExtraLarge}
            media="(min-width: 1280px)"
            type="image/webp"
          />
          <source
            srcSet={carousel3Large}
            media="(min-width: 1024px) and (max-width: 1279px)"
            type="image/webp"
          />
          <source
            srcSet={carousel3Medium}
            media="(min-width: 768px) and (max-width: 1024px)"
            type="image/webp"
          />
          <source
            srcSet={carousel3Small}
            media="(max-width: 767px)"
            type="image/webp"
          />
          <img
            src={carousel3ExtraLarge}
            alt="carousel-3"
            className="object-cover w-full h-full"
          />
        </picture>
        <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-10 p-16">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Comfort Redefined</h2>
            <p className="text-xl mb-4">
              The ultimate comfort shoes for everyday wear
            </p>
            <button aria-label="Explore now" className="btn btn-primary">
              Explore Comfort
            </button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a
            href="#slide2"
            className="btn btn-circle"
            aria-label="Previous Slide"
          >
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle" aria-label="Next Slide">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
