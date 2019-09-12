/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import convertCSSPropertiesObjectToString from '../modules/convertCSSPropertiesObjectToString';
import { CSSProperties } from 'react';

const checkBoxEntireStyle = (additionalStyle: CSSProperties) => css`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  width: max-content;
  ${convertCSSPropertiesObjectToString(additionalStyle)}
`;

const checkBoxStyle = css`
  display: block;
  margin-right: 0.8rem;
`;

type CheckBoxProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  additionalStyle?: CSSProperties;
};

const CheckBox = ({ value, onChange, checked, additionalStyle }: CheckBoxProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  return (
    <label css={checkBoxEntireStyle(additionalStyle)}>
      <input css={checkBoxStyle} type="checkbox" checked={checked} onChange={onChange} />
      {value}
    </label>
  );
};

export default CheckBox;
