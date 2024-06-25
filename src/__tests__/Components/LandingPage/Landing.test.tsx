import { render ,screen} from "@testing-library/react";
import LandingPage from "../../../views/LandingPage/LandingPage";
import "@testing-library/jest-dom";

global.ResizeObserver = jest.fn(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));


test('Landing Page testing ', () => {
render(<LandingPage/>)  

const landingpageId= screen.getByTestId("LandingPageID")
expect(landingpageId).toBeInTheDocument();
})
