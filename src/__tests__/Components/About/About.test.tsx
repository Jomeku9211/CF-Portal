import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import About from "../../../views/AboutSection/About";

test("Render About Components", () => {
  render(<About />);

  const AboutId = screen.getByTestId("AboutId");
  expect(AboutId).toBeInTheDocument();
});
