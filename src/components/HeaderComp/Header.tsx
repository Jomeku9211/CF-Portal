import CFLogo from "../../assets/CFLogo.png";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles/Header.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import GppGoodIcon from "@mui/icons-material/GppGood";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";

function Header() {
  return (
    <div>
      <div className="Upper_Main">
        <div className="guarantee-section">
          <div className="guarantee-item">
            <GppGoodIcon className="shield-icon" />
            <span>30 days money back guaranty</span>
          </div>
          <div className="divider"></div>
          <div className="guarantee-item">
            <span>Zero Down time gurantee</span>
          </div>
        </div>
        <div className="contact-section">
          <div className="contact-item">
            <MailOutlineIcon className="contact-icon" />
            <span>dheeraj@coderfarm.in</span>
          </div>
          <div className="contact-item">
            <LocalPhoneOutlinedIcon className="contact-icon" />
            <span>76940 46986</span>
          </div>
          <div className="contact-item">
            <FmdGoodOutlinedIcon className="contact-icon" />
            <span>Indore, India</span>
          </div>
        </div>
      </div>
      <div className="Header_Main" data-testid="HeaderId">
        <div className="Header_Main_Logo">
          <Link to={"/"} className="Header_LogoLink">
            <img src={CFLogo} alt="CoderFarm Logo" />
          </Link>
        </div>
        <div className="Header_Main_Components">
          <nav className="Header_Navigation">
            <Link to={"/about"} className="NavLink">
              About Us
            </Link>
            <Link to={"/developers"} className="NavLink">
              Developers
            </Link>
            <Link to={"/contact"} className="NavLink">
              Contact Us
            </Link>
            <Link to={"/developers"} className="Explore_Button">
              <span>Explore Developer Profiles</span>
              <svg className="arrow-icon" width="19" height="19" viewBox="0 0 19 19" fill="none">
                <path d="M3.14 4.13L13.75 4.13M13.75 4.13L13.75 14.74M13.75 4.13L4.13 13.75" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header;
