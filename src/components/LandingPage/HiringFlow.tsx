// import "../../styles/LandingPage/HiringFlow.css";
import nishant from "../../assets/LandingPage/HiringFlowImages/DeveloperSelectionImages/nishant.svg";
import harsh from "../../assets/LandingPage/HiringFlowImages/DeveloperSelectionImages/harsh.svg";
import jayshree from "../../assets/LandingPage/HiringFlowImages/DeveloperSelectionImages/jayshree.svg";
import aditi from "../../assets/LandingPage/HiringFlowImages/DeveloperSelectionImages/aditi.svg";
import cursor from "../../assets/LandingPage/HiringFlowImages/DeveloperSelectionImages/cursor.svg";
import react from "../../assets/LandingPage/HiringFlowImages/SkillsIcons/React.svg";
import javascript from "../../assets/LandingPage/HiringFlowImages/SkillsIcons/Javascript.svg";
import css from "../../assets/LandingPage/HiringFlowImages/SkillsIcons/CSS3.svg";
import html from "../../assets/LandingPage/HiringFlowImages/SkillsIcons/HTML.svg";
import CheckCircle from "../../assets/LandingPage/HiringFlowImages/Trial Section/CheckCircle.svg";
import handshake from "../../assets/LandingPage/HiringFlowImages/Final Section/HandShake.svg";
import emoji from "../../assets/LandingPage/HiringFlowImages/Final Section/Emoji.svg";

const HiringFlow = () => {
  return (
    <div className="App" data-testid="HiringFlowID">
      <h1 className="heading_Of_Hiring_Flow">How we work</h1>
      <div className="hiring_Flow_Container">
        <div className="developer_Section">
          <span className="steps">01</span>
          <div className="developer_Section_Box">
            <div className="developer_List">
              <div className="developer_One">
                <img src={nishant} alt="" className="developer_image" />
                <span className="developer_One_Name">Nishant</span>

                <span className="skill_Icons">
                  <img src={react} alt="" />
                  <img src={javascript} alt="" />
                  <img src={css} alt="" />
                  <img src={html} alt="" />
                </span>
              </div>

              <div className="developer_Two">
                <img src={harsh} alt="" className="developer_image" />
                <span className="developer_Name">Harsh</span>
              </div>
              <div className="developer_Three">
                <img src={jayshree} alt="" className="developer_image" />
                <span className="developer_Name">Jayshree</span>
              </div>
              <div className="developer_Four">
                <img src={aditi} alt="" className="developer_image" />
                <span className="developer_Name">Aditi</span>
              </div>
              <img src={cursor} alt="" className="developer_Section_Cursor" />
            </div>
          </div>
          <div className="hiring_Flow_Text">
            <h1>Select from list of developers</h1>

            <p>
              Conducting a thorough job analysis with clients. This involves
              understanding.
            </p>
          </div>
        </div>
        <div className="interview_Section">
          <span className="steps">02</span>
          <div className="interview_Section_Box">
            <h3>Interview</h3>

            <p>7:00 PM IST | 15th May</p>
            <div className="interview_section_img_and_name">
              <img src={nishant} alt="" />
              <p>Nishant</p>
            </div>
            <div className="interview_Section_buttons">
              <button className="cancel_Button">Cancel</button>
              <button className="schedule_Button">Schedule</button>
            </div>
            <div className="interview_Section_Cursor">
              <img src={cursor} alt="" />
            </div>
          </div>
          <div className="hiring_Flow_Text">
            <h1>Schedule Interview</h1>
            <p>
              Matching the candidates with client’s requirements based on the
              job analysis.
            </p>
          </div>
        </div>
        <div className="trial_Section">
          <span className="steps">03</span>
          <div className="trial_Section_Box">
            <div className="section_One_Trial">
              <div>
                <h3> Interview </h3>
                <img src={CheckCircle} alt="" />
              </div>
            </div>
            <div className="section_Two_Trial">
              <img src={nishant} alt="" />
            </div>
            <div className="section_Three_Trial">
              <button>Start 7 days free trial</button>
            </div>
            <img src={cursor} className="trial_Box_Cursor" />
          </div>

          <div className="hiring_Flow_Text">
            <h1>Trial for 1 week</h1>

            <p>
              We can assess potential developer’s expertise using technical
              assessments, tailored to your project needs.
            </p>
          </div>
        </div>
        <div className="final_Section">
          <span className="steps">04</span>
          <div className="final_Section_Box">
            <div className="final_Section_Div1">
              <img src={nishant} alt="" />
              <span>Nishant</span>
            </div>
            <div className="final_Section_Div1">
              <img src={handshake} className="final_Section_Handshake" alt="" />
            </div>
            <div className="final_Section_Div1">
              <img src={emoji} className="final_Section_Emoji" alt="" />
              <span>You</span>
            </div>
          </div>
          <div className="hiring_Flow_Text">
            <h1>Work with them at no risk</h1>

            <p>
              Our scalable approach ensures that as your needs change over time,
              we can adjust the.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringFlow;
