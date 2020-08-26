import React from 'react'
import OpenInCytoscapeButton from '../src/OpenInCytoscapeButton';
import { CyNDExProvider } from '../src/CyNDExContext';
import { withKnobs, object } from '@storybook/addon-knobs';

export default {
  title: 'Open In Cytoscape Button',
  component: OpenInCytoscapeButton,
  decorators: [withKnobs],
}

const sampleNDExData = {
    ndexServer: 'http://public.ndexbio.org/v2',
    uuid: 'b1e9a489-bbe7-11ea-aaef-0ac135e8bacf',
    username: 'ismbdemo',
    password: 'ismbdemo2020'
}

export const UsingFetch = () => {

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

export const UsingNDEx = () => {

  const onSuccess = (data) => {
    console.log("SUCCESS: " + JSON.stringify(data));
  }

  const onFailure = (error) => {
    console.log("FAILURE: " + error);
  }

  return <CyNDExProvider port={1234}>
    <OpenInCytoscapeButton variant="outlined" size="small" ndexNetworkProperties={object('ndexNetworkProperties', sampleNDExData)} onSuccess={onSuccess} onFailure={onFailure} />
  </CyNDExProvider>
}