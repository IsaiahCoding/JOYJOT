import React, { useEffect, useState } from "react";

function UserEntries() {
  const [journalEntries, setJournalEntries] = useState([]);
  const [editEntry, setEditEntry] = useState(null);

  useEffect(() => {
    fetch("/journal_entries")
      .then((r) => r.json())
      .then(setJournalEntries);
  }, []);

  const handleEditClick = (entryId) => {
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
    setEditEntry({
      ...editEntry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveEdit = () => {
    fetch(`/journal_entries/${editEntry.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editEntry.title,
        content: editEntry.content,
      }),
    })
      .then((r) => r.json())
      .then((updatedEntry) => {
        setJournalEntries((entries) =>
          entries.map((entry) =>
            entry.id === updatedEntry.id ? updatedEntry : entry
          )
        );
        setEditEntry(null);
      })
      .catch((error) => {
        console.error("Error during entry update:", error);
      });
  };

  return (
    <div>
      <h2>Journal Entries</h2>
      <ul>
        {journalEntries.map((entry) => (
          <li key={entry.id}>
            {entry.title} - {entry.content}
            <button onClick={() => handleEditClick(entry.id)}>Edit</button>
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
