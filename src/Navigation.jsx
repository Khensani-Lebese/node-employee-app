import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Navigation = () => (
  <Nav>
    <Links to="/">Home</Links>
    <Links to="add">Add Employee</Links>
    <Links to="view">View Employees</Links>
    
    <Links to="delete">Update Employee</Links>
  </Nav>
);

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  background-color: #C4CFD4;
  padding: 10px;
`;

const Links = styled(Link)`
  margin: 0 15px;
  color: white;
  text-decoration: none;
  font-size: 1.2em;
  transition: color 0.3s ease;

  &:hover {
    color: #67828E;
  }
`;

export default Navigation;
