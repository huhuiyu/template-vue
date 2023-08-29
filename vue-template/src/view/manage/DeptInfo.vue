<script setup lang="ts">
import DeptComp from '../../components/DeptComp.vue'
const title = '部门管理组件版本'
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <DeptComp mode="manage"></DeptComp>
  </div>
</template>
