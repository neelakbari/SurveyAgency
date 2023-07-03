import React from "react";
import { feedback1, feedback2, feedback3, feedback4, feedback5 } from "../../assets";
import "../../scss/View.scss"

const Feedback = ({answer,disabled,handleAnswer,setError,preview=false}) => {
  const handleChange = (rating) => {
    if (!disabled && preview) {
      handleAnswer(rating);
      setError("");
    }
  };
  const feed = [feedback1,feedback2,feedback3,feedback4,feedback5];
  return (
    <div className="Feedback">
      <div className="Feedback__wrapper">
        {feed.map((data, index) => {
          return (
            <div key={index}
              onClick={() => handleChange(index + 1)}
              className={`Feedback__wrapper__img ${
                answer === index + 1 ? "Feedback__wrapper__active" : ""
              }`}
            >
              <img src={data} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Feedback;
