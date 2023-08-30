<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { PageInfo } from '../../ts/entity/ServerResultInfo'

import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'
import PageComp from '../../components/PageComp.vue'

import { useRoute } from 'vue-router'
import { vi } from 'element-plus/lib/locale/index.js'
const title = '留言详情'
const route = useRoute()

// 视图数据
const viewdata = reactive({
  page: new PageInfo(),
  list: [],
  detail: {},
  queryInfo: {
    umid: route.params.umid,
    orderBy: '1',
  },
})

onMounted(() => {
  query()
})

function query() {
  ApiService.post('/message/queryDetail', Tools.concatJson(viewdata.queryInfo, viewdata.page), (data: any) => {
    if (data.success) {
      viewdata.page = data.page
      viewdata.list = data.list
      viewdata.detail = data.info
    }
  })
}
</script>

<template>
  <div> {{ title }} - {{ route.params.umid }} </div>
  <div>
    <div>
      {{ viewdata.detail.user?.username }}: {{ viewdata.detail.title }}({{ Tools.formatDate(viewdata.detail.lastupdate) }})
      <hr />
      {{ viewdata.detail.info }}
    </div>

    <hr />
    <div>
      <div v-for="d in viewdata.list"> {{ d.user.username }} : {{ d.info }} ({{ Tools.formatDate(d.lastupdate) }}) </div>
    </div>

    <PageComp :page="viewdata.page" @number-change="query"></PageComp>
  </div>
</template>
