<script setup lang="ts">
import { useRouter } from 'vue-router'
import store from '../../store/index'
import { reactive, ref } from 'vue'
import { FormRules, FormInstance } from 'element-plus'
import TbUser from '../../ts/entity/UserInfo'
import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'
import { BaseUserResult } from '../../ts/entity/ServerResultInfo'
const router = useRouter()
const { updateLoginUser } = store()
const title = '用户登录'
const viewdata = reactive({
  user: new TbUser(),
  waiting: false,
})
const rules = reactive<FormRules<TbUser>>({
  username: [
    { required: true, message: '用户名必须填写' },
    { min: 4, max: 16, message: '长度必须时4-16个字符' },
  ],
  password: [{ required: true, message: '密码必须填写' }],
})

const myform = ref<FormInstance>()

function login() {
  viewdata.waiting = true
  // 获取表单校验结果
  myform.value?.validate((valid) => {
    if (!valid) {
      viewdata.waiting = false
      return
    }
    viewdata.user.password = Tools.md5(viewdata.user.password || '')
    // 登录
    ApiService.post('/user/auth/login', viewdata.user, (data: BaseUserResult) => {
      viewdata.user.password = ''
      // 成功就更新本地存储用户信息
      if (data.success) {
        updateLoginUser(() => {
          router.push('/manage/user/main')
        })
        return
      }
      viewdata.waiting = false
    })
  })
}
</script>

<template>
  <div class="main">
    <div>
      <!-- {{ viewdata.user }} -->
      <ElCard>
        <template #header>
          {{ title }}
        </template>
        <div v-loading="viewdata.waiting">
          <ElForm ref="myform" :model="viewdata.user" :rules="rules">
            <ElFormItem prop="username">
              <ElInput v-model="viewdata.user.username" placeholder="登录名"></ElInput>
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput v-model="viewdata.user.password" type="password" placeholder="登录密码"></ElInput>
            </ElFormItem>
          </ElForm>
          <div class="buttons">
            <ElButton type="danger">重置</ElButton>
            <ElButton type="primary" @click="login">登录</ElButton>
          </div>
        </div>
      </ElCard>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
