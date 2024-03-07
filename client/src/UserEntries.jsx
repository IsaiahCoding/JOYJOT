import React, { useEffect, useState } from "react";

function UserEntries() {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/journal_entries")
      .then((r) => r.json())
      .then(setJournalEntries);
  }, []);

  const handleEdit = (entryId) => {
    // Handle the edit action, e.g., navigate to an edit page or show a modal
    console.log(`Edit entry with ID: ${entryId}`);
  };

  const handleDelete = (entryId) => {
    // Handle the delete action, e.g., send a DELETE request to the backend
    fetch(`http://127.0.0.1:5555/journal_entries/${entryId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted entry from the state
          setJournalEntries((entries) =>
            entries.filter((entry) => entry.id !== entryId)
          );
        } else {
          console.error("Failed to delete entry");
        }
      })
      .catch((error) => {
        console.error("Error during deletion:", error);
      });
  };

  return (
    <div>
      <h2>Journal Entries</h2>
      <ul>
        {journalEntries.map((entry) => (
          <li key={entry.id}>
            <p>
              {entry.title} - {entry.content}
            </p>
            <button onClick={() => handleEdit(entry.id)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserEntries;
