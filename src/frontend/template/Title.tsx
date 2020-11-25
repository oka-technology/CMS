import styled from 'styled-components';

interface TitleProps {
  className?: string;
  value: string;
}

const Title = ({ value, className }: TitleProps): JSX.Element => {
  return <Wrapper className={className}>{value}</Wrapper>;
};

export default Title;

const Wrapper = styled.h1`
  font-size: 3rem;
  height: 4.5rem;
  margin: 2rem 0;
`;
