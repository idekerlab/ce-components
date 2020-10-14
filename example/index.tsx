import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useState } from 'react'
import * as ReactDOM from 'react-dom';
import { CyNDExProvider } from '../.';
import { NDExAccountProvider } from '../.';
import { OpenInCytoscapeButton } from '../.';
import { NDExSignInButton } from '../.';
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const App = () => {
  let DEFAULT_NETWORK_PROPERTIES = {
    ndexServer: 'http://public.ndexbio.org/',
    uuid: 'b1e9a489-bbe7-11ea-aaef-0ac135e8bacf',
    username: 'ismbdemo',
    password: 'ismbdemo2020'
  };

  const loginStateUpdated = loginState => {
    console.log("Update in login state: " + JSON.stringify(loginState));
  }

  const [ndexNetworkProperties, setNdexNetworkProperties] = useState(DEFAULT_NETWORK_PROPERTIES);

  const onSuccess = (data) => {
    console.log("SUCCESS: " + JSON.stringify(data));
  }

  const onFailure = (error) => {
    console.log("FAILURE: " + error);
  }

  const handleChange = (event) => {
    const newProperties = Object.assign({}, ndexNetworkProperties);
    switch (event.target.id) {
      case 'uuid': newProperties['uuid'] = event.target.value; break;
      default: break;
    }
    setNdexNetworkProperties(
      newProperties
    );
  }

  const fetchCX = () => {
    return fetch('http://dev.ndexbio.org/v2/network/67e9e577-9a04-11ea-96e4-525400c25d22')
      .then(function (response) {
        return response.json();
      }).catch( error => { console.log(error)} )
  }
  
  return (
    <CyNDExProvider port={1234}>
      <NDExAccountProvider ndexServerURL='http://dev.ndexbio.org' googleClientId='802839698598-mrrd3iq3jl06n6c2fo1pmmc8uugt9ukq.apps.googleusercontent.com'>
      <NDExSignInButton variant="outlined" size="small" onLoginStateUpdated={loginStateUpdated}  myAccountURL={'https://dev.ndexbio.org/#/myAccount'}/>
      <OpenInCytoscapeButton variant="outlined" size="small" fetchCX={fetchCX} onSuccess={onSuccess} onFailure={onFailure}/>
      <Typography variant="h6" gutterBottom>
      OpenInCytoscapeButton with Context Authentication
      </Typography>

    <TextField
      id="uuid"
      label="UUID"
      autoComplete="uuid"
      onChange={handleChange}
      value={ndexNetworkProperties.uuid}
    /><br />
    <br />
    <OpenInCytoscapeButton variant="outlined" ndexNetworkProperties={ndexNetworkProperties} onSuccess={onSuccess} onFailure={onFailure}></OpenInCytoscapeButton>
    <br /><br />
      </NDExAccountProvider>
    </CyNDExProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
