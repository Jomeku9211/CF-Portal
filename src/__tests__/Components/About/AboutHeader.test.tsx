import AboutHeader from "../../../components/AboutComp/AboutHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

test("Render AboutHeader Component", () => {
  render(<AboutHeader />);

  const AboutHeaderId = screen.getByTestId("AboutHeaderId");
  expect(AboutHeaderId).toBeInTheDocument();
});

test("Testing Coderfarm Logo", () => {
  render(<AboutHeader />)

  const logo = screen.getByTitle("CoderfarmLogo");
  expect(logo).toBeInTheDocument();
})