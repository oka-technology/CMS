import styled from 'styled-components';

const LabelWrapper = styled.label`
  display: block;
  font-size: 1.8rem;
  margin-top: 3rem;
`;

const TextInputWrapper = styled.input`
  border-radius: 0.5rem;
  display: block;
  font-size: 1.6rem;
  height: 4rem;
  width: 100%;

  &::placeholder {
    color: #777;
  }
`;

const CheckBoxInner = styled.input`
  display: block;
  margin-right: 0.8rem;
`;

const CheckBoxWrapper = styled.label`
  align-items: center;
  display: flex;
  font-size: 1.6rem;
  width: max-content;
`;

const SelectWrapper = styled.select`
  border-radius: 0.5rem;
  font-size: 1.6rem;
  width: 100%;
`;

const SelectOption = styled.option`
  color: red;
`;

const TextAreaWrapper = styled.textarea`
  border-radius: 0.5rem;
  font-size: 1.6rem;
  resize: none;
  height: 40rem;
  width: 100%;
`;

type LabelProps = {
  htmlFor: string;
  value: string;
};

type TextInputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
};

type CheckBoxProps = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  className?: string;
};

type FormSelectProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  optionItems: OptionItem[];
  id?: string;
  value: string;
  className?: string;
};

type OptionItem = {
  text: string;
  value: string;
};

type TextAreaProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
  id?: string;
};

export const Label = ({ htmlFor, value }: LabelProps): JSX.Element => {
  return <LabelWrapper htmlFor={htmlFor}>{value}</LabelWrapper>;
};

export const TextInput = ({
  type,
  placeholder,
  value,
  onChange,
  id,
  className,
}: TextInputProps): JSX.Element => {
  return (
    <TextInputWrapper
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
};

export const CheckBox = ({
  value,
  onChange,
  checked,
  className,
}: CheckBoxProps): JSX.Element => {
  return (
    <CheckBoxWrapper className={className}>
      <CheckBoxInner type="checkbox" checked={checked} onChange={onChange} />
      {value}
    </CheckBoxWrapper>
  );
};

export const FormSelect = ({
  onChange,
  optionItems,
  id,
  className,
  value,
}: FormSelectProps): JSX.Element => {
  return (
    <SelectWrapper
      value={value}
      className={className}
      onChange={onChange}
      id={id}
      style={value === '0' ? { color: 'red' } : undefined}
    >
      <SelectOption value="0">not selected</SelectOption>
      {optionItems.map(({ value, text }) => (
        <option value={value} key={value}>
          {text}
        </option>
      ))}
    </SelectWrapper>
  );
};

export const TextArea = ({
  value,
  onChange,
  className,
  id,
}: TextAreaProps): JSX.Element => {
  return (
    <TextAreaWrapper
      className={className}
      value={value}
      onChange={onChange}
      id={id}
    />
  );
};
