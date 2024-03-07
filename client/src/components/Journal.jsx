import React, { useEffect, useState, useReducer } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.target.name]: event.target.value, // Use 'name' instead of 'placeholder'
  };
};

function Journal() {
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useReducer(formReducer, {
    Title: "",
    Entry: "",
    Tags: " ",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/journal_entries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.Title,
          content: formData.Entry,
          tags: formData.Tags,
          user_id: 1,
        }),
      });

      if (response.ok) {
        setSubmit(true);
      } else {
        // Handle error
        console.error('Submission failed');
      }
    } catch (error) {
      console.error('Error during submission:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      target: {
        name: e.target.name,
        value: e.target.value,
      },
    });
  };

  return (
    <div className="journal">
      <h2>Journal Entry</h2>
      <div>
        Your Entry:
        <p>Title: {formData.Title}</p>
        <p>Entry: {formData.Entry}</p>
        <p>Tag: {formData.Tags}</p> 
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="Title" placeholder="Title" onChange={handleChange} />
        </label>
        <label>
          <input type="text" name="Entry" placeholder="Entry" onChange={handleChange} />
        </label>
        <label>
          
          <select name="Tags" onChange={handleChange} value={formData.Tags}>
            <option value="Family">Family</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Adventure">Adventure</option>
            <option value="Fun">Fun</option>
            
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
      {submit && <p>Entry Submitted!</p>}
    </div>
  );
}

export default Journal;
