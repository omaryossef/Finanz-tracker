import React, { useContext, useEffect } from "react";
import { icons } from "./icons";
import "../style/category.css";
import { Context } from "../context/Context";

//Import variables
const Category = () => {
  const {
    url,
    name,
    price,
    setCategory,
    setShowCategory,
    setShowForm,
    setFinances,
  } = useContext(Context);

  //fetch data from database
  const fetchFinances = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFinances(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFinances();
  }, []);

  //handleClick for each category, and save the selected category
  const handleClick = (e) => {
    const name = e.currentTarget.name;
    setCategory(name);
    setShowCategory(false);
    setShowForm(true);
  };

  return (
    <>
      <div className="main-icon-container">
        <h1>Category</h1>
        <div className="category_container">
          {icons.map((e, i) => (
            <div key={i} className="flip-card">
              <div key={i} className="flip-card-inner">
                <div key={i} className="flip-card-front">
                  <p className="title">{e.text}</p>
                  <p className="icons-cate">{e.icon} </p>
                </div>
                <div className="flip-card-back">
                  <button
                    className="btn-card"
                    key={new Date()}
                    style={{
                      backgroundColor: "inherit",
                      border: "none",
                      cursor: "pointer",
                    }}
                    name={e.text}
                    onClick={handleClick}
                  >
                    click me
                  </button>
                  <ul>
                    {e.list.map((ele, index) => (
                      <li className="backCard_list" key={index}>
                        {ele}{" "}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {console.log(".............", name, price)}
    </>
  );
};
export default Category;
