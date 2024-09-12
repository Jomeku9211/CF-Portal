import "../../styles/LandingPage/RoleInfo.css";
import Developer from "../../assets/LandingPage/developer.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const RoleInfoCard = () => {
  return (
    <div className="Role_Main_Div" data-testid="RoleInfocardId">
      <p className="Heading">Let’s make it easier together</p>
      <div className="Role_Div">
        <div className="role">
          <p>
            <span>
              <PlayArrowIcon />
            </span>
            CTO
          </p>
          <p>Agency Owner</p>
          <p>Senior Developer</p>
        </div>
        <p className="Role_Text">
          You’re struggling to find developers{" "}
          <span>
            who can match your high <span>code quality standards</span>
          </span>{" "}
          without
          <span>consuming too much of your valuable time.</span>
        </p>
      </div>
      <div className="Developer_Div">
        <img src={Developer} className="" />
        <div className="Developer_Div_Text">
          <p>
            You’re under <span>immense pressure to deliver software</span>{" "}
            that’s not just functional but robust and secure. The stakes are
            high, and you don’t have the luxury of time to{" "}
            <span>review every line of code</span> your developers produce.
          </p>
          <p>
            Every mistake a developer makes risks the smooth operation and
            scalability of the software—
            <span>putting your reputation on the line.</span>
          </p>
          <p>
            CoderFarm connects you with{" "}
            <span>rigorously vetted developers</span> skilled in high-quality,
            secure code. Our focus on <span>TDD ensures robust</span>, scalable
            software, letting you concentrate on strategy rather than code
            reviews.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleInfoCard;
