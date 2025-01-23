import React from 'react';
import styled from 'styled-components';

const Header = () => (
  <HeaderContainer>
    <h1>Employee Management Portal</h1>
  </HeaderContainer>
);

const HeaderContainer = styled.header`
  background-color: #9CAFB7;
  padding: 20px;
  color: purple;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default Header;
