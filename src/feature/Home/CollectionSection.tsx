import collection1 from "../../assets/images/Collection-1.webp";
import collection2 from "../../assets/images/Collection-2.webp";
import { Link } from "react-router-dom";

const CollectionSection = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-4 md:gap-0 relative w-full md:w-3/4 h-auto md:h-[700px]">
        {/* First Image */}
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <picture>
            <source srcSet={collection1} type="image/webp" />
            <img
              src={collection1}
              alt="Gold Sea Beach Colors"
              className="object-cover w-full h-full rounded-tl-lg md:rounded-none hover:opacity-60"
            />
          </picture>
        </div>

        {/* First Text Section */}
        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-none md:rounded-tl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            Elegant Craftsmanship
          </h4>
          <h2 className="text-lg md:text-xl font-bold mt-1">
            Classic Formal Leather Shoes
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Impeccably crafted with a timeless design, these formal shoes
            combine style and comfort for the modern professional.
          </p>
          <Link
            to="/shoes"
            className="w-full md:w-1/2 m-4 bg-black text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:bg-gray-800 hover:scale-105 transition-transform"
          >
            Explore the collection
          </Link>
        </div>

        {/* Second Text Section */}
        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-none md:rounded-bl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            Fresh & Urban
          </h4>
          <h2 className="text-lg md:text-xl font-bold mt-1">
            Contemporary Streetwear Sneakers
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Designed for those who blend style with comfort, these sneakers
            boast a sleek modern look with cutting-edge details.
          </p>
          <Link
            to="/shoes"
            className="w-full md:w-1/2 m-4 bg-gradient-to-r from-orange-800 to-orange-950 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:scale-105 transition-transform"
          >
            Discover the range
          </Link>
        </div>

        {/* Second Image */}
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <picture>
            <source srcSet={collection2} type="image/webp" />
            <img
              src={collection2}
              alt="Gold Sea Beach Colors"
              className="object-cover w-full h-full rounded-bl-lg md:rounded-none hover:opacity-60"
            />
          </picture>
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
