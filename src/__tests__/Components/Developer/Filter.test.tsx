import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Filter from "../../../components/DeveloperComp/Filter";

test("Render Filter Component", () => {

 const filterData = {
    title: "Filter data",
    data: [
        {item: "1", value: 10}
    ]
 }

  render(<Filter FilterData={filterData} />);

  const FilterId = screen.getByTestId("FilterId");
  expect(FilterId).toBeInTheDocument();
});
