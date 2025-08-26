import "../../styles/LandingPage/Media.css";
import Flip from "../../assets/LandingPage/Media/flip.png";
import DailyHunt from "../../assets/LandingPage/Media/dailyhunt.png";
import RDTimes from "../../assets/LandingPage/Media/rdtimes.png";
import Naiduniya from "../../assets/LandingPage/Media/naiduniya.png";
import Republic from "../../assets/LandingPage/Media/republic.png";

const Media = () => {
  return (
    <div className="Media_Main_Div" data-testid="MediaTestId">
      <div className="Media_Heading">
        <p>Media & Partnerships</p>
      </div>
      <div className="Media_Partners">
        <div className="Media_Partners_Logos">
          <img src={Flip} alt="logo" />
          <img src={DailyHunt} alt="logo" />
          <img src={RDTimes} alt="logo" />
          <img src={Naiduniya} alt="logo" />
          <img src={Republic} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Media;
