import { developerData } from "../../data/DeveloeprData";
import "../../styles/Developer/DeveloperCard.css";
import DeveloperPhoto from "./DeveloperPhoto";

const DeveloperCard = () => {
  return (
    <div className="DeveloperCard_Main" data-testid="DeveloperCardId">
      <DeveloperPhoto includeImage={false} />
      <div className="DeveloperCard_Main_Card">
        <div className="DeveloperCard_Main_Card_Text">
          <p>{developerData.data.name}</p>
          <p>{developerData.data.designation}</p>
          <p>{developerData.data.Expertice}</p>
        </div>
        <div className="DeveloperCard_Main_Card_Button">
          <button>Schedule</button>
        </div>
      </div>
    </div>
  );
};
export default DeveloperCard;
