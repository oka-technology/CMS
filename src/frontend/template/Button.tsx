import { FC } from 'react';
import styled from 'styled-components';

interface ButtonProps {
  className?: string;
  blocked?: boolean;
}

const Button: FC<ButtonProps> = styled.div<ButtonProps>`
  align-items: center;
  border-radius: 0.5rem;
  border: 0px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  height: 4rem;
  justify-content: center;
  opacity: ${({ blocked }) => (blocked ? 0.3 : 1)};
  text-decoration: none;
  transition: transform 0.1s;
  width: 10rem;

  &:hover {
    transform: ${({ blocked }) => (blocked ? 'scale(1)' : 'scale(1.25)')};
    transition: transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

export default Button;
