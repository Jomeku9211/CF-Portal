import '../../styles/LandingPage/ClientLogos.css';

const ClientLogos = () => {
  return (
    <section className="client-logos-section">
      <div className="client-logos-container">
        <div className="client-logo-item">
          <div className="logo-wrapper">
            <img 
              src="/src/assets/LandingPage/Auto%20Slider%20Images/tedx.png" 
              alt="TEDx" 
              className="client-logo"
            />
            <span className="logo-text">X</span>
          </div>
        </div>
        
        <div className="client-logo-item">
          <img 
            src="/src/assets/LandingPage/Auto%20Slider%20Images/indorecity.png" 
            alt="Indore City" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src="/src/assets/LandingPage/canvass.png" 
            alt="Canvass" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src="/src/assets/LandingPage/Auto%20Slider%20Images/LyftedEdible.png" 
            alt="Lyfted Edible" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src="/src/assets/LandingPage/Auto%20Slider%20Images/Smartdata.png" 
            alt="Smart Data" 
            className="client-logo"
          />
        </div>
        
        <div className="client-logo-item">
          <img 
            src="/src/assets/LandingPage/Auto%20Slider%20Images/IITR.png" 
            alt="IITR" 
            className="client-logo"
          />
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
