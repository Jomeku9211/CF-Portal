import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AboutValues from "../../../components/AboutComp/AboutValues"

test( "render AboutValues Component", () => {
    render(<AboutValues />)

    const AboutInputId = screen.getByTestId("AboutInputId");
    expect(AboutInputId).toBeInTheDocument();
})

test("Testing image in AboutValues Component", () => {
    render(<AboutValues />)

    const ValuesImage = screen.getByTitle("ValuesImage");
    expect(ValuesImage).toBeInTheDocument();
})

test("Check if the specific text exits on AboutValues Component", () => {
    render(<AboutValues />)

    const textElement = screen.getByText(/Just like an Insurance/i);
    expect(textElement).toBeInTheDocument();
})