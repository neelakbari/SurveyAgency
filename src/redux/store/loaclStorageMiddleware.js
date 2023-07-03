const localStorageMiddleware = (store) => (next) => (action) => {
  const result = next(action);

  
  const state = store.getState();
  const currentIndex = state.survey.findIndex(
    (user) =>
      user.email === JSON.parse(localStorage.getItem("currentUser")).email
  );
  

  const surveyId = action.payload.surveyId; 
  const updatedSurvey = state.survey[currentIndex].data.find(
    (survey) => survey.surveyId === surveyId
  );
  if (updatedSurvey) {
    const localStorageData = JSON.parse(localStorage.getItem("dataBase")) || {};
    localStorageData[currentIndex].data =
      localStorageData[currentIndex].data || [];
    const index = localStorageData[currentIndex].data.findIndex(
      (survey) => survey.surveyId === surveyId
    );
    if (index !== -1) {
      localStorageData[currentIndex].data[index] = updatedSurvey;
    } else {
      localStorageData[currentIndex].data.push(updatedSurvey);
    }
    localStorage.setItem("dataBase", JSON.stringify(localStorageData));
  }
  return result;
};

export default localStorageMiddleware;
