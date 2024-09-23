import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DevelopersProfile from "../../../components/LandingPage/DevelopersProfile";

test("Testing Developers Profile Component", () => {
  render(<DevelopersProfile />);

  const developerid = screen.getByTestId("DeveloperID");
  expect(developerid).toBeInTheDocument();
});
