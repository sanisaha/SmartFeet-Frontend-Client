import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CollectionSection from "../../feature/Home/CollectionSection";

// Mock image imports
jest.mock("../../assets/images/Collection-1.jpg", () => "collection1.jpg");
jest.mock("../../assets/images/Collection-2.jpg", () => "collection2.jpg");

describe("CollectionSection Component", () => {
  test("renders the CollectionSection component with all elements", () => {
    render(
      <Router>
        <CollectionSection />
      </Router>
    );

    // Check that both images are rendered
    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "collection1.jpg");
    expect(images[1]).toHaveAttribute("src", "collection2.jpg");

    // Check that both headings are rendered
    expect(
      screen.getByText(/Classic Formal Leather Shoes/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Contemporary Streetwear Sneakers/i)
    ).toBeInTheDocument();

    // Check that both descriptions are rendered
    expect(
      screen.getByText(
        /Impeccably crafted with a timeless design, these formal shoes combine style and comfort for the modern professional./i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Designed for those who blend style with comfort, these sneakers boast a sleek modern look with cutting-edge details./i
      )
    ).toBeInTheDocument();

    // Check the "Explore the collection" and "Discover the range" links
    const exploreLink = screen.getByText(/Explore the collection/i);
    const discoverLink = screen.getByText(/Discover the range/i);

    expect(exploreLink).toBeInTheDocument();
    expect(discoverLink).toBeInTheDocument();

    // Check the href of the links
    expect(exploreLink).toHaveAttribute("href", "/shoes");
    expect(discoverLink).toHaveAttribute("href", "/shoes");
  });

  test("renders links with correct classes and interactions", () => {
    render(
      <Router>
        <CollectionSection />
      </Router>
    );

    const exploreLink = screen.getByText(/Explore the collection/i);
    const discoverLink = screen.getByText(/Discover the range/i);

    // Check that the links have the right classes applied
    expect(exploreLink).toHaveClass("bg-black", "hover:bg-gray-800");
    expect(discoverLink).toHaveClass(
      "bg-gradient-to-r",
      "from-orange-800",
      "to-orange-950"
    );
  });
});
