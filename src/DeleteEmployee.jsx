import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DeleteEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    surname: '',
    age: '',
    idNumber: '',
    role: '',
    email: '',
    position: '',
    department: '',
    phone: '',
    startDate: '',
    photo: null,
  });
  const [searchId, setSearchId] = useState(''); // State to hold the searched ID
  const [filteredEmployee, setFilteredEmployee] = useState(null); // State to hold the filtered employee

  useEffect(() => {
    // Fetch employees from the server on component mount
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:5000/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const deleteEmployee = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:5000/employees/delete/${employeeId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
        setEmployees(updatedEmployees);
        setFilteredEmployee(null); // Clear the filtered employee if deleted
      } else {
        console.error('Error deleting employee:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const editEmployee = (employee) => {
    setEditingEmployee(employee);
    setEditFormData({ 
      name: employee.name, 
      surname: employee.surname, 
      age: employee.age || '', 
      idNumber: employee.idNumber || '', 
      role: employee.role || '', 
      email: employee.email || '', 
      position: employee.position, 
      department: employee.department || '', 
      phone: employee.phone || '', 
      startDate: employee.startDate || '', 
      photo: employee.photo || null 
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const saveEditedEmployee = async () => {
    try {
      const response = await fetch(`http://localhost:5000/employees/update/${editingEmployee.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        const updatedEmployees = employees.map(employee =>
          employee.id === editingEmployee.id ? { ...employee, ...editFormData } : employee
        );
        setEmployees(updatedEmployees);
        setEditingEmployee(null);
      } else {
        console.error('Error updating employee:', await response.json());
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleSearch = () => {
    const employee = employees.find(emp => emp.id === parseInt(searchId)); // Parse ID to number for comparison
    setFilteredEmployee(employee);
    if (!employee) {
      alert('Employee not found!');
    }
  };

  return (
    <Container>
      <h2>Delete or Edit Employee</h2>
      <SearchContainer>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </SearchContainer>
      {filteredEmployee && (
        <EmployeeItem key={filteredEmployee.id}>
          {filteredEmployee.name} {filteredEmployee.surname} - {filteredEmployee.position}
          <button onClick={() => deleteEmployee(filteredEmployee.id)}>Delete</button>
          <button onClick={() => editEmployee(filteredEmployee)}>Edit</button>
        </EmployeeItem>
      )}
      <ul>
        {employees.map(employee => (
          <EmployeeItem key={employee.id}>
            {employee.name} {employee.surname} - {employee.position}
            <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            <button onClick={() => editEmployee(employee)}>Edit</button>
          </EmployeeItem>
        ))}
      </ul>
      {editingEmployee && (
        <EditForm>
          <h3>Edit Employee</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname"
              value={editFormData.surname}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Age:
            <input
              type="number"
              name="age"
              value={editFormData.age}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            ID Number:
            <input
              type="text"
              name="idNumber"
              value={editFormData.idNumber}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Role:
            <input
              type="text"
              name="role"
              value={editFormData.role}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editFormData.email}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Position:
            <input
              type="text"
              name="position"
              value={editFormData.position}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Department:
            <input
              type="text"
              name="department"
              value={editFormData.department}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone"
              value={editFormData.phone}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Start Date:
            <input
              type="date"
              name="startDate"
              value={editFormData.startDate}
              onChange={handleEditFormChange}
            />
          </label>
          <label>
            Photo URL:
            <input
              type="url"
              name="photo"
              value={editFormData.photo || ''}
              onChange={handleEditFormChange}
            />
          </label>
          <button onClick={saveEditedEmployee}>Save</button>
          <button onClick={() => setEditingEmployee(null)}>Cancel</button>
        </EditForm>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const SearchContainer = styled.div`
  display: flex;
  margin-bottom: 20px;


  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    margin-right: 10px;
  }

  button {
    background-color: #3C4C53;
    color: white;
    border: none;
    padding: 1px 15px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #839791;
  }
`;

const EmployeeItem = styled.li`
  list-style: none;
  padding: 10px;
  margin: 10px 0;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    background-color: #3C4C53;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 5px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #839791;
  }
`;

const EditForm = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;

  h3 {
    margin-bottom: 20px;
  }

  label {
    display: block;
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    background-color: #3C4C53;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 3px;
    cursor: pointer;
    margin-right: 10px;
  }

  button:hover {
    background-color: #839791;
  }
`;

export default DeleteEmployee;
