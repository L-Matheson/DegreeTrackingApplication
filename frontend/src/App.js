import React, { useState, useEffect } from "react";

const TestTableManager = () => {
  const [data, setData] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Fetch all records on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("/api/test-table/")
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  };

  // Add a new record
  const handlePostData = (e) => {
    e.preventDefault();
    fetch("/api/test-table/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTitle,
        description: newDescription,
      }),
    })
      .then(response => response.json())
      .then(newRecord => {
        setData([...data, newRecord]);
        setNewTitle("");
        setNewDescription("");
      })
      .catch(error => console.error("Error posting data:", error));
  };

  // Delete a record by ID
  const handleDeleteData = (id) => {
    fetch(`/api/test-table/${id}/`, {
      method: "DELETE",
    })
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => console.error("Error deleting data:", error));
  };

  return (
    <div>
      <h1>Test Table Manager</h1>

      {/* Form to Add New Record */}
      <form onSubmit={handlePostData}>
        <input
          type="text"
          value={newTitle}
          placeholder="Title"
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input
          type="text"
          value={newDescription}
          placeholder="Description"
          onChange={(e) => setNewDescription(e.target.value)}
          required
        />
        <button type="submit">Add Record</button>
      </form>

      {/* Display Data */}
      <ul>
        {data.map(item => (
          <li key={item.id}>
            <strong>{item.title}:</strong> {item.description}
            <button onClick={() => handleDeleteData(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestTableManager;
