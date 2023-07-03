import { createSlice } from "@reduxjs/toolkit";
import { initialData, pageLayout } from "../../data";

const initialState = initialData;

const surveyDataSlice = createSlice({
  name: "surveyDataSlice",
  initialState,
  reducers: {
    changeName: (state, action) => {
      state.surveyName = action.payload;
    },
    addPage: (state, action) => {
      let newPage = { ...pageLayout };
      newPage["id"] = state.page.length + 1;
      newPage["dropDownId"] = +action.payload.value;
      state.currentPage = state.page.length + 1;
      state.page = [...state.page, newPage];
    },
    deletePage: (state, action) => {
      let index = state.page.findIndex((state) => state.id === +action.payload);
      if (state.page.length > 1 && index !== 0) {
        state["currentPage"] = state.page[index - 1].id;
        state.page.splice(index, 1);

        if (index > -1) {
          let fixID = state.page.map((state, index) => {
            return {
              ...state,
              id: index + 1,
            };
          });
          state.page = fixID;
        } else {
          return;
        }
      }
    },
    changeCurrent: (state, action) => {
      state.currentPage = +action.payload;
    },
    dropDownId: (state, action) => {
      state.page = state.page.map((page) => ({
        ...page,
        dropDownId:
          page.id == state.currentPage ? +action.payload : page.dropDownId,
      }));
    },
    required: (state, action) => {
      state.page = state.page.map((page) => ({
        ...page,
        required: page.id == state.currentPage ? action.payload : page.required,
      }));
    },
    changeInput: (state, action) => {
      let update = state.page.map((data) => ({
        ...data,
        question:
          action.payload.type == "question" && state.currentPage === data.id
            ? action.payload.value
            : data.question,
        description:
          action.payload.type == "description" && state.currentPage === data.id
            ? action.payload.value
            : data.description,
      }));
      return {
        ...state,
        page: update,
      };
    },
    addOption: (state, action) => {
      const currentPage = state.page[action.payload.index];
      if (currentPage) {
        currentPage.option.push({
          id: currentPage.option.length + 1,
          value: "",
        });
      }
    },
    updateOption: (state, action) => {
      const currentPage = state.page[action.payload.index];
      if (currentPage) {
        currentPage.option = currentPage.option.map((data) => ({
          ...data,
          value:
            data.id === action.payload.id ? action.payload.value : data.value,
        }));
      }
    },
    deleteOption: (state, action) => {
      const currentPage = state.page[action.payload.index];
      if (currentPage) {
        currentPage.option = currentPage.option
          .filter((data) => data.id !== action.payload.id)
          .map((data, index) => ({ ...data, id: index + 1 }));
      }
    },
    layoutChange: (state, action) => {
      const currentPage = state.page[action.payload.index];
      if (currentPage) {
        currentPage.layout = action.payload.id;
      }
    },
    fileUpload: (state, action) => {
      state.page[state.currentPage - 1].image = action.payload;
    },
    openModal:(state)=>{
      state.isModalOpen = !state.isModalOpen
    }
  },
});

export const {
  changeName,
  addPage,
  deletePage,
  changeCurrent,
  dropDownId,
  required,
  changeInput,
  addOption,
  updateOption,
  deleteOption,
  layoutChange,
  fileUpload,
  openModal,
} = surveyDataSlice.actions;
export default surveyDataSlice.reducer;
