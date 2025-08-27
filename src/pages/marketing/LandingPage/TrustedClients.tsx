import tedx from "./../../assets/LandingPage/Auto Slider Images/tedx.png";
import IIT from "./../../assets/LandingPage/Auto Slider Images/IITR.png";
import LyftedEdible from "./../../assets/LandingPage/Auto Slider Images/LyftedEdible.png";
import smartdata from "./../../assets/LandingPage/Auto Slider Images/Smartdata.png";
import indore from "./../../assets/LandingPage/Auto Slider Images/indorecity.png";
import canvas from "../../assets/LandingPage/canvass.png"
import "../../styles/LandingPage/TrustedClients.css";
function TrustedClients() {
  return (
    <div data-testid="AutoSliderimagesID" className="main_container">
      <div className="Cleints_Logo">
        <img src={tedx} alt="slider_image" />
        <img src={canvas} alt="slider_image" />
        <img src={indore} alt="slider_image" />`  `
        <img src={IIT} alt="slider_image" />
        <img src={LyftedEdible} alt="slider_image" />
        <img src={smartdata} alt="slider_image" />
      </div>
    </div>
  );
}

export default TrustedClients;
