import { render, screen } from "@testing-library/react";
import Header from "../components/HeaderComp/Header";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

test("Render Header Component", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Header />
      </AuthProvider>
    </BrowserRouter>
  );

  const HeaderId = screen.getByTestId("HeaderId");
  expect(HeaderId).toBeInTheDocument();
});
