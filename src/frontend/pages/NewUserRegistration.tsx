import { useState, Dispatch, SetStateAction, useEffect } from 'react';

import Title from '../template/Title';
import { Label, TextInput, CheckBox } from '../template/Form';
import Button from '../template/Button';
import ErrorMessage from '../template/ErrorMessage';
import { newUserRegistrationPage } from '../data/pages';
import { registerUser } from '../data/apiClient';
import styled from 'styled-components';
import SubmitButtonInner from '../template/SubmitButtonInner';

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
    <>
      <Title value={newUserRegistrationPage.pageName} />
      <Form autoComplete="new-password">
        <Label value="E-mail" htmlFor="email" />
        <StyledTextInput
          type="text"
          placeholder=""
          value={Email}
          onChange={onSetEmail}
          id="email"
        />
        <Label value="Password" htmlFor="password" />
        <StyledTextInput
          type={hidePassword ? 'password' : 'text'}
          placeholder=""
          value={password}
          onChange={onSetPassword}
          id="password"
        />
        <StyledCheckBox
          value="Hide password"
          onChange={onSetHidePassword}
          checked={hidePassword}
        />
        <PermissionItemHeading>
          Permission (Fill one or more)
        </PermissionItemHeading>
        <PermissionCheckBoxesWrapper>
          {permissionCheckBoxes}
        </PermissionCheckBoxesWrapper>

        <SubmitButton>
          <SubmitButtonInner
            type="submit"
            onClick={registerUserToDB}
            value="Register"
          />
        </SubmitButton>
      </Form>
      {!success && (
        <ErrorMessage>You must fill in all of the fields.</ErrorMessage>
      )}
    </>
  );
};

export default NewUserRegistration;

const Form = styled.form`
  & > *:first-child {
    margin-top: 0;
  }
`;

const StyledTextInput = styled(TextInput)`
  margin-top: 0.5rem;
`;

const StyledCheckBox = styled(CheckBox)`
  font-size: 1.4rem;
  margin-top: 0.2rem;
`;

const PermissionItemHeading = styled.p`
  font-size: 1.8rem;
  margin: 3rem 0 0;
`;

const PermissionCheckBoxesWrapper = styled.div`
  display: flex;
  margin-top: 0.5rem;
  & > *:not(:first-child) {
    margin-left: 3rem;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #0528c2;
  margin-top: 4rem;
`;
