import CFLogo from "../../assets/CFLogo.png";
import { Link } from "react-router-dom";
import "../../styles/HeaderStyles/Header.css";

function Header() {
  return (
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
            <Link to={"/blog"} className="NavLink">
              Blog
            </Link>
          </li>
          <li>
            <button className="Trial_Button">Get Free Trial</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
