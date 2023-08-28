<script setup lang="ts">
import { PropType } from 'vue'
import { PageInfo } from '../ts/entity/ServerResultInfo'
import { ElPagination } from 'element-plus'

const props = defineProps({
  page: {
    type: Object as PropType<PageInfo>,
    required: true,
    default: new PageInfo(),
  },
  layout: {
    type: String,
    requeired: false,
    default: 'prev,pager,next,total',
  },
  sizes: {
    type: Array<number>,
    requeired: false,
    default: [5, 10, 20],
  },
  hideOnSinglePage: {
    type: Boolean,
    requeired: false,
    default: true,
  },
})

const emits = defineEmits(['number-change', 'size-change', 'page-change'])

const changeNumber = (pageNumber: number) => {
  // pageInfo.value.pageNumber = pageNumber
  emits('number-change', pageNumber, props.page)
  emits('page-change', props.page)
}
const changeSize = (pageSize: number) => {
  emits('size-change', pageSize, props.page)
  emits('page-change', props.page)
}
</script>

<template>
  <div v-if="page.total > 0">
    <div class="flex-box-center">
      <div><slot></slot></div>
      <div class="pd10">
        <ElPagination :hide-on-single-page="hideOnSinglePage" :page-sizes="sizes" :layout="layout" :total="page.total" v-model:page-size="page.pageSize" @size-change="changeSize" @current-change="changeNumber" v-model:current-page="page.pageNumber"></ElPagination>
      </div>
      <div> <slot name="page-end"></slot></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flex-box-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
