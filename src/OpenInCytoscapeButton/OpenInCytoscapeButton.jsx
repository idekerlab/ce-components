import React, { useState, useEffect, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import ndexClient from 'ndex-client';

import { useCyNDExValue } from '../CyNDExContext'
import { NDExAccountContext } from '../NDExAccountContext'
import LargeNetworkDialog from './LargeNetworkDialog'

const styles = theme => ({
  button: {
    color: '#EA9123',
    borderColor: '#EA9123',
    '&:active': {
      borderColor: '#EA9123'
    },
    'line-height': 0
  },
  iconSmall: {
    height: '22px',
    'margin-left': '2px'
  },
  iconMedium: {
    height: '24px'
  },
  iconLarge: {
    height: '26px'
  },
  buttonIcon: {
    height: '100%',
    width: '100%'
  }

})

const OpenInCytoscapeButton = props => {

  const cyNDExValue = useCyNDExValue();
  const cyRESTAvailable = cyNDExValue.state.available;
  const cyRESTPort = cyNDExValue.state.port;

  const ndexAccountContext = useContext(NDExAccountContext);

  const [largeNetworkDialogOpen, setLargeNetworkDialogOpen] = useState(false);

  const { ndexServerURL, loginInfo } = ndexAccountContext ? ndexAccountContext : {undefined, undefined};

  const importNetworkFromNDEx = (createView) => {
    console.log('importNetworkFromNDEx createView: ', createView);
    const cyndex = new ndexClient.CyNDEx(cyRESTPort);
    cyndex.setNDExServer(ndexServerURL);
    if (loginInfo) {
      if (loginInfo.isGoogle) {
        cyndex.setAuthToken(loginInfo.loginDetails.tokenId);
      } else {
        cyndex.setBasicAuth(loginInfo.loginDetails.id, loginInfo.loginDetails.password);
      }
    }
    const accessKey = ndexNetworkProperties.accessKey;
    const idToken = ndexNetworkProperties.idToken;
    cyndex.postNDExNetworkToCytoscape(ndexNetworkProperties.uuid, accessKey, createView)
      .then(response => {
        typeof onSuccess !== "undefined" && onSuccess(response.data)
      })
      .catch(error => { 
        typeof onFailure !== "undefined" && onFailure(error) 
      });
  }

  const getObjectCount = (ndexNetworkProperties) => {
    if (!ndexNetworkProperties.summary) { return undefined;}

    return (ndexNetworkProperties.summary.edgeCount ? ndexNetworkProperties.summary.edgeCount : 0) 
      + (ndexNetworkProperties.summary.nodeCount ? ndexNetworkProperties.summary.nodeCount : 0);
  }

  const importNetwork = () => {
    
    if (ndexNetworkProperties) {
      const objectCount = getObjectCount(ndexNetworkProperties);
    
      if (!objectCount) {
        importNetworkFromNDEx(undefined);
      }
      else if (objectCount > 100000) {
        setLargeNetworkDialogOpen(true);
      } else {
        importNetworkFromNDEx(true);
      }
    } else {
      const cyndex = new ndexClient.CyNDEx(cyRESTPort);
      fetchCX().then(cx => {
        cyndex.postCXNetworkToCytoscape(cx)
          .then(response => {
            typeof onSuccess !== "undefined" && onSuccess(response.data)
          })
          .catch(error => { 
            typeof onFailure !== "undefined" && onFailure(error) 
          });
      }, error => { 
        typeof onFailure !== "undefined" && onFailure(error) 
      });
    }

  }

  const {
    variant,
    size,
    onSuccess,
    onFailure,
    fetchCX,
    ndexNetworkProperties
  } = props

  const { classes } = props

  const iconClassName = (size) => {
    switch (size) {
      case 'small': return classes.iconSmall;
      case 'large': return classes.iconLarge;
      default: return classes.iconMedium;
    }
  }

  return (
    <React.Fragment>
      <Tooltip
        disableFocusListener
        title="Open this network in Cytoscape Desktop"
        placement="bottom"
      >
        <span><Button //Do not add any spaces between the span and button tags. Tooltip interprets these as an array of elements instead of nested elements and will throw an exception.
          className={classes.button}
          variant={variant}
          disabled={!cyRESTAvailable}
          onClick={importNetwork}
          size={size}
        >
          Open In Cytoscape
          <Icon className={iconClassName(size)} >
            <img className={classes.buttonIcon} src={!cyRESTAvailable ? logoDisabled : logo} />
          </Icon>
        </Button></span>
      </Tooltip>
      <LargeNetworkDialog isOpen={largeNetworkDialogOpen} 
        setIsOpen={setLargeNetworkDialogOpen} 
        importNetworkFunction={importNetworkFromNDEx}
      />
    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
