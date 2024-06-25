import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import SoftwareProjectSuccess from "../../../components/LandingPage/SoftwareProjectSuccess ";
test("AutoSliderimages Testing ", () => {
  render(<SoftwareProjectSuccess />);
  const SoftwareProjectSuccessId = screen.getByTestId(
    "SoftwareProjectSuccessId"
  );
  expect(SoftwareProjectSuccessId).toBeInTheDocument();
});

it("Tesing a Text", () => {
  render(<SoftwareProjectSuccess />);
  const text_heading = screen.getByText(
    "Insure your Software Project Success, with manpower trained in latest coding practices"
  );
  expect(text_heading).toBeInTheDocument();
});

test("SoftwareProjectSuccess renders images with correct alt text", () => {
  render(<SoftwareProjectSuccess />);

  const handsImage = screen.getByAltText("handsImage");
  const handcoinsImage = screen.getByAltText("handcoinsImage");
  const magnifyingglassImage = screen.getByAltText("magnifyingglassImage");

  expect(handsImage).toBeInTheDocument();
  expect(handcoinsImage).toBeInTheDocument();
  expect(magnifyingglassImage).toBeInTheDocument();
});
