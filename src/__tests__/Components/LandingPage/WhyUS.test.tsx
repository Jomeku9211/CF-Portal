import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import WhyUs from "../../../components/LandingPage/WhyUs";

test("Why-US component testing ", () => {
  render(<WhyUs />);

  const whyus = screen.getByTestId("WhyUsId");
  expect(whyus).toBeInTheDocument();
});
