import React from "react";
import Question from "./Question";
import "../../scss/View.scss";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Layout = ({ ComponentToRender, disabled, currentUserIndex }) => {
  const { createId } = useParams();
  const surveyData = useSelector((state) =>
    state.survey[currentUserIndex].data.find(
      (survey) => survey.surveyId === createId
    )
  ).surveyData;
  
  const surveyPages = surveyData.page;
  const currentIndex = surveyPages.findIndex((data) => data.id === surveyData.currentPage);
  // const [option, setoption] = useState([]);
  // useEffect(() => {
  //   setoption(surveyPages[currentIndex].option);
  // }, [surveyPages[currentIndex].option]);
  return (
    <div
      className={`layout_one ${
        surveyPages[currentIndex].layout === 2 ? "layout_two" : ""
      }`}
    >
      <div
        className={`image_wrapper ${
          surveyPages[currentIndex].layout === 3
            ? "image_wrapper_layout_three"
            : ""
        }`}
      >
        <img
          src={surveyPages[currentIndex].image || surveyData.image}
          alt="image"
        />
      </div>
      <div className="input_wrapper">
        <div className="Question">
          <Question currentUserIndex={currentUserIndex} />
        </div>
        <div className="answer">
          <ComponentToRender disabled={disabled} currentUserIndex={currentUserIndex} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
