import "../../styles/LandingPage/Testimonial.css";
import Person1 from "../../assets/LandingPage/Testimonial_images/Person1.png";
import Person2 from "../../assets/LandingPage/Testimonial_images/Person2.png";
import Person3 from "../../assets/LandingPage/Testimonial_images/Person3.png";
import StarIcon from '@mui/icons-material/Star';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';


const Testimonial = () => {
  const Testimonial_Data = [
    {
      name: "James Herwitz",
      image: Person1,
      description:
        "CoderFarm provides me with high quality developers. It was good working with them. Best wishes to them.",
    },
    {
      name: "Hanna Botosh",
      image: Person2,
      description:
        "CoderFarm provides me with high quality  developers. It was good working with them. Best wishes to them.",
    },
    {
      name: "Cristofer Bergson",
      image: Person3,
      description:
        "CoderFarm provides me with high quality  developers. It was good working with them. Best wishes to them.",
    },
  ];
  return (
    <>
      <div className="Testimonial_main_Container" data-testid="TestimonialId">
        <div className="Testimonial_Heading_Div">
          <h1>
            Trusted By Industry Leaders
          </h1>
        </div>
        <div className="Testimonial_marquee">
          <div className="Testimonial_marqueeGroup2">
            {Testimonial_Data.map((data, index) => (
          <div>
                <div key={index} className="Testimonial_Box1">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
                <div className="stars"> 
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                </div>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
                <div key={index} className="Testimonial_Box2">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
               <div className="stars"> 
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                 <StarIcon fontSize="small"/>
                </div>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
          </div>
            ))}
          </div>
        </div>
        <div className="Start_btn">
           <button>Start Building Your Dream Team <span><ArrowOutwardIcon /></span></button>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
