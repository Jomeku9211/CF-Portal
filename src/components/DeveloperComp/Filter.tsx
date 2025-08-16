import "../../styles/Developer/Filter.css";

interface DomainItem {
  item: string;
  value: number;
}

interface FilterDataProps {
  title: string;
  data: DomainItem[];
}

interface FilterProps {
  FilterData: FilterDataProps;
}

function Filter(props: FilterProps) {
  return (
    <div
      className="Filter_Main"
      key={props.FilterData.title}
      data-testid="FilterId"
    >
      <p>{props.FilterData.title}</p>
      {props.FilterData.data.map((obj: DomainItem, index) => {
        return (
          <div
            className="Filter_Main_ListItem"
            key={`${props.FilterData.title}-${index}`}
          >
            <div className="flex items-center gap-2">
              <input
                  type="checkbox"
                id={obj.item}
                value={obj.item}
                name={obj.item}
              />
              <label htmlFor={obj.item}>{obj.item}</label>
            </div>
            <div className="Filter_Main_ListItem_value">
              <p>{obj.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
export default Filter;
