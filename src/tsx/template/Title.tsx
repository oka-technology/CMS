/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import convertCSSPropertiesObjectToString from '../modules/convertCSSPropertiesObjectToString';
import { CSSProperties } from 'react';

const style = (additionalStyle: CSSProperties) => css`
  font-size: 3rem;
  height: 4.5rem;
  margin: 2rem 0;
  ${convertCSSPropertiesObjectToString(additionalStyle)}
`;

type TitleProps = {
  value: string;
  additionalStyle?: CSSProperties;
};

const Title = ({ value, additionalStyle }: TitleProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  return <h1 css={style(additionalStyle)}>{value}</h1>;
};

export default Title;
