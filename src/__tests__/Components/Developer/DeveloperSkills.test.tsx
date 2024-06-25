import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import DeveloperSkills from "../../../components/DeveloperComp/DeveloperSkills";

test("Render DeveloperSkills Component", () => {
  render(<DeveloperSkills />);

  const DeveloperSkillsId = screen.getByTestId("DeveloperSkillsId");
  expect(DeveloperSkillsId).toBeInTheDocument();
});

test("Left And Right buttons", () => {
   render(<DeveloperSkills />)

   const buttons = screen.getAllByRole("button");
  for(let i=0; i<buttons.length; i++){
    expect(buttons[i]).toBeInTheDocument();
  }
})
