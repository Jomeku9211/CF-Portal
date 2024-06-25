import AboutHeader from "../../components/AboutComp/AboutHeader";
import AboutInput from "../../components/AboutComp/AboutInput";
import AboutValues from "../../components/AboutComp/AboutValues";

const About = () => {
  return (
    <div data-testid="AboutId">
      <AboutHeader />
      <AboutValues />
      <AboutInput />
    </div>
  );
}

export default About
