<script setup lang="ts">
import { ElTag, ElRow, ElCol } from 'element-plus'
import { reactive } from 'vue'
import { BaseListResult, PageInfo } from '../../ts/entity/ServerResultInfo'
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
  delInfo: new Dept(),
  querying: false,
})

viewdata.page.pageSize = 5

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
}

function del(info: Dept) {
  viewdata.delInfo = info
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
    </div>
  </div>
</template>
