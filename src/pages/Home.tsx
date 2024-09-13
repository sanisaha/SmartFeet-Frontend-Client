import React from "react";
import Carousel from "../shared/ui/Carousel";
import CollectionSection from "../shared/ui/CollectionSection";
import NewArrivals from "../shared/ui/NewArrivals";
import FeaturedSection from "../shared/ui/FeaturedSection";

const Home = () => {
  return (
    <div>
      <Carousel />
      <NewArrivals />
      <CollectionSection />
      <FeaturedSection />
    </div>
  );
};

export default Home;
