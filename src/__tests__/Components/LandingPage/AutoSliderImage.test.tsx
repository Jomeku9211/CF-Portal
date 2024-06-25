import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AutoSliderimages from "../../../components/LandingPage/AutoSliderimages";

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));


test("AutoSliderImage component testing ", () => {
  render(<AutoSliderimages/>);

  const AutoSlider = screen.getByTestId("AutoSliderimagesID");
  expect(AutoSlider).toBeInTheDocument();
});
