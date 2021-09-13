type NDExAccountModel = {
  ndexServerURL: string
  googleClientId: string
  loginInfo: any
  setLoginInfo: (loginInfo: any) => void
  isUserProfileLoading: boolean
  userProfile: any
  userProfileError: string | undefined
  getUserProfile: Function
}

export default NDExAccountModel
