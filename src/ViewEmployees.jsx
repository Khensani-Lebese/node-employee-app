import React, { useState, useEffect } from 'react';
import EmployeeList from './EmployeeList.jsx';
import { getEmployeesFromLocalStorage, deleteEmployeeFromLocalStorage } from './localStorageUtils';
import styled from 'styled-components';

const ViewEmployees = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const loadedEmployees = getEmployeesFromLocalStorage();
    setEmployees(loadedEmployees);
  }, []);

  const deleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
    deleteEmployeeFromLocalStorage(employeeId);
  };

  return (
    <Container>
      <h2>View Employees</h2>
      <EmployeeList employees={employees}  />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  color: #3C4C53;
`;

export default ViewEmployees;
