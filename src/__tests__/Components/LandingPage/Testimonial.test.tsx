import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Testimonial from "../../../components/LandingPage/Testimonial";

test("Landing Page testing ", () => {
  render(<Testimonial />);

  const TestimonialId = screen.getByTestId("TestimonialId");
  expect(TestimonialId).toBeInTheDocument();
});
