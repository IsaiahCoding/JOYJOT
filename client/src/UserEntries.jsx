import React, { useEffect, useState } from "react";
import "/Users/isaiahaguilera/Development/code/phase-4/Isaiah-Phase-4-Project/client/src/UserEntry.css"
function UserEntries() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);

  useEffect(() => {
    fetch("/journal_entries")
      .then((r) => r.json())
      .then(setJournalEntries);
  }, []);

  const handleEditClick = (entryId) => {
    // Fetch data for the selected entry
    fetch(`/journal_entries/${entryId}`)
      .then((r) => r.json())
      .then((data) => {
        setEditEntry(data);
      });
  };

  const handleCancelEdit = () => {
    setEditEntry(null);
  };

  const handleEditChange = (e) => {
    // Update the local state when editing
    setEditEntry({
      ...editEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = () => {
    // Send a PATCH request to update the entry on the server
    fetch(`/journal_entries/${editEntry.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editEntry),
    })
      .then((r) => r.json())
      .then((updatedEntry) => {
       
        setJournalEntries((entries) =>
          entries.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          )
        );
        // 
        setEditEntry(null);
      });
  };

  const handleDeleteClick = (entryId) => {
    // Send a DELETE request to remove the entry on the server
    fetch(`/journal_entries/${entryId}`, {
      method: "DELETE",
    })
      .then((r) => {
        if (r.ok) {
          
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
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {journalEntries.map((entry) => (
          <li key={entry.id}>
            {entry.title} - {entry.content} - {entry.date}
            <button onClick={() => handleEditClick(entry.id)}>Edit</button>
            <button onClick={() => handleDeleteClick(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {editEntry && (
        <div>
          <h3>Edit Entry</h3>
          <label>
            Title:
            <input
              type="text"
              name="title"
              value={editEntry.title}
              onChange={handleEditChange}
            />
          </label>
          <label>
            Content:
            <input
              type="text"
              name="content"
              value={editEntry.content}
              onChange={handleEditChange}
            />
          </label>
          <button onClick={handleSaveEdit}>Save</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default UserEntries;
