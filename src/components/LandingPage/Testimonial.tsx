import "../../styles/LandingPage/Testimonial.css";
import Person1 from "../../assets/LandingPage/Testimonial_images/Person1.png";
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
      image: Person1,
      description:
        "CoderFarm provides me with high quality  developers. It was good working with them. Best wishes to them.",
    },
    {
      name: "Hanna Botosh",
      image: Person1,
      description:
        "CoderFarm provides me with high quality  developers. It was good working with them. Best wishes to them.",
    },
    {
      name: "Hanna Botosh",
      image: Person1,
      description:
        "CoderFarm provides me with high quality  developers. It was good working with them. Best wishes to them.",
    },
  ];
  return (
    <>
      <div className="Testimonial_main_Container" data-testid="TestimonialId">
        <div className="Testimonial_Heading_Div">
          <h1>
            What <span>Our Client</span> Say
          </h1>
          <h1>about us</h1>
        </div>
        <div className="Testimonial_marquee">
          <div className="Testimonial_marqueeGroup2">
            {Testimonial_Data.map((data, index) => (
              <div key={index} className="Testimonial_Box">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
            ))}
          </div>
          <div className="Testimonial_marqueeGroup2">
            {Testimonial_Data.map((data, index) => (
              <div key={index} className="Testimonial_Box">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="Testimonial_marquee2">
          <div className="Testimonial_marqueeGroup2">
            {Testimonial_Data.map((data, index) => (
              <div key={index} className="Testimonial_Box">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
            ))}
          </div>
          <div className="Testimonial_marqueeGroup2">
            {Testimonial_Data.map((data, index) => (
              <div key={index} className="Testimonial_Box">
                <img
                  src={data.image}
                  alt="TestimonialImg"
                  className="Testimonial_Images"
                />
                <h1>{data.name}</h1>
                <p className="Testimonial_Description">{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
