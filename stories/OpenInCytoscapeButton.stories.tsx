import React from 'react'
import OpenInCytoscapeButton from '../src/OpenInCytoscapeButton';
import { CyNDExProvider } from '../src/CyNDExContext';

export default {
  title: 'Open In Cytoscape Button',

}

export const Default = () => {

  const onSuccess = (data) => {
    console.log("SUCCESS: " + JSON.stringify(data));
  }

  const onFailure = (error) => {
    console.log("FAILURE: " + error);
  }

  const fetchCX = () => {
    return fetch('http://dev.ndexbio.org/v2/network/67e9e577-9a04-11ea-96e4-525400c25d22')
      .then(function (response) {
        return response.json();
      }).catch( error => { console.log(error)} )      
  }

  return <CyNDExProvider port={1234}>
    <OpenInCytoscapeButton variant="outlined" size="small" fetchCX={fetchCX} onSuccess={onSuccess} onFailure={onFailure} />
  </CyNDExProvider>
}
