import React from 'react';
import styled from 'styled-components';

const Footer = () => (
  <FooterContainer>
    <p>&copy; 2024 Employee Management Portal. All rights reserved.</p>
  </FooterContainer>
);

const FooterContainer = styled.footer`
  background-color: #9CAFB7;
  padding: 20px;
  color:black;
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 0;
  box-shadow: 0 -4px 8px rgba(0, 0, 0, 0.1);
`;

export default Footer;
