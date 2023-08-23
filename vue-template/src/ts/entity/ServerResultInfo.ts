// 服务器应答对象
import TbUser, { TbUserInfo, UserOtherInfo } from './UserInfo'

/**
 * 最基本的应答类型
 */
class BaseResult {
  token: string = ''
  success: boolean = false
  message: string = ''
  code: number = 500
}

/**
 * 带数据的应答类型
 */
class BaseDataResult<T> extends BaseResult {
  data!: T
}

/**
 * 分页信息
 */
class PageInfo {
  total: number = 0
  pageCount: number = 0
  pageNumber: number = 1
  pageSize: number = 10
}

/**
 * 带分页查询的应答类型
 */
class BaseListResult<T> extends BaseResult {
  page: PageInfo = new PageInfo()
  list: Array<T> = []
}

/**
 * 登录用户信息查询的应答类型
 */
class BaseUserResult extends BaseResult {
  tbUser: TbUser = new TbUser()
  tbUserInfo: TbUserInfo = new TbUserInfo()
  userOtherInfo: UserOtherInfo = new UserOtherInfo()
}

/**
 * 带分页查询的和info数据的类型
 */
class BaseInfoListResult<T, K> extends BaseListResult<T> {
  info!: K
}

export { BaseResult as default, BaseDataResult as BaseDataResult, BaseListResult as BaseListResult, BaseUserResult as BaseUserResult, BaseInfoListResult as BaseInfoListResult }
