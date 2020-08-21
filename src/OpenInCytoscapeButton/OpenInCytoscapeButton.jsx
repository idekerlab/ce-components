import React, { useState, useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import logo from '../assets/images/cytoscape-logo.svg'
import logoDisabled from '../assets/images/cytoscape-logo-mono-light.svg'
import { withStyles } from '@material-ui/core'
import Tooltip from '@material-ui/core/Tooltip'
import ndexClient from 'ndex-client';

import { useCyNDExValue } from '../CyNDExContext'
import { useNDExAccountValue } from '../NDExAccountContext'

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
    height: '22px'
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

  const [{ ndexServerURL, loginInfo }, dispatch] = useNDExAccountValue();

  const importNetwork = () => {
    const cyndex = new ndexClient.CyNDEx(cyRESTPort);
    if (ndexNetworkProperties) {
      if (loginInfo) {
        if (loginInfo.isGoogle) {
          cyndex.setGoogleUser(loginInfo.loginDetails);
        } else {
          cyndex.setBasicAuth(loginInfo.loginDetails.id, loginInfo.loginDetails.password);
        }
      }
      const accessKey = ndexNetworkProperties.accessKey;
      const idToken = ndexNetworkProperties.idToken;
      cyndex.postNDExNetworkToCytoscape(ndexNetworkProperties.uuid, accessKey, idToken)
        .then(response => {
          typeof onSuccess !== "undefined" && onSuccess(response.data)
        })
        .catch(error => { 
          typeof onFailure !== "undefined" && onFailure(error) 
        });
    } else {
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
          <Icon className={iconClassName(size)} >
            <img className={classes.buttonIcon} src={!cyRESTAvailable ? logoDisabled : logo} />
          </Icon>
        </Button></span>
      </Tooltip>

    </React.Fragment>
  )
}

export default withStyles(styles)(OpenInCytoscapeButton)
