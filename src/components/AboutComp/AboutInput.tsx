import "../../styles/AboutUsStyles/AboutInput.css";
import { useState, ChangeEvent } from "react";

const AboutInput = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="AboutInput_Main" data-testid="AboutInputId">
      <div className="AboutInput_Main_Values">
        <p>
          We all know that time is money... so stop wasting time, and save money
          with Rate It!
        </p>
      </div>
      <div className="AboutInput_Main_Inputs">
        <div className="AboutInput_Main_Inputs_Box1">
          <div>
            <p>First Name</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder=""
              className="inputField"
            />
          </div>
          <div>
            <p>Last Name</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder=""
              className="inputField"
            />
          </div>
          <div>
            <p>Mail</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder=""
              className="inputField"
            />
          </div>
          <div>
            <p>Phone</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder=""
              className="inputField"
            />
          </div>
          <div>
            <p>Message</p>
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Write your message"
              className="inputMessage mt-2 text-xs w-[100%] outline-none"
            />
          </div>
        </div>
        <button className="btn">Send Message</button>
      </div>
    </div>
  );
};

export default AboutInput;
