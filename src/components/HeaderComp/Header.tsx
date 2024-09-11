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
        <p>
          <span>
            <GppGoodIcon sx={{ color: "#172EFF" }} />
          </span>
          30 days money back guaranty | Zero Down time gurantee{" "}
        </p>
        <div className="Upper_Main_items">
          <p>
            <span>
              <MailOutlineIcon />
            </span>
            dheeraj@coderfarm.in
          </p>
          <p>
            <span>
              <LocalPhoneOutlinedIcon />
            </span>
            9965348637
          </p>
          <p>
            <span>
              <FmdGoodOutlinedIcon />
            </span>
            Indore, India
          </p>
        </div>
      </div>
      <div className="Header_Main" data-testid="HeaderId">
        <div className="Header_Main_Logo">
          <Link to={"/"} className="Header_LogoLink">
            <img src={CFLogo} alt="" />
          </Link>
        </div>
        <div className="Header_Main_Components">
          <ul>
            <li>
              <Link to={"/about"} className="NavLink">
                <select name="" id="">
                  <option value="">Know us</option>
                  <option value="">Next</option>
                  <option value="">Next</option>
                </select>
              </Link>
            </li>
            <li>
              <Link to={"/developers"} className="NavLink">
                Developers
              </Link>
            </li>
            <li>
              <Link to={"/developers"} className="NavLink">
                About Us
              </Link>
            </li>
            <li>
              <Link to={"/blog"} className="NavLink">
                Blog
              </Link>
            </li>
            <li>
              <Link to={"/blog"} className="NavLink">
                Contact Us
              </Link>
            </li>
            <li>
              <button className="Trial_Button">
                Explore Developer Profiles
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
