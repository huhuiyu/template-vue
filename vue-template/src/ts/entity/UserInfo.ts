// 用户相关信息

/**
 * 用户基本信息
 */
class TbUser {
  accessKey: string = ''
  enable: string = ''
  lastupdate: number = 0
  nickname: string = ''
  password: string = ''
  role: string = ''
  uid: number = 0
  username: string = ''
  constructor() {}
}

/**
 * 用户附加信息
 */
class TbUserInfo {
  email: string = ''
  img: string = ''
  lastupdate: number = 0
  info: string = ''
  phone: string = ''
  qq: string = ''
  sex: string = ''
  wechat: string = ''
  uid: number = 0

  constructor() {}
}

/**
 * 用户其它信息
 */
class UserOtherInfo {
  follow: number = 0
  followMe: number = 0
  followMine: boolean = false
  message: number = 0
  mineFollow: boolean = false
  regDays: number = 0
  reply: number = 0
  supporteMessage: number = 0
  supporteReply: number = 0
  totalHits: number = 0

  constructor() {}
}

export { TbUser as default, TbUserInfo as TbUserInfo, UserOtherInfo as UserOtherInfo }
