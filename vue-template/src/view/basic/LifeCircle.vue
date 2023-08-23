<script setup lang="ts">
import { ref, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const title = '生命周期演示'
const info = ref('')

onBeforeMount(() => {
  console.log('onBeforeMount...')
})

onMounted(() => {
  console.log('onMounted...')
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate...')
})

onUpdated(() => {
  console.log('onUpdated...')
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount...')
})

onUnmounted(() => {
  console.log('onUnmounted...')
})
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div> <input type="text" v-model="info" />{{ info }} </div>
  <RouterLink to="/basic/router">跳转</RouterLink>
</template>
