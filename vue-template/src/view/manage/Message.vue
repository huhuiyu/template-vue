<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { PageInfo } from '../../ts/entity/ServerResultInfo'
const router = useRouter()

import ApiService from '../../ts/ApiService'
import Tools from '../../ts/Tools'
import PageComp from '../../components/PageComp.vue'

const title = '留言板'

// 视图数据
const viewdata = reactive({
  page: new PageInfo(),
  list: [],
  queryInfo: {
    info: '',
    orderBy: '1',
    username: '',
  },
})

onMounted(() => {
  query()
})

function query() {
  ApiService.post('/message/queryAll', Tools.concatJson(viewdata.queryInfo, viewdata.page), (data: any) => {
    if (data.success) {
      viewdata.page = data.page
      viewdata.list = data.list
    }
  })
}

function todetail(info) {
  router.push(`/manage/messagedetail/${info.umid}`)
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <!-- {{ viewdata.list }} -->
    <div v-for="d in viewdata.list">
      <a href="javascript:void(0)" @click="todetail(d)">{{ d.title }}</a>
      -{{ d.user.username }}({{ Tools.formatDate(d.lastupdate) }})
    </div>
    <PageComp :page="viewdata.page" @number-change="query"></PageComp>
  </div>
</template>
<style lang="scss" scoped>
a {
  display: inline-block;
  margin: 0.2rem 1rem;
}
</style>
