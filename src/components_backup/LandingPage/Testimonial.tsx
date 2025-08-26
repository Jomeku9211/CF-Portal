import "../../styles/LandingPage/Testimonial.css";
import StarIcon from "@mui/icons-material/Star";
import { Testimonial_Data } from "../../data/TrustedLeaders";

const Testimonial = () => {
  return (
    <div className="Testimonial_main_Container" data-testid="TestimonialId">
      <div className="Heading">
        <h1>Trusted By</h1>
         <p>Industry Leaders</p>
      </div>
      <div className="Testimonial_marquee">
        <div className="Testimonial_marqueeGroup2">
          {Testimonial_Data.map((data, index) => (
              <div key={index} className="Testimonial_Box">
                <img src={data.image} alt="TestimonialImg" />
                <h1>{data.name}</h1>
                <div className="stars">
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                  <StarIcon fontSize="small" />
                </div>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
