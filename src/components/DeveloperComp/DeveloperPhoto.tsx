import { developerData } from "../../data/DeveloeprData";
import "../../styles/AboutUsStyles/AboutInput.css";
import BDD from "../../assets/BDD.png"

type DeveloperPhotoProps = {
  includeImage?: boolean;
}

function DeveloperPhoto({includeImage}: DeveloperPhotoProps) {
  return (
    <div
      className="h-[40%] w-[100%] flex items-center justify-center"
      data-testid="DeveloperPhotoId"
    >
      <div
        className="flex"
        style={{
          width: "50%",
          height: "80%",
          marginTop: "8%",
          zIndex: "1",
          alignItems: "center",
          justifyContent: "center",
          background: "#6495ED",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 0 10px rgba(100, 149, 237, 0.5)",
        }}
      >
        {developerData.data.img}
      </div>
      {includeImage && (
        <img src={BDD} className="absolute w-10 z-50 ml-[32%] mt-[-28%]"></img>
      )}
    </div>
  );
}

export default DeveloperPhoto;
