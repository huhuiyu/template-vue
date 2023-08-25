<script setup lang="ts">
import { ElTag, ElRow, ElCol, ElMessageBox, ElLoading } from 'element-plus'
import { reactive } from 'vue'
import BaseResult, { BaseListResult, PageInfo } from '../../ts/entity/ServerResultInfo'
import { Dept } from '../../ts/entity/Dept'
const title = '部门管理'
import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'

// 视图数据
const viewdata = reactive({
  page: new PageInfo(),
  list: new Array<Dept>(),
  queryInfo: {
    deptName: '',
  },
  modifyInfo: new Dept(),
  mvisible: false,
  modifying: false,
  querying: false,
  avisible: false,
  addInfo: new Dept(),
  adding: false,
})

// 查询部门信息
function query() {
  viewdata.querying = true
  ApiService.post('/manage/dept/queryAll', Tools.concatJson(viewdata.queryInfo, viewdata.page), (data: BaseListResult<Dept>) => {
    viewdata.querying = false
    if (data.success) {
      viewdata.page = data.page
      viewdata.list = data.list
    }
  })
}

function requery() {
  viewdata.page.pageNumber = 1
  query()
}

function showModify(info: Dept) {
  viewdata.modifyInfo = info
  viewdata.mvisible = true
}

function modify() {
  viewdata.modifying = true
  ApiService.post('/manage/dept/update', viewdata.modifyInfo, (data: BaseResult) => {
    viewdata.modifying = false
    if (data.success) {
      viewdata.addInfo = new Dept()
      ElMessageBox.alert(data.message, '部门修改')
    }
  })
}

function del(info: Dept) {
  ElMessageBox.confirm(`是否删除部门：${info.deptName}？`, '删除确认', { type: 'warning' })
    .then(() => {
      const loading = ElLoading.service({ lock: true, text: '部门删除中，请稍候。。。' })
      ApiService.post(
        '/manage/dept/delete',
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

function showAdd() {
  viewdata.addInfo = new Dept()
  viewdata.avisible = true
}

function add() {
  viewdata.adding = true
  ApiService.post('/manage/dept/add', viewdata.addInfo, (data: BaseResult) => {
    viewdata.adding = false
    if (data.success) {
      viewdata.addInfo = new Dept()
      ElMessageBox.alert(data.message, '部门添加')
    }
  })
}

query()
</script>

<template>
  <div>
    <ElRow justify="center" class="pd10">
      <ElCol :span="1">
        <ElTag type="success" size="large">{{ title }}</ElTag>
      </ElCol>
    </ElRow>
  </div>

  <div>
    <ElRow justify="end" class="pd10">
      <ElForm :inline="true">
        <ElFormItem>
          <ElInput v-loading="viewdata.querying" placeholder="部门名称模糊查询" v-model="viewdata.queryInfo.deptName"></ElInput>
        </ElFormItem>
        <ElFormItem>
          <ElButton v-loading="viewdata.querying" @click="requery()" type="primary">查询</ElButton>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="success" @click="showAdd">添加</ElButton>
        </ElFormItem>
      </ElForm>
    </ElRow>
  </div>

  <div>
    <ElTable :data="viewdata.list" v-loading="viewdata.querying">
      <ElTableColumn prop="deptName" label="部门名称"></ElTableColumn>
      <ElTableColumn prop="deptInfo" label="部门描述"></ElTableColumn>
      <ElTableColumn label="信息最后修改时间">
        <template #default="scope">
          {{ Tools.formatDate(scope.row.lastupdate) }}
        </template>
      </ElTableColumn>
      <ElTableColumn label="信息最后修改时间">
        <template #default="scope">
          <ElButton @click="showModify(scope.row)" type="primary">修改</ElButton>
          <ElButton @click="del(scope.row)" type="danger">删除</ElButton>
        </template>
      </ElTableColumn>
    </ElTable>

    <div class="pd10">
      <ElPagination :page-sizes="[5, 10, 20]" layout="prev, pager, next, sizes" :total="viewdata.page.total" v-model:page-size="viewdata.page.pageSize" @size-change="requery" @current-change="query" v-model:current-page="viewdata.page.pageNumber"></ElPagination>
      <ElPagination layout="pager" :total="viewdata.page.total" v-model:page-size="viewdata.page.pageSize" @current-change="query" v-model:current-page="viewdata.page.pageNumber"></ElPagination>
    </div>
  </div>

  <div>
    <ElDialog v-model="viewdata.avisible" title="添加部门信息" :close-on-click-modal="false" @closed="query">
      <div>
        <ElForm>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="部门名称" v-model="viewdata.addInfo.deptName"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.adding" placeholder="部门描述" v-model="viewdata.addInfo.deptInfo"></ElInput>
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
    <ElDialog v-model="viewdata.mvisible" title="修改部门信息" :close-on-click-modal="false" @closed="query">
      <div>
        <ElForm>
          <ElFormItem>
            <ElInput v-loading="viewdata.modifying" placeholder="部门名称" v-model="viewdata.modifyInfo.deptName"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput v-loading="viewdata.modifying" placeholder="部门描述" v-model="viewdata.modifyInfo.deptInfo"></ElInput>
          </ElFormItem>
        </ElForm>
      </div>
      <template #footer>
        <ElButton type="danger" @click="viewdata.mvisible = false">关闭</ElButton>
        <ElButton type="success" @click="modify">保存</ElButton>
      </template>
    </ElDialog>
  </div>
</template>
