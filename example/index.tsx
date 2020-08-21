import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';
import { CyNDExProvider } from '../.';
import { NDExAccountProvider } from '../.';
import { OpenInCytoscapeButton } from '../.';

const App = () => {
  return (
    <CyNDExProvider port={1234}>
      <NDExAccountProvider ndexServerURL='http://public.ndexbio.org' >
      <OpenInCytoscapeButton variant="outlined" size="small" />
        <Thing />
      </NDExAccountProvider>
    </CyNDExProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
