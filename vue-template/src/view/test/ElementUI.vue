<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessageBox, ElButton, ElInput, ElDatePicker, ElSwitch } from 'element-plus'
const opend = ref(false)
const inputv = ref('')
const datev = ref(new Date())

const closeDialog = () => {
  opend.value = false
  ElMessageBox.alert('测试弹出层', 'ok')
}
</script>

<template>
  <div>
    <el-switch v-model="opend"></el-switch>
    <ElDatePicker v-model="datev"></ElDatePicker>
    <span>{{ datev }}</span>
    <ElInput v-model="inputv"></ElInput>
    <ElButton type="primary" size="default" @click="opend = true">测试饿了么ui对话框</ElButton>
    <ElDialog title="对话框测试" v-model="opend" width="30%">
      <div>{{ inputv }}你好!</div>
      <template #footer>
        <div>
          <ElButton @click="opend = false">Cancel</ElButton>
          <ElButton type="primary" @click="closeDialog">OK</ElButton>
        </div>
      </template>
    </ElDialog>
  </div>
</template>
