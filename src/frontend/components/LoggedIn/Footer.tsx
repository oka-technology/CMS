import { useMemo } from 'react';
import styled from 'styled-components';

const Footer = (): JSX.Element => {
  const date = useMemo(() => new Date(), []);
  return (
    <Wrapper>
      <Text>
        <small>&copy; {date.getFullYear()} OKA TECHNOLOGY</small>
      </Text>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  align-items: center;
  background-color: #333;
  color: #fff;
  display: flex;
  flex-shrink: 0;
  height: 5rem;
  justify-content: center;
`;

const Text = styled.p`
  font-size: 1.6rem;
  margin: 0;
`;
