/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useEffect, Fragment, useState, ChangeEvent } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

type LoginProps = {
  loggedIn: boolean,
  onSetLoggedIn: (bool: boolean) => void,
  onSetLoginUser: (name: string) => void,
  onSetAuthority: (authority: string) => void,
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

const Login = ({ loggedIn, onSetLoggedIn, onSetLoginUser, onSetAuthority }: LoginProps): JSX.Element => {
  const [eMail, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };
  const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) };
  const submit = (e: React.MouseEvent) => {
    e.preventDefault;

    let params = new URLSearchParams();
    params.append('email', eMail);
    params.append('password', password);
    axios.post('./api/loginProcess.php', params)
      .then((results) => {
        onSetLoggedIn(results.data.loggedIn);
        onSetLoginUser(results.data.userID);
        onSetAuthority(results.data.authority);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      { loggedIn ? <Redirect to='/LoggedIn' /> : null }
      <div css={wrapper}>
        <main css={main}>
          <h1 css={title}>Login</h1>
          <form>
            <label htmlFor="Email">Email</label>
            <input type="email" id="Email" placeholder="Enter Email" value={eMail} onChange={emailChange} />
            <label htmlFor="Password">Password</label>
            <input type="password" id="Password" placeholder="Password" value={password} onChange={passwordChange} />
            <input type="submit" value="Login" onClick={submit} />
          </form>
        </main>
      </div>
    </Fragment>
  );
}

export default Login;