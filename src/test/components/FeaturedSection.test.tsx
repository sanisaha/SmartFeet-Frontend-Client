import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FeaturedSection from "../../feature/Home/FeaturedSection";
import { Product } from "../../models/product/Product";
import { waitFor } from "@testing-library/react";

// Mocking image imports
jest.mock("../../assets/images/Collection-2.jpg", () => "collection2.jpg");

// Define mock products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Nike Air Max",
    subCategoryId: "abc123",
    description: "A comfortable running shoe",
    price: 120,
    stock: 50,
    brandName: "Nike",
    discount: 20,
    oldPrice: 150,
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Running",
    orderItems: [],
    reviews: [
      {
        id: "review1",
        productId: "1",
        userId: "user1",
        reviewDate: new Date("2023-09-01"),
        rating: 5,
        reviewText: "Great shoes, very comfortable!",
        reviewerName: "John Doe",
        createdAt: "2023-08-25",
        updatedAt: "2023-09-01",
      },
    ],
    subCategory: undefined,
    productImages: [
      {
        id: "img1",
        productId: "1",
        imageURL: "nike.jpg",
        isPrimary: true,
        createdAt: new Date("2023-08-01").toISOString(),
        updatedAt: new Date("2023-08-05").toISOString(),
      },
    ],
    productSizes: [
      {
        id: "size1",
        productId: "1",
        sizeValue: "Medium",
        quantity: 100,
        createdAt: new Date("2023-07-01").toISOString(),
        updatedAt: new Date("2023-07-10").toISOString(),
      },
    ],
    productColors: [
      {
        id: "color1",
        productId: "1",
        colorName: "Red",
        quantity: 100,
        createdAt: new Date("2023-07-01").toISOString(),
        updatedAt: new Date("2023-07-10").toISOString(),
      },
    ],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date("2023-06-15").toISOString(),
    updatedAt: new Date("2023-07-01").toISOString(),
  },
  {
    id: "2",
    title: "Adidas Ultraboost",
    subCategoryId: "def456",
    description: "A sleek performance shoe",
    price: 180,
    stock: 30,
    brandName: "Adidas",
    discount: 15,
    oldPrice: 200,
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Running",
    orderItems: [],
    reviews: [
      {
        id: "review2",
        productId: "2",
        userId: "user2",
        reviewDate: new Date("2023-08-01"),
        rating: 3,
        reviewText: "Good, but not the best.",
        reviewerName: "Jane Smith",
        createdAt: "2023-07-20",
        updatedAt: "2023-08-01",
      },
    ],
    subCategory: undefined,
    productImages: [
      {
        id: "img2",
        productId: "2",
        imageURL: "adidas.jpg",
        isPrimary: true,
        createdAt: new Date("2023-07-01").toISOString(),
        updatedAt: new Date("2023-07-15").toISOString(),
      },
    ],
    productSizes: [
      {
        id: "size2",
        productId: "2",
        sizeValue: "Large",
        quantity: 50,
        createdAt: new Date("2023-06-01").toISOString(),
        updatedAt: new Date("2023-06-10").toISOString(),
      },
    ],
    productColors: [
      {
        id: "color2",
        productId: "2",
        colorName: "Blue",
        quantity: 50,
        createdAt: new Date("2023-06-01").toISOString(),
        updatedAt: new Date("2023-06-10").toISOString(),
      },
    ],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date("2023-05-15").toISOString(),
    updatedAt: new Date("2023-06-01").toISOString(),
  },
];

// Test suite for FeaturedSection component
describe("FeaturedSection Component", () => {
  test("renders section title and filters", async () => {
    render(
      <Router>
        <FeaturedSection featuredProducts={mockProducts} />
      </Router>
    );

    // Check for title
    await waitFor(() => {
      expect(screen.getByText(/featured shoes/i)).toBeInTheDocument();
    });

    // Check for category buttons
    const categories = ["All", "Nike", "Adidas", "Men", "Women", "Kids"];
    categories.forEach(async (category) => {
      await waitFor(() => {
        expect(screen.getByText(category)).toBeInTheDocument();
      });
    });
  });

  test("renders products and displays correct price, title, and rating", () => {
    render(
      <Router>
        <FeaturedSection featuredProducts={mockProducts} />
      </Router>
    );

    // Check that Nike Air Max is rendered
    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();

    // Check for correct price
    expect(screen.getByText("€120")).toBeInTheDocument();

    // Check rating rendering
    expect(screen.getByText("★★★★★")).toBeInTheDocument(); // Average rating for Nike Air Max
  });

  test("filters products by category", () => {
    render(
      <Router>
        <FeaturedSection featuredProducts={mockProducts} />
      </Router>
    );

    // Initially, all products should be displayed
    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();
    expect(screen.getByText("Adidas Ultraboost")).toBeInTheDocument();

    // Click on the "Nike" filter button
    fireEvent.click(screen.getByText("Nike"));

    // Only Nike products should be displayed now
    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();
    expect(screen.queryByText("Adidas Ultraboost")).toBeNull();

    // Click on the "All" filter button
    fireEvent.click(screen.getByText("All"));

    // All products should be displayed again
    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();
    expect(screen.getByText("Adidas Ultraboost")).toBeInTheDocument();
  });

  test("navigates to product details page on product click", () => {
    render(
      <Router>
        <FeaturedSection featuredProducts={mockProducts} />
      </Router>
    );

    // Find the link to the product details page
    const productLink = screen.getByRole("link", { name: /Nike Air Max/i });

    // Check that the link is correct
    expect(productLink).toHaveAttribute("href", "/shoes/1");
  });
});
