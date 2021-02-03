
type NDExAccountModel = {
  ndexServerURL: string
  googleClientId: string
  loginInfo: any
  setLoginInfo: Function,
  isUserProfileLoading : boolean,
  userProfile : any,
  userProfileError : string | undefined,
  getUserProfile : Function
}

export default NDExAccountModel