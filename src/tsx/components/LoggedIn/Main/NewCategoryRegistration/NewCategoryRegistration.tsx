/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { TOP_PAGE_PATH, newCategoryRegistrationPage } from '../../../../data/pages';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

type ResultsOfAddUserApi = {
  successful: boolean;
};

type AddUserProps = {
  permission: Permission;
};

const NewCategoryRegistration = ({ permission }: AddUserProps): JSX.Element => {
  const [categoryName, setCatregoryName] = useState<string>('');
  const [unsuccessful, setUnsuccessful] = useState<boolean>(false);

  useEffect(() => {
    document.title = newCategoryRegistrationPage.pageName;
  }, []);

  const onSetCategoryName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCatregoryName(e.target.value);
  };

  const registerCategoryToDB = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setUnsuccessful(false);
    const params = {
      categoryName: categoryName,
    };
    axios
      .post('./api/registerCategory.php', params)
      .then(({ data }) => {
        const resultData: ResultsOfAddUserApi = data;
        if (!resultData.successful) {
          setUnsuccessful(true);
        } else {
          setCatregoryName('');
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

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
      {unsuccessful ? <ErrorMessage value="You must fill in all of the fields." /> : null}
      {permission.editor ? null : <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default NewCategoryRegistration;
