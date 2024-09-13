import React from "react";
import collection1 from "../../assets/images/Collection-1.jpg";
import collection2 from "../../assets/images/Collection-2.jpg";

const CollectionSection = () => {
  return (
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 flex justify-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-0 relative w-3/4 h-[700px]">
        {/* Image 1: High Heel */}
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img
            src={collection1}
            alt="Modern High Heel Brand"
            className="object-cover w-full h-full rounded-br-lg transition-opacity duration-500 ease-in-out hover:opacity-60"
          />
        </div>

        {/* Text 1: High Heel */}
        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-tl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            Sky Blue Vanishing Touches
          </h4>
          <h2 className="text-xl font-bold mt-1">Modern High Heel Brand</h2>
          <p className="mt-2 text-sm text-gray-600">
            Auctor augue mauris augue neque gravida. Risus at ultrices mi tempus
            imperdiet nulla malesuada.
          </p>
          <button className="mt-4 bg-beige-500 text-black font-semibold py-2 px-4 rounded">
            View collections
          </button>
        </div>

        {/* Text 2: Handbag */}
        <div className="col-span-1 row-span-1 flex flex-col justify-center px-6 bg-white rounded-bl-lg">
          <h4 className="text-xs uppercase font-semibold text-gray-500">
            New from True Brand
          </h4>
          <h2 className="text-xl font-bold mt-1">Gold Sea Beach Colors</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ac tortor vitae purus faucibus ornare suspendisse. Sodales ut etiam
            sit amet. Odio ut sem nulla pharetra.
          </p>
          <button className="mt-4 bg-beige-500 text-black font-semibold py-2 px-4 rounded">
            View all collections
          </button>
        </div>

        {/* Image 2: Handbag */}
        <div className="col-span-1 row-span-1 relative overflow-hidden">
          <img
            src={collection2}
            alt="Gold Sea Beach Colors"
            className="object-cover w-full h-full rounded-tr-lg transition-opacity duration-500 ease-in-out hover:opacity-60"
          />
        </div>
      </div>
    </div>
  );
};

export default CollectionSection;
