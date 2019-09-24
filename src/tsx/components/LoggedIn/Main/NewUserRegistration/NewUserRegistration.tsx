/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, Dispatch, SetStateAction, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import { Label, TextInput, CheckBox } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { TOP_PAGE_PATH, newUserRegistrationPage } from '../../../../data/pages';

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 0;
  }
`;

const permissionItemHeadingStyle = css`
  font-size: 1.8rem;
  margin: 3rem 0 0;
`;

const permissionCheckBoxesWrapperStyle = css`
  display: flex;
  margin-top: 0.5rem;
  & > *:not(:first-child) /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-left: 3rem;
  }
`;

type PermissionCheckBoxProps = {
  permissionName: string;
  permissionState: boolean;
  setPermissionFunction: Dispatch<SetStateAction<boolean>>;
};

type ResultsOfAddUserApi = {
  successful: boolean;
};

type AddUserProps = {
  permission: Permission;
};

const NewUserRegistration = ({ permission }: AddUserProps): JSX.Element => {
  const [Email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [adminPermission, setAdminPermission] = useState<boolean>(false);
  const [editorPermission, setEditorPermission] = useState<boolean>(false);
  const [viewerPermission, setViewerPermission] = useState<boolean>(false);
  const [unsuccessful, setUnsuccessful] = useState<boolean>(false);

  const onSetEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onSetHidePassword = (): void => {
    setHidePassword(!hidePassword);
  };
  const registerUserToDB = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    setUnsuccessful(false);
    const params = {
      email: Email,
      password: password,
      adminPermission: adminPermission,
      editorPermission: editorPermission,
      viewerPermission: viewerPermission,
    };
    axios
      .post('./api/registerUser.php', params)
      .then((result) => {
        const data: ResultsOfAddUserApi = result.data;
        if (!data.successful) {
          setUnsuccessful(true);
        } else {
          setEmail('');
          setPassword('');
          setAdminPermission(false);
          setEditorPermission(false);
          setViewerPermission(false);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  const permissionCheckBoxProps: PermissionCheckBoxProps[] = [
    {
      permissionName: 'Admin',
      permissionState: adminPermission,
      setPermissionFunction: setAdminPermission,
    },
    {
      permissionName: 'Editor',
      permissionState: editorPermission,
      setPermissionFunction: setEditorPermission,
    },
    {
      permissionName: 'Viewer',
      permissionState: viewerPermission,
      setPermissionFunction: setViewerPermission,
    },
  ];

  const permissionCheckBoxes: JSX.Element[] = permissionCheckBoxProps.map(
    ({ permissionName, permissionState, setPermissionFunction }) => (
      <CheckBox
        value={permissionName}
        onChange={() => {
          setPermissionFunction(!permissionState);
        }}
        checked={permissionState}
        key={permissionName}
      />
    ),
  );

  useEffect(() => {
    document.title = newUserRegistrationPage.pageName;
  }, []);

  return (
    <Fragment>
      <Title value={newUserRegistrationPage.pageName} />
      <form css={formStyle} autoComplete="new-password">
        <Label value="E-mail" htmlFor="email" />
        <TextInput type="text" placeholder="" value={Email} onChange={onSetEmail} marginTop="0.5rem" id="email" />
        <Label value="Password" htmlFor="password" />
        <TextInput
          type={hidePassword ? 'password' : 'text'}
          placeholder=""
          value={password}
          onChange={onSetPassword}
          marginTop="0.5rem"
          id="password"
        />
        <CheckBox
          value="Hide password"
          onChange={onSetHidePassword}
          checked={hidePassword}
          additionalStyle={{ fontSize: '1.4rem', marginTop: '0.2rem' }}
        />
        <p css={permissionItemHeadingStyle}>Permission (Fill one or more)</p>
        <div css={permissionCheckBoxesWrapperStyle}>{permissionCheckBoxes}</div>
        <Button
          as="submit"
          value="Register"
          onClick={registerUserToDB}
          additionalStyle={{ backgroundColor: '#0528c2', marginTop: '4rem' }}
        />
      </form>
      {unsuccessful ? <ErrorMessage value="You must fill in all of the fields." /> : null}
      {permission.admin ? null : <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default NewUserRegistration;
