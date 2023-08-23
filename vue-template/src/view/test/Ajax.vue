<script setup lang="ts">
import { reactive } from 'vue'
import BaseResult, { BaseUserResult, BaseListResult, PageInfo } from '../../ts/entity/ServerResultInfo'
import TbUser from '../../ts/entity/UserInfo'
import { Dept, Employee } from '../../ts/entity/Dept'
import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'

const title = 'ajax测试'

const viewdata = reactive({
  echo: '',
  echoResult: new BaseResult(),
  user: new TbUser(),
  userResult: new BaseUserResult(),
  dlist: new Array<Dept>(),
  elist: new Array<Employee>(),
  dpage: new PageInfo(),
  epage: new PageInfo(),
  userInfo: new BaseUserResult(),
  data: {},
})

function sendEcho() {
  ApiService.get('/', { echo: viewdata.echo }, (data: BaseResult) => {
    viewdata.echoResult = data
  })
}

function login() {
  viewdata.user.password = Tools.md5(viewdata.user.password)
  ApiService.post('/user/auth/login', viewdata.user, (data: BaseUserResult) => {
    viewdata.userResult = data
  })
}

function logout() {
  ApiService.post(
    '/user/auth/logout',
    {},
    (data: BaseResult) => {
      alert(data.message)
    },
    true,
  )
}

function queryUser() {
  ApiService.post(
    '/user/auth/getUserInfo',
    {},
    (data: BaseUserResult) => {
      viewdata.userInfo = data
    },
    true,
  )
}

function queryDept() {
  ApiService.post('/manage/dept/queryAll', viewdata.dpage, (data: BaseListResult<Dept>) => {
    if (data.success) {
      viewdata.dlist = data.list
      viewdata.dpage = data.page
    }
  })
}

function queryEmp(dept: Dept) {
  ApiService.post('/manage/employee/queryAll', Tools.concatJson(dept, viewdata.epage, { orderBy: 1 }), (data: BaseListResult<Employee>) => {
    if (data.success) {
      viewdata.elist = data.list
      viewdata.epage = data.page
    }
  })
}

function queryProvice() {
  ApiService.post('/linkinfo/queryAllProvince', {}, (data: any) => {
    viewdata.data = data
  })
}

queryDept()

queryUser()

queryProvice()
</script>

<template>
  <div>
    {{ title }}
  </div>
  <hr />
  <div>
    <input type="text" v-model="viewdata.echo" />
    <button @click="sendEcho">echo请求</button>
    <hr />
    {{ viewdata.echoResult }}
  </div>
  <hr />
  <div>
    <input type="text" v-model="viewdata.user.username" />
    <input type="password" v-model="viewdata.user.password" />
    <button @click="login">登录</button>
    |
    <button @click="logout">安全退出</button>
    <hr />
    <div v-if="viewdata.userResult.success">
      {{ viewdata.userResult.tbUser.username }}
      -
      {{ viewdata.userResult.tbUser.nickname }}
    </div>
    <hr />
    <div>
      {{ viewdata.userInfo }}
    </div>
    <hr />

    <div>
      {{ viewdata.dpage }}
      <hr />
      <div v-for="d in viewdata.dlist">
        <span>{{ d.deptName }}({{ d.deptInfo }})</span>
        <button @click="queryEmp(d)">查询</button>
      </div>
      <hr />
      {{ viewdata.epage }}
      <hr />
      <div v-for="d in viewdata.elist">
        <span>{{ d.employeeName }}({{ d.phone }})</span>
      </div>
    </div>

    <div>
      {{ viewdata.data }}
    </div>
  </div>
</template>
