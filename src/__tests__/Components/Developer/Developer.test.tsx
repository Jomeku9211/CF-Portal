import { render, screen } from "@testing-library/react";
import Developer from "../../../views/DeveloperSection/Developer";
import "@testing-library/jest-dom";

beforeAll(() => {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(), 
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }));
});

test("Render Developer Component", () => {
  render(<Developer />);

  const DeveloperId = screen.getByTestId("DeveloperId");
  expect(DeveloperId).toBeInTheDocument();
});
