/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import Button from '../template/Button';
import TextInput from '../template/TextInput';
import ErrorMessage from '../template/ErrorMessage';

const wrapperStyle = css`
  align-items: center;
  display: flex;
  background-color: #555;
  height: 100%;
  justify-content: center;
`;

const mainStyle = css`
  background-color: #fff;
  border-radius: 2rem;
  margin: auto;
  padding: 2rem;
  width: 50rem;
`;

const titleStyle = css`
  font-size: 3rem;
  margin: 0 0 1.5rem;
  text-align: center;
`;

const formStyle = css`
  & > *:first-child /* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ {
    margin-top: 2.5rem;
  }
`;

type LoginProps = {
  loggedIn: boolean;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
};

const Login = ({ onSetLoggedIn, onSetLoginUser, onSetPermission }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [missed, setMissed] = useState<boolean>(false);
  const [reDirect, setReDirect] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'Log in';
    return () => {
      document.title = '';
      setReDirect(false);
    };
  }, []);

  const onSetEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSetPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const submit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setMissed(false);

    const params = {
      email: email,
      password: password,
    };
    axios
      .post('./api/loginProcess.php', params)
      .then((results) => {
        if (results.data.loggedIn === false) {
          setPassword('');
          setMissed(true);
        } else {
          onSetLoggedIn(results.data.loggedIn);
          onSetLoginUser(results.data.userID);
          onSetPermission(Number(results.data.permission));
          setReDirect(true);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  };

  return (
    <Fragment>
      {reDirect ? <Redirect to="/home" /> : null}
      <div css={wrapperStyle}>
        <main css={mainStyle}>
          <h1 css={titleStyle}>CMS</h1>
          <form css={formStyle} autoComplete="on">
            <TextInput type="text" placeholder="Email" value={email} onChange={onSetEmail} marginTop="0" />
            <TextInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={onSetPassword}
              marginTop="2rem"
            />
            <Button
              as="submit"
              value="Log in"
              onClick={submit}
              additionalStyle={{ width: '100%', backgroundColor: '#0528c2', margin: '3.5rem auto 0' }}
              additionalHoverStyle={{ transform: 'scale(1.05)' }}
            />
          </form>
          {missed ? <ErrorMessage value="EmailかPasswordが違います" /> : null}
        </main>
      </div>
    </Fragment>
  );
};

export default Login;
