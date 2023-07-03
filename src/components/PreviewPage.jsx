import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../scss/Preview.scss";
import { useDispatch, useSelector } from "react-redux";
import Question from "./viewComponents/Question";
import { Button, message } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined ,WarningFilled   } from "@ant-design/icons";
import { DropDownData } from "../data";
import Components from "./InputComponents";
import { openModal, updateSurveyData } from "../redux/reducers/surveySlice";


const PreviewPage = ({ currentUserIndex, surveyData }) => {

  const { createId } = useParams();
  const [pageIndex, setPageIndex] = useState(0);
  const dropDown = DropDownData.filter((data) => {
    return data.id === +surveyData?.page[pageIndex].dropDownId;
  })?.[0];
  const ComponentToRender = Components[dropDown.component];
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const handleChange = (type) => {
    if (surveyData.page[pageIndex]?.required && !surveyData.page[pageIndex].answer) {
      setError("This answer is required");
      return false;
    }
    type === "prev" && pageIndex !== 0
      ? setPageIndex(pageIndex - 1)
      : setPageIndex(pageIndex + 1);
  };
  const handleAnswer = (answer) => {
    surveyData = { ...surveyData, page: [...surveyData.page] };
    surveyData.page[pageIndex] = {
      ...surveyData.page[pageIndex],
      answer: answer,
    };
    
    dispatch(updateSurveyData({ surveyId: createId, value: surveyData }));
    if (answer) {
      setError("");
    }
  };

  const handleSubmit = () => {
    let answer = surveyData.page[pageIndex].answer;
    surveyData = { ...surveyData, page: [...surveyData.page] };

    if (!answer && surveyData.page[pageIndex].required) {
      setError("Thisdsfsd  answer is required");
    } else {
      if (surveyData.page.length === pageIndex + 1) {
        if (false) {
          let response = {};
          const id = uuidv4();
          response = survey.page.map((data) => {
            return {
              ...response,
              id,
              question: data.question,
              answer: data.answer,
              date: moment().format("MMMM Do YYYY, h:mm:ss a"),
            };
          });
          db.collection("workspace")
            .doc(surveyID)
            .update({
              response: firebase.firestore.FieldValue.arrayUnion(...response),
            })
            .then(() => {
              history.push("/thank-you");
            })
            .catch((error) => {
              message.warning("Failed to save your response", error);
            });
        } else {
          alert("View Done");
          dispatch(openModal({ surveyId: createId }));
        }
        return false;
      } else {
        handleChange("next");
      }
    }
  };

  return (
    <div
      className={`container ${
        surveyData?.page[pageIndex]?.layout === 3 ? "container_layout" : ""
      }`}
    >
      {surveyData?.page?.[pageIndex] && (
        <>
          <div
            id={`${createId ? "preview_mode" : ""}`}
            className={`container_preview  ${
              surveyData.page[pageIndex]?.layout === 2
                ? "container_layout_two"
                : ""
            }`}
          >
            <div
              className={`image_wrapper ${
                surveyData.page[pageIndex]?.layout === 3
                  ? "container_preview_layout_three"
                  : ""
              }`}
            >
              <img
                src={surveyData.page[pageIndex].image || surveyData.image}
                alt=""
              />
            </div>
            <div
              className="container_preview_right"
            >
              <div className="preview__right__question">
                <Question
                  preview={true}
                  pageIndex={pageIndex}
                  currentUserIndex={currentUserIndex}
                />
              </div>
              <div className="container_preview_right_answer">
                <ComponentToRender
                  preview={true}
                  pageIndex={pageIndex}
                  currentUserIndex={currentUserIndex}
                  handleAnswer={handleAnswer}
                  answer={surveyData.page[pageIndex].answer}
                  setError={setError}
                />
              </div>
              <div className="container_preview_right_submit">
                <button
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  {surveyData.page.length === pageIndex + 1 ? "Submit" : "Ok"}
                </button>
              </div>

              {error && (
                <div className="container_preview_right_error">
                  <WarningFilled />
                  <span>{error}</span>
                </div>
              )}
            </div>
            <div className="container_submit">
              {!surveyData.page[pageIndex]?.required &&
                pageIndex !== surveyData.page.length - 1 && (
                  <button
                    onClick={() => handleChange("next")}
                    className="container_submit_skip"
                  >
                    Skip
                  </button>
                )}
              <div className="container_submit_changePage">
                <Button
                  disabled={pageIndex === surveyData.page.length - 1}
                  onClick={() => handleChange("next")}
                >
                  <ArrowDownOutlined />
                </Button>
                <Button
                  disabled={pageIndex === 0}
                  onClick={() => handleChange("prev")}
                >
                  <ArrowUpOutlined />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreviewPage;
