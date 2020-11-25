import styled, { keyframes } from 'styled-components';

const successMessageAnimation = keyframes`
  from {
    opacity: 0; 
    transform: translateY(1rem);
  }
  to {
    opacity: 1; 
    transform: translateY(0);
  }
`;

const SuccessMessage = styled.p`
  color: blue;
  font-size: 1.6rem;
  margin-bottom: 0;
  animation: ${successMessageAnimation} 0.7s ease-out;
`;

export default SuccessMessage;
