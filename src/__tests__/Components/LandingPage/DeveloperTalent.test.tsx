import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeveloperTalent from "../../../components/LandingPage/DeveloperTalent";

test("Landing Page testing ", () => {
  render(<DeveloperTalent />);

  const DeveloperTalentId = screen.getByTestId("DeveloperTalentId");
  expect(DeveloperTalentId).toBeInTheDocument();
});

it("DeveloperTalent image testing", () => {
  render(<DeveloperTalent />);
  const imagetest = screen.getByTestId("image-testid");
  expect(imagetest).toBeInTheDocument();
});

it("Developer Talent Text Testing", () => {
  render(<DeveloperTalent />);
  const textTesing = screen.getByText("Your Problems, Our Solutions");
  expect(textTesing).toBeInTheDocument();
});
