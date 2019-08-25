/** @jsx jsx */
import { jsx } from '@emotion/core'

import '../index.html';
import Header from './components/Header/Header'

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import './global.css';

import { Fragment } from 'react';
import * as ReactDOM from 'react-dom';

const App = (): JSX.Element => {
  return(
    <Fragment>
      <Header userID='a' authority='a' />
      <div>test</div>
    </Fragment>
  );
}

ReactDOM.render(<App />, document.querySelector('#App'));
