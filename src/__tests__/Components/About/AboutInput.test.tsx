import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import AboutInput from "../../../components/AboutComp/AboutInput"

test( "Render AboutInput Component", () => {
    render(<AboutInput />)

    const AboutInputId = screen.getByTestId("AboutInputId");
    expect(AboutInputId).toBeInTheDocument();
})

test("Testing Input Fields", () => {
    render(<AboutInput />)

    const checkInputs = screen.getAllByRole("textbox");
    for (let i = 0; i < checkInputs.length; i++) {
      expect(checkInputs[i]).toBeInTheDocument();
    }     
})

test("Testing onChange Events", () => {
    render(<AboutInput />)

    const inputs = screen.getAllByRole("textbox");
    for(let i=0; i<inputs.length; i++){
        const input = inputs[i] as HTMLInputElement;
        fireEvent.change(input, { target: { value: "a" } });
        expect(input.value).toBe("a");
    }
})