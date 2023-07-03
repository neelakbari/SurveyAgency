import { createSlice, current } from "@reduxjs/toolkit";
import { pageLayout } from "../../data";

const initialState = JSON.parse(localStorage.getItem("dataBase")) || [];
function currentUserIndex() {
  return initialState.findIndex(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("currentUser")).email
  );
}

const surveySlice = createSlice({
  name: "surveySlice",
  initialState,
  reducers: {
    addSurvey: (state, action) => {
      const currentIndex = currentUserIndex();
      state[currentIndex].data = [...state[currentIndex].data, action.payload];
      localStorage.setItem("dataBase", JSON.stringify(state));
    },
    deleteSurvey: (state, action) => {
      const currentIndex = currentUserIndex();
      state[currentIndex].data = [
        ...state[currentIndex].data.filter(
          (survey) => survey.surveyId !== action.payload
        ),
      ];
      localStorage.setItem("dataBase", JSON.stringify(state));
    },
    addPage: (state, action) => {
      const currentIndex = currentUserIndex();
      let surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      let newPage = { ...pageLayout };
      newPage["id"] = surveyData.page.length + 1;
      newPage["dropDownId"] = +action.payload.value;
      surveyData.currentPage = newPage["id"];
      surveyData.page = [...surveyData.page, newPage];
    },
    deletePage: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      let index = surveyData.page.findIndex(
        (state) => state.id === +action.payload.value
      );
      if (surveyData.page.length > 1 && index !== 0) {
        surveyData["currentPage"] = surveyData.page[index - 1].id;

        surveyData.page = surveyData.page
          .filter((data) => data.id !== action.payload.value)
          .map((page, index) => {
            return {
              ...page,
              id: index + 1,
            };
          });
      }
    },
    changeCurrent: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.currentPage = +action.payload.value;
    },
    changeName: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.surveyName = action.payload.value;
    },
    dropDownId: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.page = surveyData.page.map((page) => ({
        ...page,
        dropDownId:
          page.id == surveyData.currentPage
            ? +action.payload.value
            : page.dropDownId,
      }));
    },
    required: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.page = surveyData.page.map((page) => ({
        ...page,
        required:
          page.id == surveyData.currentPage
            ? action.payload.value
            : page.required,
      }));
    },
    fileUpload: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.page[surveyData.currentPage - 1].image = action.payload.value;
    },
    changeInput: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      let update = surveyData.page.map((data) => ({
        ...data,
        question:
          action.payload.type == "question" &&
          surveyData.currentPage === data.id
            ? action.payload.value
            : data.question,
        description:
          action.payload.type == "description" &&
          surveyData.currentPage === data.id
            ? action.payload.value
            : data.description,
      }));
      surveyData.page = update;
    },
    layoutChange: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      const currentPage = surveyData.page[action.payload.index];
      if (currentPage) {
        currentPage.layout = action.payload.id;
      }
    },
    openModal: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      surveyData.isModalOpen = !surveyData.isModalOpen;
    },
    addOption: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      const currentPage = surveyData.page[action.payload.index];
      if (currentPage) {
        currentPage.option.push({
          id: currentPage.option.length + 1,
          value: "",
        });
      }
    },
    updateOption: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      const currentPage = surveyData.page[action.payload.index];
      if (currentPage) {
        currentPage.option = currentPage.option.map((data) => ({
          ...data,
          value:
            data.id === action.payload.id ? action.payload.value : data.value,
        }));
      }
    },
    deleteOption: (state, action) => {
      const currentIndex = currentUserIndex();
      const surveyData = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData;
      const currentPage = surveyData.page[action.payload.index];
      if (currentPage) {
        currentPage.option = currentPage.option
          .filter((data) => data.id !== action.payload.id)
          .map((data, index) => ({ ...data, id: index + 1 }));
      }
    },
    updateSurveyData: (state, action) => {
      const currentIndex = currentUserIndex();
      state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
      ).surveyData = action.payload.value;
    },
    pushResponse: (state, action) => {
      const currentIndex = currentUserIndex();
      const survey = state[currentIndex].data.find(
        (survey) => survey.surveyId === action.payload.surveyId
        );
        survey.response = [...survey.response,...action.payload.value]
    },
  },
});

export const {
  addSurvey,
  deleteSurvey,
  updateSurvey,
  addPage,
  deletePage,
  changeCurrent,
  changeName,
  dropDownId,
  required,
  fileUpload,
  changeInput,
  layoutChange,
  openModal,
  addOption,
  updateOption,
  deleteOption,
  handleAnswer,
  updateSurveyData,
  pushResponse,
} = surveySlice.actions;
export default surveySlice.reducer;
