import tedx from "./../../assets/LandingPage/Auto Slider Images/tedx.png";
import IIT from "./../../assets/LandingPage/Auto Slider Images/IITR.png";
import LyftedEdible from "./../../assets/LandingPage/Auto Slider Images/LyftedEdible.png";
import smartdata from "./../../assets/LandingPage/Auto Slider Images/Smartdata.png";
import canva from "./../../assets/LandingPage/Auto Slider Images/canva.png";
import "../../styles/LandingPage/AutoSliderImages.css";
function AutoSliderimages() {
  return (
    <div data-testid="AutoSliderimagesID" className="autoSlider_main_container">
      <h1 className="auto_Slider_Heading">Our Creative Partners</h1>
      <div className="box_Shadow">
        <div className="image_wrapper">
          <img src={tedx} alt="slider_image" />
        </div>
        <div className="image_wrapper">
          <img src={canva} alt="slider_image" />
        </div>
        <div className="image_wrapper2">
          <img src={IIT} alt="slider_image" />
        </div>
        <div className="image_wrapper">
          <img src={LyftedEdible} alt="slider_image" />
        </div>
        <div className="image_smartdata">
          <img src={smartdata} alt="slider_image" />
        </div>
      </div>
    </div>
  );
}

export default AutoSliderimages;
