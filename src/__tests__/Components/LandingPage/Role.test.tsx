import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Role from "../../../components/LandingPage/Role";

test("Rendering Role Component", () => {
  render(<Role />);

  const roleid = screen.getByTestId("RoleId");
  expect(roleid).toBeInTheDocument();
});
