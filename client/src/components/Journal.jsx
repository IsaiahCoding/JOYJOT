import React, { useEffect, useState } from "react";

function Journal() {
  const [submit, setSubmit] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  setTimeout(() => {
    setSubmit(false);
  }, 3000);

  return (
    <div className="journal">
      <h2>Journal</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" placeholder="Title" />
        </label>
        <label>
          <input type="text" placeholder="Entry" />
        </label>
        <button type="submit">Submit</button>
      </form>
      {submit && <p>Entry Submitted!</p>}
    </div>
  );
}

export default Journal;







