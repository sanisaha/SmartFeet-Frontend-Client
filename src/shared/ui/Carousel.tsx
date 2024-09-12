import React from "react";
import carousel1 from "../../assets/images/Carousel-1.jpg";
import carousel2 from "../../assets/images/Carousel-2.jpg";
import carousel3 from "../../assets/images/Carousel-3.jpg";

const Carousel = () => {
  return (
    <div className="carousel w-full h-[700px]">
      {/* Slide 1 */}
      <div id="slide1" className="carousel-item relative w-full h-full">
        <img src={carousel1} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">Embrace the Cold</h2>
            <p className="text-xl mb-4">
              Explore our exclusive Winter Collection
            </p>
            <button className="btn btn-primary">Shop Now</button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 2 */}
      <div id="slide2" className="carousel-item relative w-full h-full">
        <img src={carousel2} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-10 p-14">
          <div className="text-center text-black">
            <h2 className="text-5xl font-bold mb-4">Step Into Elegance</h2>
            <p className="text-xl mb-4">
              Discover our new range of Formal Shoes
            </p>
            <button className="btn btn-primary">View Collection</button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>

      {/* Slide 3 */}
      <div id="slide3" className="carousel-item relative w-full h-full">
        <img src={carousel3} className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-end bg-black bg-opacity-10 p-16">
          <div className="text-center text-black">
            <h2 className="text-5xl font-bold mb-4">Comfort Redefined</h2>
            <p className="text-xl mb-4">
              The ultimate comfort shoes for everyday wear
            </p>
            <button className="btn btn-primary">Explore Comfort</button>
          </div>
        </div>
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
