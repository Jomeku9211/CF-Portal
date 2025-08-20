import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhyUs from "../../../components/LandingPage/WhyUs";

describe("WhyUs Component", () => {
  beforeEach(() => {
    render(<WhyUs />);
  });

  test("renders WhyUs component with proper structure", () => {
    const whyus = screen.getByTestId("WhyUsId");
    expect(whyus).toBeInTheDocument();
    
    // Check for main heading (h1)
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("Why Choose CoderFarm?");
  });

  test("renders key benefits and features", () => {
    // Check for specific benefit headings
    const benefitHeadings = screen.getAllByRole("heading", { level: 2 });
    expect(benefitHeadings.length).toBeGreaterThan(0);
    
    // Check for specific benefits
    expect(screen.getByText("Personalized Short-Listing")).toBeInTheDocument();
    expect(screen.getByText("In-Depth Developer Profiles")).toBeInTheDocument();
    expect(screen.getByText("30-Day Risk-Free Trial")).toBeInTheDocument();
  });

  test("maintains proper semantic HTML structure", () => {
    const container = screen.getByTestId("WhyUsId");
    expect(container.tagName).toBe("DIV");
    expect(container).toHaveClass("Main_Div_Whyus");
    
    // Check for proper structure
    const whyusBox = container.querySelector('.Whyus_Box');
    expect(whyusBox).toBeInTheDocument();
  });

  test("ensures proper responsive design classes", () => {
    const container = screen.getByTestId("WhyUsId");
    expect(container).toHaveClass("Main_Div_Whyus");
    
    // Check for other important classes
    const whyusBox = container.querySelector('.Whyus_Box');
    expect(whyusBox).toHaveClass("Whyus_Box");
  });

  test("handles dynamic content updates gracefully", () => {
    // Test with different viewport sizes
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    fireEvent(window, new Event('resize'));
    
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    fireEvent(window, new Event('resize'));
    
    // Component should handle resize without errors
    expect(screen.getByTestId("WhyUsId")).toBeInTheDocument();
  });
});
