import React from 'react';
import {  BrowserRouter as  Router, Routes, Route } from 'react-router-dom';
import GlobalStyles from './GlobalStyles.jsx';
import Home from './Home.jsx';
import AddEmployee from './AddEmployee.jsx';
import ViewEmployees from './ViewEmployees.jsx';

import DeleteEmployee from './DeleteEmployee.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Navigation from './Navigation.jsx';
import styled from 'styled-components';

const App = () => (
  
    <Router>
    <GlobalStyles />
    <Header />
    <Navigation />
    <Main>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="add" element={<AddEmployee />} />
        <Route path="view" element={<ViewEmployees />} />
        <Route path="delete" element={<DeleteEmployee />} />
      </Routes>
    </Main>
    <Footer />
    </Router>
  
);

const Main = styled.main`
  padding: 20px;
  margin-bottom: 60px; /* Adjust margin-bottom to avoid footer overlap */
`;

export default App;
