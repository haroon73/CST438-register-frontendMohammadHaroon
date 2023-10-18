import React, { useState } from 'react';

const EditStudent = ({ student, onUpdateStudent, onClose }) => {
  // Initialize the editedStudent state
  const [editedStudent, setEditedStudent] = useState({ ...student });

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  // Function to handle the "Update" button click
  const handleUpdate = () => {
    // Call the onUpdateStudent function to update the student.
    onUpdateStudent(editedStudent);
    onClose(); // Close the modal after updating.
  };

  return (
    <div>
      <h3>Edit Student</h3>
      <label>Name:</label>
      <input 
        type="text"
        name="name1"
        value={editedStudent.name}
        onChange={handleInputChange}
      />
      <label>Email:</label>
      <input
        type="email"
        name="email1"
        value={editedStudent.email}
        onChange={handleInputChange}
      />
      <button id="updatestudent" onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EditStudent;
