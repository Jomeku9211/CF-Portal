import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RoleInfoCard from "../../../components/LandingPage/RoleInfoCard";

test("Testing Component", () => {
  render(<RoleInfoCard />);

  const rolecard = screen.getByTestId("RoleInfocardId");
  expect(rolecard).toBeInTheDocument();
});
