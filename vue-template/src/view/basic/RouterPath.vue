<script setup lang="ts">
import { useRoute } from 'vue-router'

let route = useRoute()

const title = '路由功能演示三'
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div> 路由信息：{{ route.params.id }} </div>
</template>
