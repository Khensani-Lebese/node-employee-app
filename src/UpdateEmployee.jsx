import React, { useState } from 'react';
import EmployeeForm from './EmployeeForm.jsx';
import { getEmployeesFromLocalStorage, setEmployeesToLocalStorage } from './localStorageUtils.jsx';
import styled from 'styled-components';

const UpdateEmployee = () => {
  const [employees, setEmployees] = useState(getEmployeesFromLocalStorage());
  const [selectedEmployee, setSelectedEmployee] = useState(null); // Holds the employee to edit
  const [searchId, setSearchId] = useState(''); // Holds the search input value

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee); // Set the employee to be edited
  };

  const updateEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setEmployeesToLocalStorage(updatedEmployees);
    setSelectedEmployee(null); // Clear the form after update
    alert("Employee updated successfully!");
  };

  const deleteEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    setEmployeesToLocalStorage(updatedEmployees);
    alert("Employee deleted successfully!");
  };

  // Filter employees based on the search ID
  const filteredEmployees = searchId
    ? employees.filter(employee => employee.id === parseInt(searchId))
    : employees;

  return (
    <Container>
      <h2>Update Employee</h2>
      <SearchContainer>
        <input 
          type="text" 
          placeholder="Search by ID" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
        />
      </SearchContainer>
      <EmployeeList>
        {filteredEmployees.map((employee) => (
          <EmployeeItem key={employee.id}>
            <span>{employee.name} {employee.surname}</span>
            <div>
              <button onClick={() => handleSelectEmployee(employee)}>Edit</button>
              <button onClick={() => deleteEmployee(employee.id)}>Delete</button>
            </div>
          </EmployeeItem>
        ))}
      </EmployeeList>

      {/* Only show the form when an employee is selected */}
      {selectedEmployee && (
        <EmployeeForm 
          employee={selectedEmployee} // Pass the selected employee to the form
          onUpdate={updateEmployee} 
        />
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
  margin-bottom: 20px;

  input {
    padding: 10px;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
`;

const EmployeeList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 20px;
`;

const EmployeeItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;

  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    margin-left: 5px; /* Added margin for better spacing between buttons */
  }

  button:hover {
    background-color: #0056b3;
  }
`;

export default UpdateEmployee;
