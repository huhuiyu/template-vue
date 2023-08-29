<script setup lang="ts">
import { PropType } from 'vue'
import TbFile from '../ts/entity/TbFile'
import ApiService from '../ts/ApiService'

defineProps({
  info: {
    type: Object as PropType<TbFile>,
    required: true,
  },
})
</script>

<template>
  <div class="main">
    <div v-if="info.contentType?.toString().startsWith('image/')">
      <img :src="ApiService.getDownloadUrl(info.fid)" alt="" />
    </div>
    <div v-if="info.contentType?.toString().startsWith('video/')">
      <video :src="ApiService.getDownloadUrl(info.fid)" controls></video>
    </div>
    <div v-if="info.contentType?.toString().startsWith('audio/')">
      <audio :src="ApiService.getDownloadUrl(info.fid)" controls></audio>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  margin: 0px auto;
  display: flex;
  max-width: 30vw;
  justify-content: center;
  img,
  video {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
