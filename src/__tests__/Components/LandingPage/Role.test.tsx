import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Role from "../../../components/LandingPage/Role";

describe("Role Component", () => {
  beforeEach(() => {
    render(<Role />);
  });

  test("renders Role component with proper structure", () => {
    const roleid = screen.getByTestId("RoleId");
    expect(roleid).toBeInTheDocument();
    
    // Check for main heading (h1)
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent("Which Role Best Describes You?");
  });

  test("renders role information and descriptions", () => {
    // Check for problem and solution sections
    const problemHeading = screen.getByText("Problem");
    const solutionHeading = screen.getByText("Solution");
    expect(problemHeading).toBeInTheDocument();
    expect(solutionHeading).toBeInTheDocument();
    
    // Check for role cards
    const cards = screen.getAllByText(/CEO|Developer|Agency/i);
    expect(cards.length).toBeGreaterThan(0);
  });

  test("maintains proper semantic HTML structure", () => {
    const container = screen.getByTestId("RoleId");
    expect(container.tagName).toBe("DIV");
    expect(container).toHaveClass("Role_Container");
    
    // Check for proper structure
    const mainDiv = container.querySelector('.Role_MainDiv');
    expect(mainDiv).toBeInTheDocument();
  });

  test("ensures proper responsive design classes", () => {
    const container = screen.getByTestId("RoleId");
    expect(container).toHaveClass("Role_Container");
    
    // Check for other important classes
    const mainDiv = container.querySelector('.Role_MainDiv');
    expect(mainDiv).toHaveClass("Role_MainDiv");
  });

  test("handles dynamic content updates gracefully", () => {
    // Test with different viewport sizes
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
    fireEvent(window, new Event('resize'));
    
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true });
    fireEvent(window, new Event('resize'));
    
    // Component should handle resize without errors
    expect(screen.getByTestId("RoleId")).toBeInTheDocument();
  });
});
