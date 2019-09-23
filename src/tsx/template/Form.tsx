/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import convertCSSPropertiesObjectToString from '../modules/convertCSSPropertiesObjectToString';
import { CSSProperties } from 'react';

const textInputStyle = (marginTop: string) => css`
  border-radius: 0.5rem;
  display: block;
  font-size: 1.6rem;
  height: 4rem;
  margin-top: ${marginTop};
  width: 100%;

  &::placeholder {
    color: #777;
  }
`;

const checkBoxStyle = css`
  display: block;
  margin-right: 0.8rem;
`;

const checkBoxEntireStyle = (additionalStyle: CSSProperties) => css`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  width: max-content;
  ${convertCSSPropertiesObjectToString(additionalStyle)}
`;

const textareaStyle = css`
  font-size: 1.6rem;
  resize: none;
  height: 20rem;
  width: 100%;
`;

type TextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  marginTop: string;
  id?: string;
};

type CheckBoxProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  additionalStyle?: CSSProperties;
};

type FormSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionItems: OptionItem[];
  id?: string;
};

type OptionItem = {
  text: string;
  value: string;
};

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const TextInput = ({ type, placeholder, value, onChange, marginTop, id }: TextInputProps): JSX.Element => {
  return (
    <input
      css={textInputStyle(marginTop)}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
};

export const CheckBox = ({ value, onChange, checked, additionalStyle }: CheckBoxProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  return (
    <label css={checkBoxEntireStyle(additionalStyle)}>
      <input css={checkBoxStyle} type="checkbox" checked={checked} onChange={onChange} />
      {value}
    </label>
  );
};

export const FormSelect = ({ onChange, optionItems, id }: FormSelectProps): JSX.Element => {
  const innerItem: JSX.Element[] = optionItems.map(({ value, text }) => (
    <option value={value} id={id} key={value}>
      {text}
    </option>
  ));
  return (
    <select onChange={onChange}>
      <option value="0">Not selected</option>
      {innerItem}
    </select>
  );
};

export const TextArea = ({ value, onChange }: TextAreaProps): JSX.Element => {
  return <textarea css={textareaStyle} value={value} onChange={onChange} />;
};
