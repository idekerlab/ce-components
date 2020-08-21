import 'react-app-polyfill/ie11';
import * as React from 'react';
import { useState } from 'react'
import * as ReactDOM from 'react-dom';
import { Thing } from '../.';
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
    return fetch('http://dev.ndexbio.org/v2/network/67e9e577-9a04-11ea-96e4-525400c25d22?download=true&id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjZiYzYzZTlmMThkNTYxYjM0ZjU2NjhmODhhZTI3ZDQ4ODc2ZDgwNzMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODAyODM5Njk4NTk4LW1ycmQzaXEzamwwNm42YzJmbzFwbW1jOHV1Z3Q5dWtxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODAyODM5Njk4NTk4LW1ycmQzaXEzamwwNm42YzJmbzFwbW1jOHV1Z3Q5dWtxLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTA0NjY1OTI2Mzk3NTAzODM5MzIxIiwiZW1haWwiOiJkb3Rhc2VrLmRldkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InZsVFF3eDZqY0RwS3Q5TkZjUWgzVVEiLCJuYW1lIjoiRGF2aWQgT3Rhc2VrIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BT2gxNEdoTnZHSHFoVWJWaTVKNjJsNlYwQ3ZodHdxYTFCU1BVdjlrS0RTTGtnPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkRhdmlkIiwiZmFtaWx5X25hbWUiOiJPdGFzZWsiLCJsb2NhbGUiOiJlbiIsImlhdCI6MTU5ODAzMzA4NSwiZXhwIjoxNTk4MDM2Njg1LCJqdGkiOiI0OGYyMzQyYmRmZTY2YjdiNWJhMjcxMzRiM2VmZWY5NGM0YjAyN2FkIn0.af7cOYGTtAG2ZRvlkOXqC1BBWpXeliR6LyEuv25pzPrUPs9cA1wr-1BrmfNbV_I821wThNwN6o61xikHTZCTgJtmYSMPsdFvRVDJLcDuBYPvKpkcBAxVrS3GJO7nrUxm027POsJ101AN32LjB3NTusEELyeC8WWR2lRUqvZdxgylYa5IypqyGJLTx7l8kVa-2BJFohOY_AIPfH-SeY99h4v0nsNkZPo4g0Ulp59c7F2wF8hZnMaIs3C9zkBpZMP944p9XlsjBpclejtNJWIPAhbODlL34fAX375i5hEgBaotum_jxEEt0cD5viBOB2MG_St2Yit_DqsW47ArVSP7zg')
      .then(function (response) {
        return response.json();
      }).catch( error => { console.log(error)} )
        
      
  }
  
  return (
    <CyNDExProvider port={1234}>
      <NDExAccountProvider ndexServerURL='http://public.ndexbio.org' >
      <NDExSignInButton variant="outlined" size="small" onLoginStateUpdated={loginStateUpdated} />
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
        <Thing />
      </NDExAccountProvider>
    </CyNDExProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
