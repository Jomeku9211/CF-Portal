import { FaHeart } from "react-icons/fa";
import { GoArrowUpRight } from "react-icons/go";
import "../../styles/Footerstyles/Footer.css";
import Linkedin from "../../assets/LandingPage/linkedin.png";
import Instagram from "../../assets/LandingPage/instagram.png";
import Youtube from "../../assets/LandingPage/youtube.png";
import Facebook from "../../assets/LandingPage/facebook.png";
import Location from "../../assets/LandingPage/location.png";
import Phone from "../../assets/LandingPage/phoneNo.png";
import Email from "../../assets/LandingPage/email.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="Footer_Main" data-testid="FooterId">
      <div className="Footer_Main_UpperSection">
        <div className="Footer_Main_Box1">
          <p>Enhance your team and challenge the deadline!</p>
          <div className="">
            <p>Get Free Trial</p>
            <GoArrowUpRight width={120} />
          </div>
        </div>
        <div className="Footer_Main_Box2">
          <h4>About company</h4>
          <div>
            <p>Contact Us</p>
            <p>Term of service</p>
            <Link to={"/privacypolicy"}>
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>
        <div className="Footer_Main_Box3">
          <p>Social Media Links</p>
          <div>
            <a
              href="https://www.linkedin.com/company/coderfarm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Linkedin} alt="socialImg" className="Images" />
            </a>
            <a
              href="https://www.instagram.com/coderfarm.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Instagram} alt="socialImg" className="Images" />
            </a>
            <a
              href="https://www.youtube.com/@coderfarm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Youtube} alt="socialImg" className="Images" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100089786133908"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={Facebook} alt="socialImg" className="Images" />
            </a>
          </div>
        </div>
        <div className="Footer_Main_Box4">
          <p className="contact_text">Contact</p>
          <div className="Footer_Main_Box4_Location">
            <div className="contact">
              <img src={Location} className="Img" />
              <p>44/4, Pardesipura,Indore, India</p>
            </div>
            <div className="contact">
              <img src={Email} className="Img" />
              <div>
                <p>+91 731 420 3608</p>
                <p>+91 741 587 7680</p>
              </div>
            </div>
            <div className="contact">
              <img src={Phone} className="Img" />
              <div>
                <p>hr@coderfarm.in</p>
                <p>dheeraj.k@coderfarm.in</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Footer_Main_LowerSection">
        <p>&copy; 2024 CoderFarm.in. All right reserved.</p>
        <div>
          <p>Made with </p>
          <FaHeart />
        </div>
        <p className="policy">Privacy Policy</p>
      </div>
    </div>
  );
}

export default Footer;
