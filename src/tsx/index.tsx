/** @jsx jsx */
import { jsx } from '@emotion/core';
import ReactDOM from 'react-dom';

import App from './App';

import '../index.html';
import '../.htaccess';
import '../api/loginProcess.php';
import '../api/checkWhetherLoggedIn.php';
import '../api/logoutProcess.php';
import '../api/userList.php';
import '../api/convertPermission.php';
import '../api/sessionConfiguration.php';
import '../api/addUser.php';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';

ReactDOM.render(<App />, document.querySelector('#App'));
