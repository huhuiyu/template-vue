<script setup lang="ts">
import { reactive } from 'vue'
import Tools, { FileInfo } from '../../ts/Tools'
const title = 'tools测试'
let data = reactive({
  fileinfo: new FileInfo(),
  json: {},
})

function testJson() {
  let json = Tools.concatJson({ name: '张三' }, { id: 100 })
  data.json = JSON.stringify(json, null, 2)
}

function openFile() {
  Tools.openFile((files: FileInfo[]) => {
    console.log('文件信息：', files)
    data.fileinfo = files[0]

    console.log('文件信息：', data.fileinfo, files)
  })
}
</script>

<template>
  <div>
    {{ title }}
    <hr />
    <button @click="testJson">合并json</button>
    {{ data.json }}
    |
    <button @click="openFile">浏览文件</button>
    {{ data.fileinfo.name }}
    -
    {{ Tools.formatFileSize(data.fileinfo.size) }}
  </div>
  <div>
    {{ Tools.formatDate(new Date()) }}
    <hr />
    {{ Tools.md5('abc') }}
  </div>
</template>
