import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import Button from '../template/Button';
import { TextInput } from '../template/Form';
import ErrorMessage from '../template/ErrorMessage';
import { login } from '../data/apiClient';
import styled from 'styled-components';
import SubmitButtonInner from '../template/SubmitButtonInner';

type LoginProps = {
  loggedIn: boolean;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
};

const Login = ({
  onSetLoggedIn,
  onSetLoginUser,
  onSetPermission,
}: LoginProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [missed, setMissed] = useState<boolean>(false);
  const [reDirect, setReDirect] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Log in';
    return () => {
      setReDirect(false);
    };
  }, []);

  const onSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const submit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMissed(false);

    const LoginProcessData = await login({
      email: email,
      password: password,
    });
    if (!LoginProcessData || !LoginProcessData.loggedIn) {
      setPassword('');
      setMissed(true);
      return;
    }
    onSetLoggedIn(LoginProcessData.loggedIn);
    onSetLoginUser(LoginProcessData.userID);
    onSetPermission(Number(LoginProcessData.permission));
    setReDirect(true);
  };

  return (
    <>
      {reDirect ? <Redirect to="/home" /> : null}
      <Wrapper>
        <Main>
          <Title>CMS</Title>
          <Form autoComplete="on">
            <StyledTextInput
              type="text"
              placeholder="Email"
              value={email}
              onChange={onSetEmail}
            />
            <StyledTextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={onSetPassword}
            />
            <StyledButton>
              <SubmitButtonInner
                type="submit"
                onClick={submit}
                value="Log in"
              />
            </StyledButton>
          </Form>
          {missed && (
            <ErrorMessage>
              The Email and password you entered did not match our records.
            </ErrorMessage>
          )}
        </Main>
      </Wrapper>
    </>
  );
};

export default Login;

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #555;
  height: 100%;
  justify-content: center;
`;

const Main = styled.main`
  background-color: #fff;
  border-radius: 2rem;
  margin: auto;
  padding: 2rem;
  width: 55rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const StyledTextInput = styled(TextInput)``;

const Form = styled.form`
  & > *:first-child {
    margin-top: 2.5rem;
  }

  & > ${StyledTextInput} + ${StyledTextInput} {
    margin-top: 2rem;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #0528c2;
  margin: 3.5rem auto 0;

  :hover {
    transform: scale(1.05);
  }
`;
