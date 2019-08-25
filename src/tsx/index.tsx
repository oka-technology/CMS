import '../index.html';
import Header from './components/Header/Header'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styled from 'styled-components';
import { css } from 'styled-components';

const App = (): JSX.Element => {
  return(
    <>
      <Header userID='a' authority='a' />
      <div>test</div>
    </>
  );
}

ReactDOM.render(<App />, document.querySelector('#App'));
