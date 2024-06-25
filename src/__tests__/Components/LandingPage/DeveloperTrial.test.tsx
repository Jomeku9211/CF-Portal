import { render, screen } from "@testing-library/react";
import DeveloperTrial from "../../../components/LandingPage/DeveloperTrial";
import "@testing-library/jest-dom";

test("Developer Trial Testing", () => {
  render(<DeveloperTrial />);
  const developerTrial = screen.getByTestId("DeveloperTrialId");
  expect(developerTrial).toBeInTheDocument();
});

