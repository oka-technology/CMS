/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, Fragment, Dispatch, SetStateAction, useEffect } from 'react';

import Title from '../../../../template/Title';
import { Label, TextInput, CheckBox } from '../../../../template/Form';
import Button from '../../../../template/Button';
import ErrorMessage from '../../../../template/ErrorMessage';
import { newUserRegistrationPage } from '../../../../data/pages';
import { registerUser } from '../../../../data/apiClient';

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

const NewUserRegistration = (): JSX.Element => {
  const [Email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [adminPermission, setAdminPermission] = useState<boolean>(false);
  const [editorPermission, setEditorPermission] = useState<boolean>(false);
  const [viewerPermission, setViewerPermission] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);

  const onSetEmail = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };
  const onSetHidePassword = (): void => {
    setHidePassword(!hidePassword);
  };
  const registerUserToDB = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setSuccess(true);
    const data = await registerUser({
      email: Email,
      password: password,
      adminPermission: adminPermission,
      editorPermission: editorPermission,
      viewerPermission: viewerPermission,
    });
    if (!data || !data.successful) {
      setSuccess(false);
      return;
    }
    setEmail('');
    setPassword('');
    setAdminPermission(false);
    setEditorPermission(false);
    setViewerPermission(false);
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
      {!success && <ErrorMessage value="You must fill in all of the fields." />}
    </Fragment>
  );
};

export default NewUserRegistration;
