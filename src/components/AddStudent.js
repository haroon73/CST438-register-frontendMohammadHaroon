import React, { useState } from 'react';

const AddStudent = ({ onClose, onAddStudent }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the email format (you can use a regex pattern)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setErrorMessage('Invalid email format');
      return;
    }

    // Call the onAddStudent function to add the student
    const newStudentData = { name, email };
    try {
      await onAddStudent(newStudentData);
      onClose(); // Close the modal on success
    } catch (error) {
      setErrorMessage('Error adding student');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Add Student</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Name:</label>
          <input name="sName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label>Email:</label>
          <input name="sEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
          <button id="Addstudnet" type="submit">Add</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;
