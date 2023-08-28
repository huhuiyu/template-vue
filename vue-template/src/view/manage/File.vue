<script setup lang="ts">
import { reactive } from 'vue'
import { storeToRefs } from 'pinia'
import store from '../../store/index'
import { useRouter } from 'vue-router'
import ApiService from '../../ts/ApiService'
import Tools, { FileInfo } from '../../ts/Tools'
import BaseResult, { BaseDataResult, BaseListResult, PageInfo } from '../../ts/entity/ServerResultInfo'
import TbFile from '../../ts/entity/TbFile'
import { ElMessageBox, ElLoading } from 'element-plus'
import PageComp from '../../components/PageComp.vue'

const router = useRouter()

const title = '文件管理'
const { loginUser } = storeToRefs(store())

const viewdata = reactive({
  page: new PageInfo(),
  list: new Array<TbFile>(),
  queryInfo: new TbFile(),
  avisible: false,
  addInfo: new TbFile(),
  selectedFile: new FileInfo(),
  uploading: false,
})

viewdata.page.pageSize = 3

function query() {
  ApiService.post('/user/file/queryAll', Tools.concatJson(viewdata.queryInfo, viewdata.page), (data: BaseListResult<TbFile>) => {
    if (data.success) {
      viewdata.list = data.list
      viewdata.page = data.page
    }
  })
}

function requery() {
  viewdata.page.pageNumber = 1
  query()
}

function browseFile() {
  viewdata.selectedFile.file = null
  Tools.openFile((files: Array<FileInfo>) => {
    viewdata.selectedFile = files[0]
  })
}

function showAdd() {
  viewdata.selectedFile.file = null
  viewdata.addInfo.fileinfo = ''
  viewdata.avisible = true
}

function add() {
  viewdata.uploading = true
  if (viewdata.selectedFile.size > Tools.MAX_FILE_SIZE) {
    viewdata.uploading = false
    ElMessageBox.alert('文件大小超过限制', '上传文件')
    return
  }
  ApiService.upload('/user/file/upload', viewdata.selectedFile.file, { fileinfo: viewdata.addInfo.fileinfo }, (data: BaseDataResult<TbFile>) => {
    viewdata.uploading = false
    if (data.success) {
      ElMessageBox.alert(data.message, '上传文件')
      viewdata.selectedFile.file = null
      viewdata.addInfo.fileinfo = ''
    }
  })
}

function del(info: TbFile) {
  ElMessageBox.confirm(`是否删除文件：${info.filename}？`, '删除确认', { type: 'warning' })
    .then(() => {
      const loading = ElLoading.service({ lock: true, text: '文件删除中，请稍候。。。' })
      ApiService.post(
        '/user/file/delete',
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
  <div v-if="loginUser.isLogin">
    <div> {{ loginUser.tbUser.username }}的{{ title }} </div>

    <div>
      <ElRow justify="end" class="pd10">
        <ElForm :inline="true">
          <ElFormItem>
            <ElInput placeholder="文件名称模糊查询" v-model="viewdata.queryInfo.filename"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput placeholder="文件描述模糊查询" v-model="viewdata.queryInfo.fileinfo"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElInput placeholder="文件类型模糊查询" v-model="viewdata.queryInfo.contentType"></ElInput>
          </ElFormItem>
          <ElFormItem>
            <ElButton @click="requery()" type="primary">查询</ElButton>
          </ElFormItem>
          <ElFormItem>
            <ElButton type="success" @click="showAdd">添加</ElButton>
          </ElFormItem>
        </ElForm>
      </ElRow>
    </div>

    <div>
      <ElTable :data="viewdata.list">
        <ElTableColumn prop="filename" label="文件名称"></ElTableColumn>
        <ElTableColumn prop="fileinfo" label="文件描述"></ElTableColumn>
        <ElTableColumn prop="contentType" label="文件类型"></ElTableColumn>
        <ElTableColumn label="文件大小">
          <template #default="scope">
            {{ Tools.formatFileSize(scope.row.fileSize) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="信息最后修改时间">
          <template #default="scope">
            {{ Tools.formatDate(scope.row.lastupdate) }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="信息最后修改时间">
          <template #default="scope">
            <ElButton @click="del(scope.row)" type="danger">删除</ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <div>
        <PageComp :page="viewdata.page" @number-change="query">
          <template #default>文件分页信息：</template>
          <template #page-end>总页数：{{ viewdata.page.pageCount }}</template>
        </PageComp>
        <PageComp :hide-on-single-page="false" :page="viewdata.page" :sizes="[3, 5, 10, 20]" :layout="'sizes, jumper, prev, pager, next, total'" @number-change="query" @size-change="requery"></PageComp>
      </div>
    </div>

    <div>
      <ElDialog v-model="viewdata.avisible" title="文件上传" :close-on-click-modal="false" @closed="query" width="30%">
        <div>
          <ElForm v-loading="viewdata.uploading">
            <ElFormItem>
              <ElInput placeholder="文件描述信息" v-model="viewdata.addInfo.fileinfo"></ElInput>
            </ElFormItem>
            <ElFormItem>
              <ElButton @click="browseFile">浏览...</ElButton>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <ElTag v-if="viewdata.selectedFile.file"> {{ viewdata.selectedFile.name }} | {{ Tools.formatFileSize(viewdata.selectedFile.size) }}</ElTag>
            </ElFormItem>
          </ElForm>
        </div>
        <template #footer>
          <ElButton v-loading="viewdata.uploading" type="danger" @click="viewdata.avisible = false">关闭</ElButton>
          <ElButton v-loading="viewdata.uploading" :disabled="!viewdata.selectedFile.file" type="success" @click="add">上传</ElButton>
        </template>
      </ElDialog>
    </div>
  </div>
  <div v-else>
    <a href="javascript:void(0)" @click="router.push('/manage/login')">请先登录...</a>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 5rem;
  width: 5rem;
  height: auto;
  display: block;
}
</style>
