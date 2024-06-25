import "../../styles/LandingPage/DeveloperTrial.css";
const DeveloperTrial = () => {
  return (
    <>
      <div className="main_Container" data-testid="DeveloperTrialId">
        <div className="main_Heading_Div">
          <h1>
            Need Top - Tier Developers? <br /> <span> We Deliver !!</span>
          </h1>
        </div>
        <div className="Paragraph_div">
          <p>
            Coderfarm “Your One-Stop Shop for Scalable Development Teams”,{" "}
            <br /> <span>Build Your Dream Team</span>
          </p>
        </div>
        <div className="button_div">
          <button>
            Book your Free Strategy Session <span>&#8599;</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DeveloperTrial;
