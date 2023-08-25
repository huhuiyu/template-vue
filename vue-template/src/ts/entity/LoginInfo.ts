import TbUser, { TbUserInfo, UserOtherInfo } from './UserInfo'

/**
 * 登录用户信息
 */
class LoginUser {
  isLogin: boolean = false
  tbUser: TbUser = new TbUser()
  tbUserInfo: TbUserInfo = new TbUserInfo()
  userOtherInfo: UserOtherInfo = new UserOtherInfo()
}

/**
 * 本地存储用户信息的操作类
 */
class UserInfoDAO {
  private static instance: UserInfoDAO = new UserInfoDAO()

  localKey: string = 'huhuiyu.teach-project-userinfo'

  load(): LoginUser {
    let user = localStorage.getItem(this.localKey)
    if (user) {
      return JSON.parse(user)
    }
    return new LoginUser()
  }

  save(loginUser: LoginUser | null): void {
    if (loginUser == null) {
      localStorage.removeItem(this.localKey)
    } else {
      localStorage.setItem(this.localKey, JSON.stringify(loginUser))
    }
  }

  static getInstance() {
    return this.instance
  }

  private constructor() {}
}

export { LoginUser as LoginUser, UserInfoDAO as UserInfoDAO }
export default LoginUser
