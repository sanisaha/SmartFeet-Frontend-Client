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
  const dispatch: AppDispatch = useDispatch();
  const {
    items: products,
    loading,
    error,
  } = useSelector((state: RootState) => state.products);

  React.useEffect(() => {
    dispatch(fetchProducts(1, 10));
  }, [dispatch]);

  console.log(products);

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
