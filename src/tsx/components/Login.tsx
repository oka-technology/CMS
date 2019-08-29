/** @jsx jsx */
import { jsx, css ,keyframes} from '@emotion/core'
import { useEffect, Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { createBrowserHistory } from 'history';

import { styleOfButton } from './template/styles';

type LoginProps = {
  loggedIn: boolean,
  onSetLoggedIn: (bool: boolean) => void,
  onSetLoginUser: (name: string) => void,
  onSetAuthority: (authority: number) => void,
}

const wrapper = css`
  align-items: center;
  display: flex;
  background-color: #555;
  height: 100%;
  justify-content: center;
`;

const main = css`
  background-color: #fff;
  border-radius: 2.0rem;
  margin: auto;
  padding: 2.0rem;
  width: 80.0rem;
`;

const title = css`
  font-size: 3.0rem;
  margin: 0 0 1.5rem;
`;

const form = css`
  & > *:first-child{
    margin-top: 0;
  }
`;

const formLabel = css`
  display: block;
  font-size: 1.6rem;
  margin-top: 2.5rem;
`;

const formTextInput = css`
  display: block;
  font-size: 1.6rem;
  margin-top: 0.7rem;
  width: 100%;
`;

const errorMessageAnimation = keyframes`
  from {
    opacity: 0; 
    transform: translateY(1rem);
  }
  to {
    opacity: 1; 
    transform: translateY(0);
  }
`;

const errorMessage = css`
  color: red;
  font-size: 1.6rem;
  margin-bottom: 0;
  animation: ${errorMessageAnimation} 0.7s ease-out;
`;

const Login = ({ loggedIn, onSetLoggedIn, onSetLoginUser, onSetAuthority }: LoginProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [missed, setMissed] = useState<boolean>(false);
  const [reDirect, setReDirect] = useState<boolean>(false);

  useEffect(() => {
    document.title = 'ログイン画面';
    return () => {
      setReDirect(false);
    }
  }, [])

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) };
  const submit = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setMissed(false);

    let params = new URLSearchParams();
    params.append('email', email);
    params.append('password', password);
    axios.post('./api/loginProcess.php', params)
      .then((results) => {
        if (results.data.loggedIn === false) {
          setPassword('');
          setMissed(true);
        } else {
          onSetLoggedIn(results.data.loggedIn);
          onSetLoginUser(results.data.userID);
          onSetAuthority(Number(results.data.authority));
          setReDirect(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      {reDirect ? <Redirect to='/home' /> : null}
      <div css={wrapper}>
        <main css={main}>
          <h1 css={title}>Login</h1>
          <form css={form}>
            <label css={formLabel} htmlFor="Email">Email</label>
            <input css={formTextInput} type="text" id="Email" placeholder="Enter Email" value={email} onChange={emailChange} />
            <label css={formLabel} htmlFor="Password">Password</label>
            <input css={formTextInput} type="password" id="Password" placeholder="Password" value={password} onChange={passwordChange} />
            <input css={styleOfButton('#0528c2')} type="submit" value="Login" onClick={submit} />
          </form>
          {missed ? <p css={errorMessage} >EmailかPasswordが違います</p> : null }
        </main>
      </div>
    </Fragment>
  );
}

export default Login;
