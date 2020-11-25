import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import {
  TOP_PAGE_PATH,
  newCategoryRegistrationPage,
} from '../../../../data/pages';
import { registerCategory } from '../../../../data/apiClient';
import styled from 'styled-components';
import SubmitButtonInner from '../../../../template/SubmitButtonInner';

type AddUserProps = {
  permission: Permission;
};

const NewCategoryRegistration = ({ permission }: AddUserProps): JSX.Element => {
  const [categoryName, setCatregoryName] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(true);

  const onSetCategoryName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCatregoryName(e.target.value);
  };

  const registerCategoryToDB = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSuccess(true);
    const payload = await registerCategory({
      categoryName: categoryName,
    });
    if (!payload || !payload.successful) {
      setSuccess(false);
      return;
    }
    setCatregoryName('');
  };

  useEffect(() => {
    document.title = newCategoryRegistrationPage.pageName;
  }, []);

  return (
    <>
      <Title value={newCategoryRegistrationPage.pageName} />
      <Form>
        <Label value="Title" htmlFor="categoryName" />
        <CategoryNameInput
          type="text"
          placeholder=""
          value={categoryName}
          onChange={onSetCategoryName}
          id="categoryName"
        />
        <SubmitButton>
          <SubmitButtonInner
            type="submit"
            onClick={registerCategoryToDB}
            value="Register"
          />
        </SubmitButton>
      </Form>
      {!success && (
        <ErrorMessage>You must fill in all of the fields.</ErrorMessage>
      )}
      {!permission.editor && <Redirect to={TOP_PAGE_PATH} />}
    </>
  );
};

export default NewCategoryRegistration;

const Form = styled.form`
  & > *:first-child {
    margin-top: 0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #0528c2;
  margin-top: 4rem;
`;

const CategoryNameInput = styled(TextInput)`
  margin-top: 0.5rem;
`;
