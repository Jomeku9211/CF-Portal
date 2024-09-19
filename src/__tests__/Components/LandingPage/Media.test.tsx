import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Media from "../../../components/LandingPage/Media";

test("Testing Media And Partners Component", () => {
  render(<Media />);

  const mediaid = screen.getByTestId("MediaTestId");
  expect(mediaid).toBeInTheDocument();
});
