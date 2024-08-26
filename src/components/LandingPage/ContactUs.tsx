import  "../../styles/LandingPage/ContactUs.css";
import contactImg from "../../assets/LandingPage/ContactUs/contactImg.png";
import contactImg1 from "../../assets/LandingPage/ContactUs/contactImg1.png";
import contactImg2 from "../../assets/LandingPage/ContactUs/contactImg2.png";
const ContactUs = () => {
  return (
    <div className="main_container_contact" data-testid="ContactUsId">
      <div className="ContactUs_main_container">
      <div className="image_container">
         <img src={contactImg} alt="" className="img1"/>
         <img src={contactImg1} alt="" className="img2"/>
         <img src={contactImg2} alt="" className="img3"/>
      </div>
      <div className="text_container">
        <h1>Not Ready to Commit? Learn More About Us</h1>
        <p>Can’t find the answer you’re looking for? Not sure which course is right for you? Please chat to our friendly team.</p>

        <button>Download Our Free Guide</button>
      </div>
    </div>
    </div>
  )
}

export default ContactUs
