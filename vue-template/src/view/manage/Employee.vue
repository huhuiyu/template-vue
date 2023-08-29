<script setup lang="ts">
import { ElRow, ElDialog, ElSelect, ElOption, ElInput, ElMessageBox, ElLoading } from 'element-plus'
import { reactive } from 'vue'
import BaseResult, { BaseListResult, PageInfo } from '../../ts/entity/ServerResultInfo'
import { Dept, Employee } from '../../ts/entity/Dept'
import DeptComp from '../../components/DeptComp.vue'

import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'

const title = '员工管理'

const viewdata = reactive({
  dvisible: false,
  queryInfo: {
    deptId: -1,
    employeeName: '',
    orderBy: 1,
    phone: '',
  },
  page: new PageInfo(),
  list: new Array<Employee>(),
  qdept: new Dept(),
  deptMode: 1,

  querying: false,

  modifyInfo: new Employee(),
  mvisible: false,
  modifying: false,
  mdept: new Dept(),

  avisible: false,
  addInfo: new Employee(),
  adding: false,
  adept: new Dept(),
})
viewdata.qdept.deptName = '请选择部门'
viewdata.adept.deptName = '请选择部门'

function showSelectQDept() {
  viewdata.deptMode = 1
  viewdata.dvisible = true
}

function deptSelected(info: Dept) {
  if (viewdata.deptMode == 1) {
    viewdata.queryInfo.deptId = info.deptId ? info.deptId : -1
    viewdata.qdept = info
  } else if (viewdata.deptMode == 2) {
    viewdata.addInfo.deptId = info.deptId ? info.deptId : -1
    viewdata.adept = info
  } else if (viewdata.deptMode == 3) {
    viewdata.modifyInfo.deptId = info.deptId ? info.deptId : -1
    viewdata.modifyInfo.dept = info
  }
  viewdata.dvisible = false
}

function query() {
  ApiService.post('/manage/employee/queryAll', Tools.concatJson(viewdata.queryInfo, viewdata.page), (data: BaseListResult<Employee>) => {
    if (data.success) {
      viewdata.list = data.list
      viewdata.page = data.page
    }
  })
}

function reset() {
  viewdata.qdept.deptName = '请选择部门'
  viewdata.queryInfo = {
    deptId: -1,
    employeeName: '',
    orderBy: 1,
    phone: '',
  }
  query()
}

function showAdd() {
  viewdata.adept.deptName = '请选择部门'
  viewdata.addInfo = new Employee()
  viewdata.deptMode = 2
  viewdata.avisible = true
}

function add() {
  viewdata.adding = true
  ApiService.post('/manage/employee/add', viewdata.addInfo, (data: BaseResult) => {
    viewdata.adding = false
    if (data.success) {
      viewdata.addInfo = new Employee()
      ElMessageBox.alert(data.message, '员工添加')
    }
  })
}

function showModify(info: Employee) {
  viewdata.deptMode = 3
  viewdata.modifyInfo = info
  viewdata.mvisible = true
}

function modify() {
  viewdata.modifying = true
  ApiService.post('/manage/employee/update', viewdata.modifyInfo, (data: BaseResult) => {
    viewdata.modifying = false
    if (data.success) {
      ElMessageBox.alert(data.message, '员工修改')
    }
  })
}

function del(info: Employee) {
  ElMessageBox.confirm(`是否删除${info.dept?.deptName}的员工：${info.employeeName}？`, '删除确认', { type: 'warning' })
    .then(() => {
      const loading = ElLoading.service({ lock: true, text: '员工删除中，请稍候。。。' })
      ApiService.post(
        '/manage/employee/delete',
        info,
        (data: BaseResult) => {
          loading.close()
          ElMessageBox.alert(data.message, '删除结果')
          if (data.success) {
            query()
          }
        },
        true,
      )
    })
    .catch(() => {})
}

query()
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <ElRow justify="end" class="pd10">
      <ElForm :inline="true">
        <ElFormItem>
          <ElInput v-model="viewdata.queryInfo.employeeName" placeholder="员工姓名模糊查询"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElInput v-model="viewdata.queryInfo.phone" placeholder="员工电话模糊查询"></ElInput>
        </ElFormItem>

        <ElFormItem>
          <ElSelect v-model="viewdata.queryInfo.orderBy">
            <ElOption :value="1" label="按照编号升序"></ElOption>
            <ElOption :value="2" label="按照编号降序"></ElOption>
            <ElOption :value="3" label="按照部门名称升序"></ElOption>
            <ElOption :value="4" label="按照部门名称降序"></ElOption>
            <ElOption :value="5" label="分部门按照姓名排序"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="success" @click="showSelectQDept">{{ viewdata.qdept.deptName }}</ElButton>
          <ElButton type="primary" @click="query">查询</ElButton>
          <ElButton type="danger" @click="reset">重置</ElButton>
          <ElButton type="info" @click="showAdd">添加</ElButton>
        </ElFormItem>
      </ElForm>
    </ElRow>
  </div>

  <div>
    <ElTable :data="viewdata.list">
      <ElTableColumn prop="employeeName" label="员工姓名"></ElTableColumn>
      <ElTableColumn prop="phone" label="手机号码"></ElTableColumn>
      <ElTableColumn label="所属部门">
        <template #default="scope">
          {{ scope.row.dept.deptName }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="信息最后修改时间">
        <template #default="scope">
          {{ Tools.formatDate(scope.row.lastupdate) }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作">
        <template #default="scope">
          <ElButton @click="showModify(scope.row)" type="primary">修改</ElButton>
          <ElButton @click="del(scope.row)" type="danger">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <div>
      <PageComp :page="viewdata.page" @number-change="query"></PageComp>
    </div>
  </div>

  <div>
    <ElDialog v-model="viewdata.avisible" title="添加员工信息" :close-on-click-modal="false" @closed="query" width="30%">
      <div>
        <ElForm>
          <ElFormItem>
            <ElButton @click="viewdata.dvisible = true">{{ viewdata.adept.deptName }}</ElButton>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="员工姓名" v-model="viewdata.addInfo.employeeName"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="电话" v-model="viewdata.addInfo.phone"></ElInput>
          </ElFormItem>
        </ElForm>
      </div>
      <template #footer>
        <ElButton type="danger" @click="viewdata.avisible = false">关闭</ElButton>
        <ElButton type="success" @click="add">添加</ElButton>
      </template>
    </ElDialog>
  </div>

  <div>
    <ElDialog v-model="viewdata.mvisible" title="修改员工信息" :close-on-click-modal="false" @closed="query">
      <div>
        <ElForm>
          <ElFormItem>
            <ElButton @click="viewdata.dvisible = true">{{ viewdata.modifyInfo.dept?.deptName }}</ElButton>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="员工姓名" v-model="viewdata.modifyInfo.employeeName"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="电话" v-model="viewdata.modifyInfo.phone"></ElInput>
          </ElFormItem>
        </ElForm>
      </div>
      <template #footer>
        <ElButton type="danger" @click="viewdata.mvisible = false">关闭</ElButton>
        <ElButton type="success" @click="modify">保存</ElButton>
      </template>
    </ElDialog>
  </div>

  <div>
    <ElDialog v-model="viewdata.dvisible" title="选择部门" :close-on-click-modal="false" width="30%">
      <div>
        <DeptComp mode="selector" @dept-selected="deptSelected"></DeptComp>
      </div>
    </ElDialog>
  </div>
</template>
