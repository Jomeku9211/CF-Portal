import Values from "../../assets/values.png";
import "../../styles/AboutUsStyles/AboutValues.css"

const AboutValues = () => {
  return (
    <div className="Aboutvalues_Main" data-testid="AboutInputId">
      <div className="Aboutvalues_Main_Box1">
        <img title="ValuesImage" src={Values} alt="Values"/>
      </div>
      <div className="Aboutvalues_Main_Box2">
        <h1>Our Six values</h1>
        <p>
          Just like an Insurance, Insurance to Projects; We at Coderfarm
          guarantee that you are protected by an accountable and responsible
          partner from all the hurdles coming in your way with the manpower
          hurdles.{" "}
        </p>
      </div>
    </div>
  );
}

export default AboutValues
