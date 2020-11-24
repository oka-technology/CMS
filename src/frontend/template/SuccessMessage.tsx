/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

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

const successMessageStyle = css`
  color: blue;
  font-size: 1.6rem;
  margin-bottom: 0;
  animation: ${successMessageAnimation} 0.7s ease-out;
`;

type SuccessMessageProps = {
  value: string;
};

const SuccessMessage = ({ value }: SuccessMessageProps): JSX.Element => {
  return <p css={successMessageStyle}>{value}</p>;
};

export default SuccessMessage;
