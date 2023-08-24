<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const title = '页面不存在'
</script>

<template>
  <div>
    {{ title }}
  </div>
  <a href="javascript:void(0)" @click="router.push('/')">返回首页</a>
</template>
