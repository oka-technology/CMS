import styled from 'styled-components';

const Footer = (): JSX.Element => {
  return (
    <Wrapper>
      <Text>
        <small>&copy; 2019 OKA TECHNOLOGY</small>
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
