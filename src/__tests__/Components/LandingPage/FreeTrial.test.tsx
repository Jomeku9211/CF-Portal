import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FreeTrial from "../../../components/LandingPage/FreeTrial";


test("Free Trial component testing ", () => {
  render(<FreeTrial />);

  const freeTrial = screen.getByTestId("FreeTrialId");
  expect(freeTrial).toBeInTheDocument();
});
