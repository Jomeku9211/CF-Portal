import "../../styles/Developer/DeveloperProfile.css";
import DeveloperPhoto from "./DeveloperPhoto";
import { developerData } from "../../data/DeveloeprData";
import first from "../../assets/first 11.png";
import voice from "../../assets/voice 9.png";
import workingTime from "../../assets/working-time 9.png";
import FormControlLabel from "@mui/material/FormControlLabel";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

function DeveloperProfile() {

  const [countLike, setCountLike] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if(liked){
      setCountLike(countLike - 1)
    }else {
      setCountLike(countLike + 1)
    }
    setLiked(!liked);
  }

  return (
    <div className="DeveloperProfile_Main" data-testid="DeveloperProfileId">
      <div className="DeveloperProfile_Main_Box gap-1">
        <div className="LikeImage">
          <FormControlLabel
            control={
              <Checkbox
                icon={<FavoriteBorderIcon />}
                checkedIcon={<FavoriteIcon />}
              />
            }
            label={countLike}
            onClick={handleLike}
            data-testid="LikeButtonId"
          />
        </div>
        <DeveloperPhoto includeImage={true} />
        <div className="Developer_Personal_Details ">
          <p className="text-2xl font-bold">{developerData.data.name}</p>
        </div>
        <div className="">
          <p className="text-[#8B8B8B]">{developerData.data.designation}</p>
        </div>
        <div className="flex flex-col">
          <p className="mb-1 text-[#2C426B]">Expert Design</p>
        </div>

        <div className="flex flex-col w-[50%]">
          <div className="flex flex-row  items-center justify-start mb-1">
            <img src={first} alt="" style={{ height: "80%", width: "20%" }} />
            <p className="ml-3 text-gray-500">25</p>
          </div>
          <div className="flex flex-row items-center justify-start mb-1">
            <img src={voice} alt="" style={{ height: "80%", width: "20%" }} />
            <p className="ml-3 text-gray-500">English</p>
          </div>
          <div className="flex flex-row items-center justify-start mb-1">
            <img
              src={workingTime}
              alt=""
              style={{ height: "80%", width: "20%" }}
            />
            <p className="ml-3 text-gray-500 text-sm">
              {developerData.data.availableTime}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeveloperProfile;
