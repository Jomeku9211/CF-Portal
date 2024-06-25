import { render, screen } from "@testing-library/react";
import Header from "../components/HeaderComp/Header";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test("Render Header Component", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  const HeaderId = screen.getByTestId("HeaderId");
  expect(HeaderId).toBeInTheDocument();
});
