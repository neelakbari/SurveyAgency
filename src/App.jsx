import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import WorkspaceLayout from "./layouts/WorkspaceLayout";
import Workspace from "./pages/Workspace";
import CreateSurvey from "./pages/CreateSurvey";

import DisplaySurvey from "./pages/DisplaySurvey";
import Thankyou from "./pages/ThankYou";

const App = () => {
  
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/thankyou" element={<Thankyou />} />
      </Route>
      <Route path="/workspace" element={<WorkspaceLayout/>}>
      <Route index element={<Workspace/>}/>
      <Route  path="create/:createId" element={<CreateSurvey/>}/>
      </Route>
      <Route path="/survey/:surveyId" element={<DisplaySurvey/>}></Route>
      </>
    )
  );
  return (
      <RouterProvider router={router} />
  );
};

export default App;
