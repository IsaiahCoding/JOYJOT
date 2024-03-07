import React, { useEffect, useState } from "react";

function UserEntries() {

    const [journalEntries, setJournalEntries] = useState([]);
    
    useEffect(() => {
        fetch("/journal_entries")
        .then((r) => r.json())
        .then(setJournalEntries);
    }, []);
    
    return (
        <div>
        <h2>Journal Entries</h2>
        <ul>
            {journalEntries.map((entry) => (
            <li key={entry.id}>
                {entry.title} - {entry.content}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default UserEntries;