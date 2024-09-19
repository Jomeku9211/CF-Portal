import "../../styles/LandingPage/RoleInfo.css";
import Developer from "../../assets/LandingPage/developer.png";

const RoleInfoCard = () => {
  return (
    <div className="Role_Main_Div" data-testid="RoleInfocardId">
      <p className="Heading">Let’s make it easier together</p>
      <div className="Role_Div">
        <div className="role">
          <p>CTO</p>
          <p>Agency Owner</p>
          <p>Senior Developer</p>
        </div>
        <div className="Role_Text">
          <p>
            You’re struggling to find developers who can match your
            <span>
              high code quality standards without consuming too much time.
            </span>
          </p>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using.
          </p>
        </div>
      </div>
      <div className="Developer_Div">
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
        <img src={Developer} className="" />
      </div>
    </div>
  );
};

export default RoleInfoCard;
