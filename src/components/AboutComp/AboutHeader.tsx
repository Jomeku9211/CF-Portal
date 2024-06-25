import Programmer from "../../assets/Programmer.png";
import "../../styles/AboutUsStyles/AboutHeader.css"

const AboutHeader = () => {
  return (
    <div className="About_Main" data-testid="AboutHeaderId">
      <div className="AboutHeader_Main">
        <div className="AboutHeader_Main_Content_box">
          <h1>
            Coderfarm is an IT staffing company from the past 4 years, providing
            javascript framework developers to other IT startups in USA &
            Australia regions.
          </h1>
          <p>
            Unlike any regular staffing agency, coderfarm takes responsibility
            for the resources they provide.
          </p>
        </div>
        <div className="AboutHeader_Main_Image_box">
          <img title="CoderfarmLogo" src={Programmer} />
        </div>
      </div>
    </div>
  );
};

export default AboutHeader;