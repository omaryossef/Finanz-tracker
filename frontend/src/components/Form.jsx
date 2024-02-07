import React, { useState, useEffect, useContext } from "react";
import "../style/Form.css";
import { Context } from "../context/Context.jsx";
import Spinner from "./Spinner.jsx";

function NewForm() {
  // const url = "http://localhost:3010";
  const {
    listElement,
    setListElement,
    finances,
    setFinances,
    budget,
    setBudget,
    name,
    setName,
    price,
    setPrice,
    editingId,
    setEditingId,
    url,
    category,
    setCategory,
    setShowCategory,
    setShowForm,
    setShowChart,
    setSpinner,
    spinner,
  } = useContext(Context);

  // Function to fetch finance entries from the backend
  //GET
  const fetchFinances = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setFinances(data);
      setSpinner(true);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchFinances();
  }, []);

  // POST
  const addFinanceEntry = async () => {
    if (name.trim() !== "" && price.trim() !== "" && category.trim() !== "") {
      try {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, price, category }),
        });
        // After successful addition, fetch updated data
        fetchFinances();
        console.log(finances);
        // setCategory("");
        setName("");
        setPrice("");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };
  // Function to update a finance entry
  // UPDATE
  const updateFinanceEntry = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price }),
      });
      // After successful update, fetch updated data
      fetchFinances();
      setName("");
      setPrice("");
      setEditingId(null); // Reset editing id after update
    } catch (error) {
      console.log("Error:", error);
    }
  };
  // Function to delete a finance entry
  //DELETE
  const deleteFinanceEntry = async (id) => {
    try {
      await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      fetchFinances();
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Calculate total amount of all finances
  const totalAmount = finances.reduce(
    (total, finance) => total + parseFloat(finance.price),
    0
  );
  const remainingBudget = (budget - totalAmount).toFixed(2);
  const remainingBudgetPercentage = (remainingBudget / budget) * 100;
  let remainingBudgetClass = "budget-normal"; // Default class for normal budget
  if (remainingBudgetPercentage < 50 && remainingBudgetPercentage >= 20) {
    remainingBudgetClass = "budget-warning-50"; // Apply class for budget under 50%
  } else if (remainingBudgetPercentage < 20 && remainingBudgetPercentage >= 0) {
    remainingBudgetClass = "budget-warning-20"; // Apply class for budget under 20%
  } else if (remainingBudgetPercentage < 0) {
    remainingBudgetClass = "budget-negative"; // Apply class for negative budget
  }
  console.log("category-form: ", category);

  function formatDate(inputDateStr) {
    // Create a new Date object using the input date string
    const inputDate = new Date(inputDateStr);

    // Check if the inputDate is a valid date
    if (isNaN(inputDate)) {
      return "Invalid Date";
    }

    // Format the date as per the desired format (e.g., DD-MM-YYYY)
    const day = String(inputDate.getDate()).padStart(2, "0");
    const month = String(inputDate.getMonth() + 1).padStart(2, "0"); // Adding 1 as months are zero-indexed
    const year = inputDate.getFullYear();

    // Combine the formatted date components
    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  return (
    <div className="list-container">
      {/* {spinner ? <Spinner /> : ""} */}
      <div>
        <label className="budget-title" htmlFor="budget">
          Set your Budget:
        </label>
        <input
          id="budget"
          className="budget-input"
          type="number"
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />
      </div>
      <form className="data-insert" onSubmit={(e) => e.preventDefault()}>
        {/* Input fields for adding a new finance entry */}
        <input
          className="input-data"
          type="text"
          disabled
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          type="text"
          className="input-data"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name ..."
          autoFocus
        />
        <input
          type="number"
          className="input-data"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price ..."
        />
        <button onClick={addFinanceEntry} className="save-btn form-btn">
          <span className="circle1"></span>
          <span className="circle2"></span>
          <span className="circle3"></span>
          <span className="circle4"></span>
          <span className="circle5"></span>
          <span className="text">Save</span>
        </button>
      </form>
      {/* Display finance entries */}
      {finances.length > 0 && spinner ? (
        <div>
          <div className="container">
            <div className="row1">
              <div className="col-md-12 text-center">
                <h3 className="animate-charcter"> Your Shopping list:</h3>
              </div>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Categroy</th>
                <th>Date and Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {finances.map((finance) => (
                <tr key={finance._id}>
                  <td>
                    {editingId === finance._id ? (
                      <input
                        className="edit-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    ) : (
                      <span
                        style={{
                          fontWeight: "bold",
                          textTransform: "capitalize",
                        }}
                      >
                        {finance.name}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === finance._id ? (
                      <input
                        className="edit-input"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    ) : (
                      <span>{finance.price} €</span>
                    )}
                  </td>
                  <td>
                    {finance.category}
                    {console.log("category ...", category)}{" "}
                  </td>
                  <td>{formatDate(finance.createdAt)} </td>
                  <td>
                    {editingId === finance._id ? (
                      <>
                        <button
                          className="form-btn"
                          onClick={() => updateFinanceEntry(finance._id)}
                        >
                          Confirm
                        </button>
                        <button
                          className="form-btn"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <div className="btn-container ">
                        <button
                          className="table-btn form-btn"
                          onClick={() => setEditingId(finance._id)}
                        >
                          Edit
                        </button>
                        <button
                          className="table-btn form-btn"
                          onClick={() => deleteFinanceEntry(finance._id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td
                  colSpan="3"
                  style={{
                    textAlign: "left",

                    fontSize: "24px",
                  }}
                >
                  <strong>Total Price:</strong>
                </td>
                <td>{totalAmount} €</td>
              </tr>
              <tr>
                <td
                  colSpan="3"
                  style={{
                    fontSize: "24px",
                    textAlign: "left",
                  }}
                >
                  <strong>Remaining Budget:</strong>
                </td>
                <td className={remainingBudgetClass}>{remainingBudget} €</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <Spinner />
      )}
      <div className="bottom-btn-box">
        <button
          className="page-btn"
          onClick={() => {
            setShowCategory(true), setShowForm(false);
          }}
        >
          Add new element
        </button>
        <button
          className="page-btn"
          onClick={() => {
            setShowChart(true), setShowForm(false);
          }}
        >
          Budget overview
        </button>
      </div>
    </div>
  );
}

export default NewForm;
