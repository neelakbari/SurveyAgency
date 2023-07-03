import React, { useState } from "react";
import "../scss/Workspace.scss";
import { plus } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey} from "../redux/reducers/surveySlice";
import { initialData } from "../data";
import { v4 as uuidv4 } from "uuid";
import CreatedForm from "../components/CreatedForm";


const Workspace = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.survey);
  let currentUserIndex = survey.findIndex(
    (user) => user.email === currentUser.email
  );
  let data = survey[currentUserIndex].data;
  const addNewSurvey = {
    surveyData: initialData,
    userId: currentUser.email,
    surveyId: uuidv4(),
    response: [],
  };
  return (
    <div className="workspace">
      <div className="workspace_wrapper">
        <div className="create_form">
          <div className="create_form_name">New Survey Form</div>
          <div
            className="create_form_icon"
            onClick={() => {
              dispatch(addSurvey(addNewSurvey));
            }}
          >
            <img src={plus} alt="" />
          </div>
        </div>

        {data?.map((survey) => {
          return <CreatedForm survey={survey} key={survey.surveyId} currentUserIndex={currentUserIndex} />;
        })}
      </div>
       
    </div>
  );
};

export default Workspace;
