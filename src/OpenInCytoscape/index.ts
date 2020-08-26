import ndexClient from 'ndex-client';

export type NDExNetworkProperties = {
    uuid: string
    accessKey?: string
    idToken?: string
    ndexServer?: string
}

export interface FetchCX {
    (): Promise<any>
}

export interface Callback {
    ( error : any )
}

export const openInCytoscape = (cyRESTPort: bigint, 
    ndexNetworkProperties: NDExNetworkProperties,
    fetchCX : FetchCX,
    loginInfo: any,
    onSuccess : Callback,
    onFailure : Callback
    ) => {
    const cyndex = new ndexClient.CyNDEx(cyRESTPort);
   
    if (ndexNetworkProperties) {
        ndexNetworkProperties.ndexServer && cyndex.setNDExServer(ndexNetworkProperties.ndexServer);
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
