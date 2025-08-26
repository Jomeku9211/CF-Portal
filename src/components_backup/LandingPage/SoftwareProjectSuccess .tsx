import HandCoins from "../../assets/LandingPage/handCoins.png";
import MagnifyingGlass from "../../assets/LandingPage/magnifyingGlass.png";
import Hands from "../../assets/LandingPage/hands.png";
import "../../styles/LandingPage/SoftwareProjectSuccess.css";
const SoftwareProjectSuccess = () => {
  return (
    <div>
      <div
        className="LandingPage_Fourth_Section"
        data-testid="SoftwareProjectSuccessId"
      >
        <div className="Fourth_Section_Paragraph_Div">
          <p className="Fourth_Section_Paragraph">
            Insure your Software Project Success, with manpower trained in
            latest coding practices
          </p>
        </div>
        <div className="Fourth_Section_Boxes">
          <div className="HandShake_Box">
            <img src={Hands} alt="handsImage" className="Fourth_Section_Logo" />
            <p>Customized Developers</p>
          </div>
          <div className="HandCoins_Box">
            <img
              src={HandCoins}
              alt="handcoinsImage"
              className="Fourth_Section_Logo"
            />
            <p>Cost-Effective Solutions</p>
          </div>
          <div className="MagnifyingGlass_Box">
            <img
              src={MagnifyingGlass}
              alt="magnifyingglassImage"
              className="Fourth_Section_Logo"
            />
            <p>Try Before You Hire developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareProjectSuccess;
