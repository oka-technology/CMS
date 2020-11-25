import styled, { keyframes } from 'styled-components';

const errorMessageAnimation = keyframes`
  from {
    opacity: 0; 
    transform: translateY(1rem);
  }
  to {
    opacity: 1; 
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1.6rem;
  margin-bottom: 0;
  animation: ${errorMessageAnimation} 0.7s ease-out;
`;

export default ErrorMessage;
