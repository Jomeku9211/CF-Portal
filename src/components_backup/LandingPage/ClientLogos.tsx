import '../../styles/LandingPage/ClientLogos.css';
import tedxLogo from '../../assets/LandingPage/Auto Slider Images/tedx.png';
import indorecityLogo from '../../assets/LandingPage/Auto Slider Images/indorecity.png';
import canvassLogo from '../../assets/LandingPage/canvass.png';
import lyftedEdibleLogo from '../../assets/LandingPage/Auto Slider Images/LyftedEdible.png';
import smartdataLogo from '../../assets/LandingPage/Auto Slider Images/Smartdata.png';
import iitrLogo from '../../assets/LandingPage/Auto Slider Images/IITR.png';

const ClientLogos = () => {
  return (
    <section className="client-logos-section">
      <div className="client-logos-container">
        <div className="client-logo-item">
          <div className="logo-wrapper">
            <img 
              src={tedxLogo}
              alt="TEDx" 
              className="client-logo"
            />
            <span className="logo-text">X</span>
          </div>
        </div>
        
        <div className="client-logo-item">
          <img 
            src={indorecityLogo}
            alt="Indore City" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src={canvassLogo}
            alt="Canvass" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src={lyftedEdibleLogo}
            alt="Lyfted Edible" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src={smartdataLogo}
            alt="Smart Data" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src={iitrLogo}
            alt="IITR" 
            className="client-logo"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
