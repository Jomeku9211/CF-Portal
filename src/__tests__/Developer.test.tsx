import { render, screen } from "@testing-library/react";
import Developer from "../views/DeveloperSection/Developer";
import "@testing-library/jest-dom";

test("Render Footer Component", () => {
  render(
      <Developer />
  );

  const DeveloperId = screen.getByTestId("DeveloperId");
  expect(DeveloperId).toBeInTheDocument();
});