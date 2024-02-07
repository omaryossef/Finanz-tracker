import Category from "./components/Category";
import React, { useContext, useState } from "react";
import Form from "./components/Form.jsx";
import Chart from "./components/Chart.jsx";
import "./style/app.css";
import { Context } from "./context/Context.jsx";

function App() {
  //import variables from context
  const { showForm, showChart, showCategory } = useContext(Context);

  //Show only the selected Component
  return (
    <>
      {showCategory ? <Category /> : ""}
      {showForm ? <Form /> : ""}
      {showChart ? <Chart /> : ""}
    </>
  );
}

export default App;
