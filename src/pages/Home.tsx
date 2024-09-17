import React from "react";
import Carousel from "../shared/ui/Carousel";
import CollectionSection from "../shared/ui/CollectionSection";
import NewArrivals from "../shared/ui/NewArrivals";
import FeaturedSection from "../shared/ui/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/data/store";
import {
  fetchProductsByFeatured,
  fetchProductsByNewArrival,
} from "../app/data/productSlice";

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
