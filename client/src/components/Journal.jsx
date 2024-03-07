import React, { useEffect, useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.placeholder]: event.target.value,
  };
};

function Journal() {
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    Title: "", 
    Entry: "", 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };


  const handleChange = (e) => {
    setFormData({
      target: {
        placeholder: e.target.placeholder,
        value: e.target.value,
      },
    });
  };

  return (
    <div className="journal">
      <h2>Journal Entry</h2>
      <div>
        Your Entry:
        <p>Title:{formData.Title}</p>
        <p>Entry:{formData.Entry}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Title" onChange={handleChange} />
        </label>
        <label>
          <input type="text" placeholder="Entry" onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submit && <p>Entry Submitted!</p>}
    </div>
  );
}

export default Journal;
