import { KeycloakConfig } from 'keycloak-js'

type NDExAccountModel = {
  // Base URL of the NDEx server
  ndexServerURL: string

  // Keycloak server configuration. If not provided, basic auth will be used.
  keycloakConfig?: KeycloakConfig
  loginInfo: any
  setLoginInfo: (loginInfo: any) => void
  isUserProfileLoading: boolean
  userProfile: any
  userProfileError?: string
  getUserProfile: Function
}

export default NDExAccountModel
