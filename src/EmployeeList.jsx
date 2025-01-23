import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/employees')
      .then(response => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });
  }, []);

  return (
    <List>
      {employees.map(employee => (
        <EmployeeItem key={employee.id}>
       <EmployeeImage src={employee.photo}  />
          <EmployeeDetails>
            <p>Name: {employee.name} {employee.surname}</p>
            <p>Age: {employee.age}</p>
            <p>ID Number: {employee.idNumber}</p>
            <p>Role: {employee.role}</p>
            <p>Email: {employee.email}</p>
            <p>Position: {employee.position}</p>
            <p>Department: {employee.department}</p>
            <p>Phone: {employee.phone}</p>
            <p>Start Date: {employee.startDate}</p>
            
          </EmployeeDetails>
        </EmployeeItem>
      ))}
    </List>
  );
};

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const EmployeeItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const EmployeeImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 20px; /* Added margin-right for better spacing */
`;

const EmployeeDetails = styled.div`
  flex-grow: 1;

  p {
    margin: 5px 0;
  }

  button {
    background-color: #ACBBC3;
    color: white;
    border: none;
    padding: 5px 10px;
    margin-left: 15px;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #c82333;
  }
`;

export default EmployeeList;
