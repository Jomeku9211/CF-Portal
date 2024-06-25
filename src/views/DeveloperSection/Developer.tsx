import "../../styles/Developer/Developer.css";
import filter from "../../assets/Filter.png";
import {
  DomainData,
  LevelData,
  ResponseTimeData,
  SDLCData,
} from "../../data/FilterData";
import Filter from "../../components/DeveloperComp/Filter";
import Stepper from "../../components/DeveloperComp/Stepper";
import DeveloperProfile from "../../components/DeveloperComp/DeveloperProfile";
import DeveloperSkills from "../../components/DeveloperComp/DeveloperSkills";
import Group from "../../assets/Group.png";
import { useState } from "react";
import DeveloperCard from "../../components/DeveloperComp/DeveloperCard";
import ReactDOM from "react-dom";
import { FaArrowTurnDown } from "react-icons/fa6";

function Developer() {
  const [isDragging, setIsDragging] = useState(false);
  const [developerCardVisible, setDeveloperCardVisible] = useState(false);
  const [droppedComponent, setDroppedComponent] = useState<JSX.Element | null>(
    null
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setDeveloperCardVisible(true);
    setDroppedComponent(<DeveloperCard />);
    e.dataTransfer.setData("text/plain", e.currentTarget.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!e.currentTarget.classList.contains("Developer_Main_Box4")) {
      return;
    }
    const data = e.dataTransfer.getData("text/plain");
    const draggableElement = document.getElementById(data);
    if (draggableElement && e.currentTarget instanceof HTMLElement) {
      setDeveloperCardVisible(true);
      setDroppedComponent(<DeveloperCard />);
      const developerMainBox = document.querySelector(
        ".Developer_Main_Box3_Developers"
      );
      if (developerMainBox) {
        const container = document.createElement("div");
        ReactDOM.render(<DeveloperCard />, container);
        developerMainBox.appendChild(container.firstChild!);
      }
    }
    setIsDragging(false);
  };

  return (
    <div
      className={`Developer_Main ${isDragging ? "blur-background" : ""}`}
      data-testid="DeveloperId"
    >
      <div className="Developer_Main_Box1">
        <div className="Developer_Main_Box1_Filter">
          <div>
            <img src={filter} alt="" />
            <p id="Filter_Para">&nbsp;Filter</p>
          </div>
        </div>
        <div className="Developer_Main_Box1_Data">
          <Filter FilterData={DomainData} />
          <Filter FilterData={LevelData} />
          <Filter FilterData={SDLCData} />
          <Filter FilterData={ResponseTimeData} />
          <Filter FilterData={DomainData} />
        </div>
      </div>
      <div className="Developer_Main_Box2">
        <div className="Developer_Main_Box2_Stepper">
          <Stepper />
        </div>
        <div
          className="Developer_Main_Box2_Profile"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggable="true"
          id="profile1"
        >
          <div className="Developer_Main_Box2_Profile_out">
            <div className="Developer_Main_Box2_Profile_out_major">
              <DeveloperProfile />
              <DeveloperSkills />
            </div>
          </div>
        </div>
        <div
          className="Developer_Main_Box2_Profile"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggable="true"
          id="profile1"
        >
          <div className="Developer_Main_Box2_Profile_out">
            <div className="Developer_Main_Box2_Profile_out_major">
              <DeveloperProfile />
              <DeveloperSkills />
            </div>
          </div>
        </div>
      </div>
      <div className="Developer_Main_Box3">
        <div className="Developer_Main_Box3_head">
          <img src={Group} />
          <p>Short Listed</p>
        </div>
        <div className="Developer_Main_Box3_Developers"></div>
      </div>
      <div
        className={`Developer_Main_Box4 ${
          developerCardVisible ? "" : "hidden"
        } ${isDragging ? "" : "hidden"}`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div
          className={`Developer_Main_Box4_Card ${
            developerCardVisible ? "" : "hidden"
          }`}
        >
          <div className="Developer_Main_Box4_Card_heading">
            <p>please drop Here </p>
            <FaArrowTurnDown />
          </div>
          {droppedComponent}
        </div>
      </div>
    </div>
  );
}

export default Developer;
