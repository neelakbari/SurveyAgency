import React from "react";
import { Input } from "antd";
import { ForwardOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { changeInput } from "../../redux/reducers/surveySlice";

const Question = ({ preview = false, pageIndex, currentUserIndex }) => {
  const { createId } = useParams();
  const { surveyId } = useParams();
  const surveyData = useSelector((state) => {
    return state.survey[currentUserIndex].data.find((survey) => {
      if (surveyId) {
        return survey.surveyId === surveyId;
      } else {
        return survey.surveyId === createId;
      }
    });
  }).surveyData;
  const surveyPages = surveyData.page;
  let currentIndex;
  preview
    ? (currentIndex = pageIndex)
    : (currentIndex = surveyPages.findIndex(
        (data) => data.id === surveyData.currentPage
      ));
  const dispatch = useDispatch();
  return (
    <div className="question">
      <div className="question__left">
        <span>{surveyPages[currentIndex].id}</span>
        <ForwardOutlined />
      </div>
      <div className="question__right">
        <div className="question__right__textInput">
          <Input
            onChange={(e) =>
              dispatch(
                changeInput({
                  surveyId: createId,
                  type: "question",
                  value: e.target.value,
                })
              )
            }
            type="text"
            value={surveyPages[currentIndex]?.question}
            placeholder="Question"
          />
          <Input
            onChange={(e) =>
              dispatch(
                changeInput({
                  surveyId: createId,
                  type: "description",
                  value: e.target.value,
                })
              )
            }
            type="text"
            placeholder="Description (optional)"
            value={surveyPages[currentIndex]?.description}
          />
        </div>
      </div>
    </div>
  );
};

export default Question;
