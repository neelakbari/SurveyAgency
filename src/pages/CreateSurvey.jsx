import React, { useState } from "react";
import "../scss/CreateSurvey.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ContentBar from "../components/ContentBar";
import View from "../components/viewComponents/View";
import { DropDownData, pageLayout } from "../data";
import ChangesBar from "../components/ChangesBar";
import { Modal } from 'antd';
import PreviewPage from "../components/PreviewPage";
import { openModal } from "../redux/reducers/surveySlice";

const CreateSurvey = () => {
  const { createId } = useParams();
  const dispatch = useDispatch();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  let database = JSON.parse(localStorage.getItem("dataBase")) 
  let currentUserIndex = database.findIndex(
    (user) => user.email === currentUser.email
  );

  const survey = useSelector((state) => state.survey[currentUserIndex].data.find((survey)=>survey.surveyId === createId)).surveyData;
  // const surveys = useSelector((state) => state.survey);

  // const surveyId = surveys.filter((survey) => survey.surveyId === createId)[0]
  //   .surveyId;
  // const currentPage = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .currentPage;
  // const survey = surveys.filter((survey) => survey.surveyId === createId)[0]
  // .surveyData;
  const currentIndex = survey?.page.findIndex(
    (data) => data.id === survey.currentPage
  );
  const dropDown = DropDownData.filter((data) => {
    return data.id === +survey?.page[currentIndex].dropDownId;
  })?.[0];

  return (
    <>
      <div className="main_survey">
        <div className="survey_wrapper">
          <div className="survey_content">
            <ContentBar currentUserIndex={currentUserIndex}/>
          </div>
          <div className="survey_view">
            <View
              dropDown={dropDown}
              currentUserIndex={currentUserIndex}
            />
          </div>
          <div className="survey_selection">
            <ChangesBar
              currentIndex={currentIndex}
              dropDown={dropDown}
              currentUserIndex={currentUserIndex}
            />
          </div>
        </div>

        <Modal className="preview-modal" footer={null} open={survey.isModalOpen} closable={true} onCancel={()=>dispatch(openModal({surveyId:createId}))} >
           <PreviewPage currentUserIndex={currentUserIndex} surveyData={survey}/>
        </Modal>  
      </div>
    </>
  );
};

export default CreateSurvey;
