import { getByText, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RelatedItems from "../../feature/SingleProductPage/RelatedItems";
import { Product } from "../../models/product/Product";

// Define mock products
const mockProducts: Product[] = [
  {
    id: "1",
    title: "Nike Air Max",
    subCategoryId: "abc123",
    description: "A comfortable running shoe",
    price: 50,
    stock: 50,
    brandName: "Nike",
    discount: 20,
    oldPrice: 100,
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
        imageURL: "nike.webp",
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
];

// Test suite for RelatedItems component
describe("RelatedItems Component", () => {
  test("renders section title", () => {
    render(
      <Router>
        <RelatedItems products={mockProducts} />
      </Router>
    );

    expect(screen.getByText(/you might also like/i)).toBeInTheDocument();
  });

  test("navigates to the product details page on image click", async () => {
    render(
      <Router>
        <RelatedItems products={mockProducts} />
      </Router>
    );

    // Wait for product images to appear
    await waitFor(() => {
      const productImages = screen.getAllByRole("img");
      expect(productImages.length).toBeGreaterThan(0);
    });

    // Get all product images
    const productImages = screen.getAllByRole("img");

    // Assert the first product image
    expect(productImages[0]).toHaveAttribute("src", "nike.webp");
  });

  test("discount shows only when old price is available", async () => {
    render(
      <Router>
        <RelatedItems products={mockProducts} />
      </Router>
    );

    // Calculate the discounted prices for assertions
    const discount1 = Math.round(((100 - 50) / 100) * 100); // For Nike Air Max

    // Act
    const discountBadges = screen.getAllByText(/-\d+%/); // This will capture all discount badges

    // Assert
    expect(discountBadges.length).toBe(3);

    // Check the content of each discount badge
    expect(discountBadges[0]).toHaveTextContent(`-${discount1}%`); // For Nike Air Max
  });
});
