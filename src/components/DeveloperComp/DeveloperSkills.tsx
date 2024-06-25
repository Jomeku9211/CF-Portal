import { useRef, useState } from "react";
import { developerData } from "../../data/DeveloeprData";
import "../../styles/Developer/DeveloperSkill.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function DeveloperSkills() {
  const [scrollPosition, setScrollPosition] = useState({
    Languages: 0,
    Framework: 0,
    TechTools: 0,
    CloudService: 0,
    Database: 0,
    CodingPractice: 0,
    Domain: 0,
  });

  const [scrollLeftButtonVisible, setScrollLeftButtonVisible] = useState({
    Languages: false,
    Framework: false,
    TechTools: false,
    CloudService: false,
    Database: false,
    CodingPractice: false,
    Domain: false,
  });

  const languagesContainerRef = useRef<HTMLDivElement>(null);
  const frameworkContainerRef = useRef<HTMLDivElement>(null);
  const techToolsContainerRef = useRef<HTMLDivElement>(null);
  const CloudServiceContainerRef = useRef<HTMLDivElement>(null);
  const DatabaseContainerRef = useRef<HTMLDivElement>(null);
  const CodingPracticeContainerRef = useRef<HTMLDivElement>(null);
  const DomainContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right", section: string) => {
    const scrollAmount = 40;
    const containerRefs: { [key: string]: React.RefObject<HTMLDivElement> } = {
      Languages: languagesContainerRef,
      Framework: frameworkContainerRef,
      TechTools: techToolsContainerRef,
      CloudService: CloudServiceContainerRef,
      database: DatabaseContainerRef,
      CosingPractice: CodingPracticeContainerRef,
      Domain: DomainContainerRef,
    };
    const containerRef = containerRefs[section].current;

    if (containerRef) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef;

      if (direction === "right") {
        containerRef.scrollLeft += scrollAmount;

        // Check if there's more content to scroll right, if not, hide left button
        if (scrollLeft + clientWidth + scrollAmount >= scrollWidth) {
          setScrollLeftButtonVisible({
            ...scrollLeftButtonVisible,
            [section]: false,
          });
        } else {
          setScrollLeftButtonVisible({
            ...scrollLeftButtonVisible,
            [section]: true,
          });
        }
      } else {
        containerRef.scrollLeft -= scrollAmount;
      }
      //       if (containerRef.scrollLeft === 0) {
      //   setScrollLeftButtonVisible({...scrollLeftButtonVisible, [section]: false })
      // } else {
      //   setScrollLeftButtonVisible({...scrollLeftButtonVisible, [section]: true })
      // }

      setScrollLeftButtonVisible({
        ...scrollLeftButtonVisible,
        [section]: true,
      });

      setScrollPosition((prevScrollPositions) => ({
        ...prevScrollPositions,
        [section]: containerRef.scrollLeft,
      }));
    }
  };

  return (
    <div className="DeveloperSkill_Main" data-testid="DeveloperSkillsId">
      <div className="DeveloperSkill_Main_Box">
        <div className="DeveloperSkill_Main_Box_Languages">
          <div className="languages">
            <p className="heading">Languages</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.Languages && (
                <button
                  className="Scroll_Button"
                  onClick={() => handleScroll("left", "Languages")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Languages_Box1"
                id="languagesContainer"
                ref={languagesContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.Languages.map((data, index) => {
                  return (
                    <div key={index} className="inner_content">
                      <img src={data.image} className="w-5" />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button"
                onClick={() => handleScroll("right", "Languages")}
              >
                <IoIosArrowForward />
              </button>
            </div>
            <p className="heading">Framework</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.Framework && (
                <button
                  className="Scroll_Button"
                  onClick={() => handleScroll("left", "Framework")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Languages_Box1"
                id="frameworkContainer"
                ref={frameworkContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.Framework.map((data, index) => {
                  return (
                    <div key={index} className="inner_content">
                      <img src={data.image} alt="" className="w-5" />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button"
                onClick={() => handleScroll("right", "Framework")}
              >
                <IoIosArrowForward />
              </button>
            </div>
            <p className="heading">Tool & Tech</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.TechTools && (
                <button
                  className="Scroll_Button"
                  onClick={() => handleScroll("left", "TechTools")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Languages_Box1"
                id="techToolsContainer"
                ref={techToolsContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.TeclTools.map((data, index) => {
                  return (
                    <div key={index} className="inner_content ">
                      <img src={data.image} alt="" className="w-5" />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button"
                onClick={() => handleScroll("right", "TechTools")}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
        <div className="DeveloperSkill_Main_Box_Services">
          <div className="DeveloperSkill_Main_Box_Cloud">
            <p className="heading">Cloud Service</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.CloudService && (
                <button
                  className="Scroll_Button"
                  onClick={() => handleScroll("left", "CloudService")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Languages_Box1"
                id="CloudServiceContainer"
                ref={CloudServiceContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.CloudService.map((data, index) => {
                  return (
                    <div key={index} className="inner_content ">
                      <img src={data.image} alt="" className="w-5" />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button"
                onClick={() => handleScroll("right", "CloudService")}
              >
                <IoIosArrowForward />
              </button>
            </div>
            <p className="heading">Database</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.Database && (
                <button
                  className="Scroll_Button"
                  onClick={() => handleScroll("left", "database")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Languages_Box1"
                id="databaseContainer"
                ref={DatabaseContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.Database.map((data, index) => {
                  return (
                    <div key={index} className="inner_content ">
                      <img src={data.image} alt="" className="w-5" />
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button"
                onClick={() => handleScroll("right", "database")}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
          <div className="DeveloperSkill_Main_Box_Coding">
            <p className="font-medium text-sm ml-[7%]">Coding Practice</p>
            <div className="Developer_Skills_Box">
              {scrollLeftButtonVisible.CodingPractice && (
                <button
                  className="Scroll_Button_Coding"
                  onClick={() => handleScroll("left", "CodingPractice")}
                >
                  <IoIosArrowBack />
                </button>
              )}
              <div
                className="DeveloperSkill_Main_Box_Coding_Box1"
                id="codingPracticeContainer"
                ref={CodingPracticeContainerRef}
                style={{ transform: `translateX(${-scrollPosition}px)` }}
              >
                {developerData.data.CodingPractice.map((data, index) => {
                  return (
                    <div key={index} className="inner_content1">
                      <p>{data.name}</p>
                    </div>
                  );
                })}
              </div>
              <button
                className="Scroll_Button_Coding"
                onClick={() => handleScroll("right", "CodingPractice")}
              >
                <IoIosArrowForward />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="DeveloperSkill_Main_Box_Bottom_Section">
        <div className="DeveloperSkill_Main_Box_Bottom_Section_Domain">
          <p className="font-medium text-sm ml-[10%]">Domain</p>
          <div className="Developer_Domain_Box">
            {scrollLeftButtonVisible.Domain && (
              <button
                className="Scroll_Button_Coding"
                onClick={() => handleScroll("left", "Domain")}
              >
                <IoIosArrowBack />
              </button>
            )}
            <div
              className="DeveloperSkill_Main_Box_Coding_Box1"
              id="domainContainer"
              ref={DomainContainerRef}
              style={{ transform: `translateX(${-scrollPosition}px)` }}
            >
              {developerData.data.Domain.map((data, index) => {
                return (
                  <div key={index} className="inner_content1">
                    <p className="w-20 ml-[10%] font-semibold">{data.name}</p>
                  </div>
                );
              })}
            </div>

            <button
              className="Scroll_Button_Coding"
              onClick={() => handleScroll("right", "Domain")}
            >
              <IoIosArrowForward />
            </button>
          </div>
        </div>
        <div className="DeveloperSkill_Main_Box_Bottom_Section_Offer">
          <div className="Developer_Pending_Offer">
            <p className="text-[#132735CC] text-sm">Pending offers : </p>
            <p className="text-[#132735] font-semibold">14</p>
          </div>
          <div className="Developer_Shortlist_Offer">
            <button className="btn1 text-sm">Shortlist Me</button>
            <button className="btn2 text-sm">Let's Talk</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DeveloperSkills;
