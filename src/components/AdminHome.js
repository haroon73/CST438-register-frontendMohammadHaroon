import React, { useState, useEffect } from 'react';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';

const AdminHome = () => {
  const [students, setStudents] = useState([]);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [studentToEdit, setStudentToEdit] = useState(null);

  useEffect(() => {
    // Fetch students when the component mounts
    fetchStudents();
  }, []);

  // Function to fetch students
  const fetchStudents = () => {
    fetch('http://localhost:8080/student') // Replace with the actual API endpoint
      .then((response) => response.text())
      .then((data) => {
        console.log('API Response:', data);
        // Parse the data as JSON if it is valid JSON
        try {
          const jsonData = JSON.parse(data);
          setStudents(jsonData);
        } catch (error) {
          console.error('Error parsing JSON data:', error);
        }
      })
      .catch((error) => console.error('Error fetching students:', error));
  };

  // Function to add a new student
  const addStudent = (newStudent) => {
    fetch('http://localhost:8080/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
      .then((response) => response.json())
      .then((data) => {
        // Add the new student to the list of students
        setStudents([...students, data]);
        setShowAddStudentModal(false); // Close the modal
      })
      .catch((error) => console.error('Error adding student:', error));
  };

  // Function to delete a student by ID
  const deleteStudent = (studentId) => {
    console.log('Deleting student with ID:', studentId);
    fetch(`http://localhost:8080/student/${studentId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          // Remove the deleted student from the list of students
          const updatedStudents = students.filter((student) => student.studentId !== studentId);
          setStudents(updatedStudents);
        } else {
          console.error('Error deleting student:', response.status);
        }
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  // Function to open the edit student modal
  const openEditStudentModal = (student) => {
    console.log('Edit button clicked for student:', student);
    setStudentToEdit(student);
    setShowEditStudentModal(true);
  };

  // Function to update a student
  const updateStudent = (updatedStudent) => {
    console.log('Update student with ID:', updatedStudent.studentId);
    fetch(`http://localhost:8080/student/${updatedStudent.studentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => {
        if (response.ok) {
          // Update the student in the list of students
          const updatedStudents = students.map((student) =>
            student.studentId === updatedStudent.studentId ? updatedStudent : student
          );
          setStudents(updatedStudents);
          setShowEditStudentModal(false); // Close the modal
        } else {
          console.error('Error updating student:', response.status);
        }
      })
      .catch((error) => console.error('Error updating student:', error));
  };

  return (
    <div>
      <h2>Student List</h2>

      {/* Display the list of students */}
      <ul>
        {students.map((student) => (
          <li key={student.studentId}>
            {student.name} ({student.email})
            <button onClick={() => openEditStudentModal(student)}>Edit</button>

            {/* Render EditStudent component when showEditStudentModal is true */}
            {showEditStudentModal && student === studentToEdit && (
              <EditStudent
                student={studentToEdit}
                onUpdateStudent={updateStudent}
                onClose={() => setShowEditStudentModal(false)}
              />
            )}

            <button onClick={() => deleteStudent(student.studentId)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setShowAddStudentModal(true)}>Add Student</button>
      {/* Add Student Modal */}
      {showAddStudentModal && <AddStudent onAddStudent={addStudent} onClose={() => setShowAddStudentModal(false)} />}
    </div>
  );
};

export default AdminHome;
