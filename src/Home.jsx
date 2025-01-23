import React from 'react';
import styled from 'styled-components';

const Home = () => (
  <Container>
    <h2>Welcome to the Employee Management Portal</h2>
    <p>Use the navigation links above to manage employees.</p>
    <img src='https://th.bing.com/th?q=Smart+Employee+App&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.5&pid=InlineBlock&mkt=en-ZA&cc=ZA&setlang=en&adlt=strict&t=1&mw=247' alt='employee picture'></img>
  </Container>
);

const Container = styled.div`
  padding: 20px;
  text-align: center;
  width: 100%;
  margin: 0 auto;
  background-color: white;
`;

export default Home;
