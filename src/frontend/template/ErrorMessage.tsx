/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

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

const errorMessageStyle = css`
  color: red;
  font-size: 1.6rem;
  margin-bottom: 0;
  animation: ${errorMessageAnimation} 0.7s ease-out;
`;

type ErrorMessageProps = {
  value: string;
};

const ErrorMessage = ({ value }: ErrorMessageProps): JSX.Element => {
  return <p css={errorMessageStyle}>{value}</p>;
};

export default ErrorMessage;
