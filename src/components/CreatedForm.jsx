import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteSurvey } from "../redux/reducers/surveySlice";
import { Modal } from "antd";
import Response from "./Response";


const CreatedForm = ({ survey }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <>
      <div className="form">
        <div
          className="form_name"
          onClick={() => navigate(`/workspace/create/${survey.surveyId}`)}
        >
          {survey.surveyData.surveyName}
        </div>
        <div className="form_footer">
          <div className="footer_response">
            {survey.response.length === 0 ? (
              <div className="created-form__footer__response">no response</div>
            ) : (
              <div className="created-form__footer__response-found" onClick={()=>setIsModalOpen(true)}>
                {survey.response.length} response
              </div>
            )}
          </div>
          <div className="footer_delete" onClick={()=>dispatch(deleteSurvey(survey.surveyId))}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
        <Modal className="preview-modal" footer={null} open={isModalOpen} closable={true} onCancel={()=>setIsModalOpen(!isModalOpen)} >
           <Response survey={survey}/>
        </Modal> 
      </div>
    </>
  );
};

export default CreatedForm;
