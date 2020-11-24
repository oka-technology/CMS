/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const style = (additionalStyle: ReturnType<typeof css>) => css`
  font-size: 3rem;
  height: 4.5rem;
  margin: 2rem 0;
  ${additionalStyle}
`;

type TitleProps = {
  value: string;
  additionalStyle?: ReturnType<typeof css>;
};

const Title = ({ value, additionalStyle }: TitleProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : css();
  return <h1 css={style(additionalStyle)}>{value}</h1>;
};

export default Title;
