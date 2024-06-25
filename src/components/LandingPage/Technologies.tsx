import { tecnologiesData } from "../../data/ImageData";
import "../../styles/LandingPage/Technologies.css";

function Technologies() {
  return (
    <div className="appContainer" data-testid="TechnologiesId">
      <div className="wrapper">
        <div className="text">Techs we are being obsessed with!</div>
        <div className="marquee">
          <div className="marqueeGroup">
            {tecnologiesData.data.imagesSection1.map((data, index) => (
              <div key={index} className="imageGroup">
                <img src={data} alt="" />
              </div>
            ))}
          </div>
          <div className="marqueeGroup">
            {tecnologiesData.data.imagesSection1.map((data, index) => (
              <div key={index} className="imageGroup">
                <img src={data} alt="technologiesImg" />
              </div>
            ))}
          </div>
        </div>
        <div className="marquee">
          <div className="marqueeGroup2">
            {tecnologiesData.data.imagesSection2.map((data, index) => (
              <div key={index} className="imageGroup">
                <img src={data} alt="technologiesImg" />
              </div>
            ))}
          </div>
          <div className="marqueeGroup2">
            {tecnologiesData.data.imagesSection2.map((data, index) => (
              <div key={index} className="imageGroup">
                <img src={data} alt="technologiesImg" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technologies;
