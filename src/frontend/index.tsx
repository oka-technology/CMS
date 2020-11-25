import ReactDOM from 'react-dom';

import App from './App';

import '../api/loginProcess.php';
import '../api/checkWhetherLoggedIn.php';
import '../api/logoutProcess.php';
import '../api/userList.php';
import '../api/convertPermission.php';
import '../api/sessionConfiguration.php';
import '../api/registerUser.php';
import '../api/contentList.php';
import '../api/categories.php';
import '../api/registerCategory.php';
import '../api/registerContent.php';
import '../api/content.php';
import '../api/editContent.php';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';

ReactDOM.render(<App />, document.querySelector('#App'));
