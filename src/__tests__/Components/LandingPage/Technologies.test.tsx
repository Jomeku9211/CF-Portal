import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Technologies from "../../../components/LandingPage/Technologies";

test("testing technologies component", () => {
  render(<Technologies />);

  const TechnologiesId = screen.getByTestId("TechnologiesId");
  expect(TechnologiesId).toBeInTheDocument();
});

test("Rendering of technologies images", () => {
  render(<Technologies />);

  const images = screen.getAllByAltText("technologiesImg");
  for (let i = 0; i < images.length; i++) {
    expect(images[i]).toBeInTheDocument();
  }
});
