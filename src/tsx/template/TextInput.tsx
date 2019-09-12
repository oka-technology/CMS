/** @jsx jsx */
import { jsx, css } from '@emotion/core';

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

type TextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  marginTop: string;
  id?: string;
};

const TextInput = ({ type, placeholder, value, onChange, marginTop, id }: TextInputProps): JSX.Element => {
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

export default TextInput;
