import { render, screen } from "@testing-library/react";
import Footer from "../components/FooterComp/Footer";
import "@testing-library/jest-dom";

test("Render Footer Component", () => {
  render(<Footer />);
  const FooterId = screen.getByTestId("FooterId");
  expect(FooterId).toBeInTheDocument();
});