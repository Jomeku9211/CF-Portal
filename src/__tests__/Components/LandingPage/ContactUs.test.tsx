import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactUs from "../../../components/LandingPage/ContactUs";

test("Contact us Page testing ", () => {
  render(<ContactUs />);

  const ContactUsId = screen.getByTestId("ContactUsId");
  expect(ContactUsId).toBeInTheDocument();
});
