import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../../feature/Home/Carousel";

// Mock image imports
jest.mock("../../assets/images/Carousel-1.jpg", () => "carousel1.jpg");
jest.mock("../../assets/images/Carousel-2.jpg", () => "carousel2.jpg");
jest.mock("../../assets/images/Carousel-3.jpg", () => "carousel3.jpg");

describe("Carousel Component", () => {
  test("renders all slides correctly", () => {
    render(<Carousel />);

    // Check if all slides are in the document
    expect(screen.getByText(/Embrace the Cold/i)).toBeInTheDocument();
    expect(screen.getByText(/Step Into Elegance/i)).toBeInTheDocument();
    expect(screen.getByText(/Comfort Redefined/i)).toBeInTheDocument();
  });

  test("renders correct image for each slide", () => {
    render(<Carousel />);

    const images = screen.getAllByRole("img");
    expect(images[0]).toHaveAttribute("src", "carousel1.jpg");
    expect(images[1]).toHaveAttribute("src", "carousel2.jpg");
    expect(images[2]).toHaveAttribute("src", "carousel3.jpg");
  });

  test("navigates to the next and previous slide", () => {
    render(<Carousel />);

    // Initially, Slide 1 should be visible
    expect(screen.getByText(/Embrace the Cold/i)).toBeVisible();

    // Click the "Next" button to go to Slide 2
    const nextButton = screen.getAllByText("❯")[0];
    fireEvent.click(nextButton);
    expect(screen.getByText(/Step Into Elegance/i)).toBeVisible();

    // Click the "Previous" button to go back to Slide 1
    const prevButton = screen.getAllByText("❮")[1];
    fireEvent.click(prevButton);
    expect(screen.getByText(/Embrace the Cold/i)).toBeVisible();
  });
});
