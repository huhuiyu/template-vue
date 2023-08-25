import { defineStore } from 'pinia'
import { LoginUser, UserInfoDAO } from '../ts/entity/LoginInfo'
import ApiService from '../ts/ApiService'
import { BaseUserResult } from '../ts/entity/ServerResultInfo'

const store = defineStore('main', {
  state: () => {
    return {
      count: 0,
      loginUser: UserInfoDAO.getInstance().load(),
    }
  },
  actions: {
    increment() {
      this.count++
    },
    // 更新当前登录用户信息
    updateLoginUser(cb: Function = () => {}) {
      ApiService.post(
        '/user/auth/getUserInfo',
        {},
        (data: BaseUserResult) => {
          if (data.success) {
            const user = new LoginUser()
            user.isLogin = data.success
            user.tbUser = data.tbUser
            user.tbUserInfo = data.tbUserInfo
            user.userOtherInfo = data.userOtherInfo
            UserInfoDAO.getInstance().save(user)
          } else {
            UserInfoDAO.getInstance().save(null)
          }
          this.loginUser = UserInfoDAO.getInstance().load()
          cb(this.loginUser)
        },
        true,
      )
    },
  },
})

export default store
