import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Technologies from "../../../components/LandingPage/Technologies";

describe("Technologies Component", () => {
  beforeEach(() => {
    render(<Technologies />);
  });

  test("renders Technologies component with basic structure", () => {
    const container = screen.getByTestId("TechnologiesId");
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass("appContainer");
    
    // Check for main text
    const text = screen.getByText("Techs we are being obsessed with!");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text");
  });

  test("renders all technology images with correct alt text", () => {
    const imagesWithAlt = screen.getAllByAltText("technologiesImg");
    expect(imagesWithAlt.length).toBeGreaterThan(0);
    
    imagesWithAlt.forEach((image) => {
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("alt", "technologiesImg");
      expect(image).toHaveAttribute("src", "test-file-stub");
    });

    // Also check for images without alt text (first marquee group)
    const allImages = screen.getAllByRole("img");
    expect(allImages.length).toBeGreaterThan(imagesWithAlt.length);
  });

  test("has proper marquee structure", () => {
    const container = screen.getByTestId("TechnologiesId");
    
    // Check for wrapper
    const wrapper = container.querySelector('.wrapper');
    expect(wrapper).toBeInTheDocument();
    
    // Check for marquee containers
    const marquees = container.querySelectorAll('.marquee');
    expect(marquees).toHaveLength(2);
    
    // Check for marquee groups
    const marqueeGroups = container.querySelectorAll('.marqueeGroup');
    const marqueeGroups2 = container.querySelectorAll('.marqueeGroup2');
    expect(marqueeGroups.length).toBeGreaterThan(0);
    expect(marqueeGroups2.length).toBeGreaterThan(0);
  });

  test("handles image loading gracefully", () => {
    const images = screen.getAllByRole("img");
    
    // Test that images are properly mocked and don't cause errors
    images.forEach((image) => {
      expect(image).toHaveAttribute("src");
      fireEvent.load(image);
      fireEvent.error(image);
      expect(image).toBeInTheDocument();
    });
  });

  test("maintains proper CSS classes", () => {
    const container = screen.getByTestId("TechnologiesId");
    expect(container).toHaveClass("appContainer");
    
    // Check for image groups
    const imageGroups = container.querySelectorAll('.imageGroup');
    expect(imageGroups.length).toBeGreaterThan(0);
    
    imageGroups.forEach((group) => {
      expect(group).toHaveClass("imageGroup");
    });
  });

  test("displays main heading text correctly", () => {
    const text = screen.getByText("Techs we are being obsessed with!");
    expect(text).toBeInTheDocument();
    expect(text).toHaveClass("text");
    
    // Verify the text content
    expect(text.textContent).toBe("Techs we are being obsessed with!");
  });
});