import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeveloperPhoto from "../../../components/DeveloperComp/DeveloperPhoto";

test( "Render DeveloperPhoto Component", () => {
    render(<DeveloperPhoto />)
    
    const DeveloperPhotoId = screen.getByTestId("DeveloperPhotoId");
    expect(DeveloperPhotoId).toBeInTheDocument();
})