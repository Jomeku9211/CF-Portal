import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeveloperCard from "../../../components/DeveloperComp/DeveloperCard";
import { developerData } from "../../../data/DeveloeprData";

test("Rendring Deeveloper Card", () => {
  render(<DeveloperCard />);

  const DeveloperCardId = screen.getByTestId("DeveloperCardId");
  expect(DeveloperCardId).toBeInTheDocument();
});

test("Checking Rendering Of DeveloperPhoto Component", () => {
  render(<DeveloperCard />);

  const DeveloperPhoto = screen.getByTestId("DeveloperPhotoId");
  expect(DeveloperPhoto).toBeInTheDocument();
});

test("Display Correct Developer Information", () => {
  render(<DeveloperCard />);

  const nameEle = screen.getByText(developerData.data.name);
  const designationEle = screen.getByText(developerData.data.designation);
  const availableTimeEle = screen.getByText(developerData.data.Expertice);

  expect(nameEle).toBeInTheDocument();
  expect(designationEle).toBeInTheDocument();
  expect(availableTimeEle).toBeInTheDocument();
});

test("testing the button", () => {
  render(<DeveloperCard />);

  const btn = screen.getByRole("button");
  expect(btn).toBeInTheDocument();
});
