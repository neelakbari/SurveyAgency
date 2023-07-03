import { Menu } from "antd";
import { DeleteOutlined, PlusSquareFilled } from "@ant-design/icons";
import React from "react";
import { DropDownData } from "../data";
const { SubMenu } = Menu;

import "../scss/CreateSurvey.scss";
import { useDispatch, useSelector } from "react-redux";
import CustomIcon from "../components/CustomIcon";

import { useParams } from "react-router-dom";
import { addPage, changeCurrent, deletePage } from "../redux/reducers/surveySlice";
const ContentBar = ({currentUserIndex}) => {
  const { createId } = useParams();
  const dispatch = useDispatch();
  const surveyData = useSelector((state) =>
    state.survey[currentUserIndex].data.find((survey) => survey.surveyId === createId)
  ).surveyData;
  return (
    <>
      <div className="content_bar">
        <div className="Header">
          <span>content</span>
          <div className="icons">
            <Menu
              triggerSubMenuAction={"click"}
              mode="vertical"
              onClick={(e) =>
                dispatch(addPage({ surveyId: createId, value: e.key }))
              }
            >
              <SubMenu
                key={SubMenu}
                icon={<PlusSquareFilled className="icon_main" />}
              >
                {DropDownData.map((data) => {
                  return <Menu.Item key={data.id}>{data.type}</Menu.Item>;
                })}
              </SubMenu>
            </Menu>
          </div>
        </div>
        <div className="lists">
          {surveyData.page.map((data, index) => {
            return (
              <div
                className={`list ${
                  data.id == surveyData.currentPage ? "active" : ""
                } `}
                key={index}
              >
                <div className="list_item_wrapper">
                  <div
                    className="list_item"
                    onClick={() => dispatch(changeCurrent({surveyId: createId, value:data.id}))}
                  >
                    {CustomIcon(
                      DropDownData.filter(
                        (datas) => datas.id === data.dropDownId
                      )[0].icon
                    )}
                    <span>{data.id}</span>
                  </div>
                  <DeleteOutlined
                    className="content-bar__lists__list__delete__icon"
                    onClick={() => {
                      dispatch(deletePage({surveyId: createId, value:data.id}));
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ContentBar;
