import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom"
import DeveloperProfile from "../../../components/DeveloperComp/DeveloperProfile";
import { developerData } from "../../../data/DeveloeprData";

test( "Render DeveloperProfile Component", () => {
    render(<DeveloperProfile />)

    const DeveloperProfileId = screen.getByTestId("DeveloperProfileId");
    expect(DeveloperProfileId).toBeInTheDocument();
})

test("Render DeveloperPhoto Component", () => {
    render(<DeveloperProfile />)

    const DeveloperPhoto = screen.getByTestId("DeveloperPhotoId");
    expect(DeveloperPhoto).toBeInTheDocument();
})

test("Display Correct Developer Information", () => {
  render(<DeveloperProfile />);

  const nameEle = screen.getByText(developerData.data.name);
  const designationEle = screen.getByText(developerData.data.designation);
  const availableTimeEle = screen.getByText(developerData.data.availableTime);

  expect(nameEle).toBeInTheDocument();
  expect(designationEle).toBeInTheDocument();
  expect(availableTimeEle).toBeInTheDocument();
});

test("Check if the like button exits on Developer Profile", () => {
  render(<DeveloperProfile />);

  const Like = screen.getByTestId("LikeButtonId");
  expect(Like).toBeInTheDocument(); 
})