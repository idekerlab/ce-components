import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';
import { CyNDExProvider } from '../.';

const App = () => {
  return (
    <CyNDExProvider port={ 1234 }>
    <Thing />
    </CyNDExProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
