import React from "react";
import Carousel from "../feature/Home/Carousel";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import {
  fetchProductsByFeatured,
  fetchProductsByNewArrival,
} from "../app/data/productSlice";
import NewArrivals from "../feature/Home/NewArrivals";
import CollectionSection from "../feature/Home/CollectionSection";
import FeaturedSection from "../feature/Home/FeaturedSection";

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const { newArrivals, featuredProducts } = useSelector(
    (state: RootState) => state.products
  );

  React.useEffect(() => {
    dispatch(fetchProductsByNewArrival());
    dispatch(fetchProductsByFeatured());
  }, [dispatch]);

  return (
    <div>
      <Carousel />
      <NewArrivals newArrivals={newArrivals} />
      <CollectionSection />
      <FeaturedSection featuredProducts={featuredProducts} />
    </div>
  );
};

export default Home;
