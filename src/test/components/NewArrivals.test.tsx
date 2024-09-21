import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import NewArrivals from "../../feature/Home/NewArrivals";
import { Product } from "../../models/product/Product";
import { waitFor } from "@testing-library/react";

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
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Running",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img1",
        productId: "1",
        imageURL: "nike.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Adidas Ultraboost",
    subCategoryId: "def456",
    description: "A sleek performance shoe",
    price: 180,
    stock: 30,
    brandName: "Adidas",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Running",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img2",
        productId: "2",
        imageURL: "adidas.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Puma Running Shoes",
    subCategoryId: "ghi789",
    description: "A stylish running shoe",
    price: 100,
    stock: 20,
    brandName: "Puma",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Running",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img3",
        productId: "3",
        imageURL: "puma.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Reebok Crossfit",
    subCategoryId: "jkl012",
    description: "A durable crossfit shoe",
    price: 130,
    stock: 15,
    brandName: "Reebok",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Sports",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img4",
        productId: "4",
        imageURL: "reebok.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Reebok Csfit",
    subCategoryId: "jkl012",
    description: "A durable crossfit shoe",
    price: 130,
    stock: 15,
    brandName: "Reebok",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Sports",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img4",
        productId: "4",
        imageURL: "reebok.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Reebok Crost",
    subCategoryId: "jkl012",
    description: "A durable crossfit shoe",
    price: 130,
    stock: 15,
    brandName: "Reebok",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Sports",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img4",
        productId: "4",
        imageURL: "reebok.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "7",
    title: "Reebok Csit",
    subCategoryId: "jkl012",
    description: "A durable crossfit shoe",
    price: 130,
    stock: 15,
    brandName: "Reebok",
    isFeatured: true,
    categoryName: "Men",
    subCategoryName: "Sports",
    orderItems: [],
    reviews: [],
    productImages: [
      {
        id: "img4",
        productId: "4",
        imageURL: "reebok.webp",
        isPrimary: true,
        createdAt: "2023-08-25",
        updatedAt: "2023-08-25",
      },
    ],
    productSizes: [],
    productColors: [],
    isInStock: jest.fn().mockReturnValue(true),
    updateStock: jest.fn(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe("NewArrivals Component", () => {
  test("renders section title", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );

    // Check for the title
    expect(screen.getByText(/New Arrivals/i)).toBeInTheDocument();
    expect(screen.getByText(/Just In Now/i)).toBeInTheDocument();
  });

  test("renders the first three products initially", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );

    // Check if the first three products are rendered
    expect(screen.getByText("Nike Air Max")).toBeInTheDocument();
    expect(screen.getByText("Adidas Ultraboost")).toBeInTheDocument();
    expect(screen.getByText("Puma Running Shoes")).toBeInTheDocument();

    // The fourth product should not be displayed initially
    expect(screen.queryByText("Reebok Crossfit")).toBeNull();
  });

  test("navigates to the product details page when product is clicked", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );

    // Click the product link
    const productLink = screen.getByRole("link", { name: /Nike Air Max/i });

    // Check that the link directs to the correct product details page
    expect(productLink).toHaveAttribute("href", "/shoes/1");
  });
  test("navigates to the next set of products when 'Next' button is clicked", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );

    // Click the next button
    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);

    // the next three products should be displayed
    expect(screen.getByText("Reebok Crossfit")).toBeInTheDocument();
    expect(screen.getByText("Reebok Csfit")).toBeInTheDocument();
    expect(screen.getByText("Reebok Crost")).toBeInTheDocument();
  });

  test("disables the next button when on the last page", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );

    // Click the next button twice to reach the last page
    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);
    fireEvent.click(nextButton); // Navigate to the third page

    // The next button should be disabled on the last page
    expect(nextButton).toBeDisabled();
  });

  test("disables the previous button when on the first page", () => {
    render(
      <Router>
        <NewArrivals newArrivals={mockProducts} />
      </Router>
    );
    // The previous button should be disabled on the first page
    const prevButton = screen.getByLabelText("Previous");
    expect(prevButton).toBeDisabled();
  });
});
