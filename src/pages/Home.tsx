import React from "react";
import Carousel from "../shared/ui/Carousel";
import CollectionSection from "../shared/ui/CollectionSection";
import NewArrivals from "../shared/ui/NewArrivals";
import FeaturedSection from "../shared/ui/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import { Product } from "../models/product/Product";
import { fetchProducts } from "../app/data/productSlice";

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
