import React from "react";
import Carousel from "../shared/ui/Carousel";
import CollectionSection from "../shared/ui/CollectionSection";
import NewArrivals from "../shared/ui/NewArrivals";

const Home = () => {
  return (
    <div>
      <Carousel />
      <NewArrivals />
      <CollectionSection />
    </div>
  );
};

export default Home;
