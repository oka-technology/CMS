/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const style = css`
  font-size: 3rem;
`;

type TitleProps = {
  value: string;
};

const Title = ({ value }: TitleProps): JSX.Element => {
  return <h1 css={style}>{value}</h1>;
};

export default Title;
