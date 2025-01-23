import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeeForm from './EmployeeForm.jsx';
import { getEmployeesFromLocalStorage, setEmployeesToLocalStorage } from './localStorageUtils.jsx';
import styled from 'styled-components';

const AddEmployee = () => {
  const navigate = useNavigate();

  const addEmployee = (newEmployee) => {
    const employees = getEmployeesFromLocalStorage();
    employees.push(newEmployee);
    setEmployeesToLocalStorage(employees);
    navigate('/view');
  };

  return (
    <Container>
      <h2>Add Employee</h2>
      <EmployeeForm onSubmit={addEmployee} />
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;

  button {
    background-color: #7D94A1;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 15px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #ACBBC3;
  }
`;


export default AddEmployee;
