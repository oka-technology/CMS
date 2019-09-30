/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { TOP_PAGE_PATH, newCategoryRegistrationPage } from '../../../../data/pages';
import { registerCategory } from '../../../../data/apiClient';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

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
    <Fragment>
      <Title value={newCategoryRegistrationPage.pageName} />
      <form css={formStyle}>
        <Label value="Title" htmlFor="categoryName" />
        <TextInput
          type="text"
          placeholder=""
          value={categoryName}
          onChange={onSetCategoryName}
          marginTop="0.5rem"
          id="categoryName"
        />
        <Button
          as="submit"
          value="Register"
          onClick={registerCategoryToDB}
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {!success && <ErrorMessage value="You must fill in all of the fields." />}
      {!permission.editor && <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default NewCategoryRegistration;
