import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./mdc.scss";
import TopScreen from "./screen/top/TopScreen";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<TopScreen></TopScreen>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
