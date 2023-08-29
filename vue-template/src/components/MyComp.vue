<script setup lang="ts">
import { PropType, reactive, onMounted, onUnmounted } from 'vue'
import CompProp from '../ts/entity/CompProp'
import { Dept, Employee } from '../ts/entity/Dept'
import Tools from '../ts/Tools'

onMounted(() => {
  console.log('自定义组件挂载完毕')
})

onUnmounted(() => {
  console.log('反挂载自定义组件完毕')
})

const props = defineProps({
  prop: {
    type: Object as PropType<CompProp>,
    requird: true,
    default: new CompProp(),
  },
  title: {
    type: String,
    required: false,
    default: '自定义组件',
  },
})

const compdata = reactive({
  dept: new Dept(),
  emp: new Employee(),
})

const emits = defineEmits(['dept-info', 'employee-info'])

const touch = () => {
  alert('touch子组件')
}

defineExpose({ touch })

const getDeptInfo = () => {
  emits('dept-info', Tools.concatJson(compdata.dept), props)
}

const getEmpInfo = () => {
  emits('employee-info', Tools.concatJson(compdata.emp), props)
}
</script>

<template>
  <div class="main" :class="{ day: prop.style == 'day', night: prop.style == 'night' }">
    <div>
      {{ title }}
    </div>
    <div>
      <slot></slot>
    </div>
    <hr />
    <div v-if="prop.mode == 'dept'">
      <input type="text" v-model="compdata.dept.deptName" placeholder="部门名称" />
      <input type="text" v-model="compdata.dept.deptInfo" placeholder="部门描述" />
      <button @click="getDeptInfo">确定</button>
    </div>
    <div v-else-if="prop.mode == 'emp'">
      <input type="text" v-model="compdata.emp.employeeName" placeholder="员工姓名" />
      <input type="text" v-model="compdata.emp.phone" placeholder="员工电话" />
      <button @click="getEmpInfo">确定</button>
    </div>
    <div v-else> 模式只能为dept或者emp </div>
    <hr />
    <div>
      <slot name="end"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.day {
  color: #000;
  background-color: #fff;
  input,
  button {
    color: #000;
    background-color: #fff;
  }
}
.night {
  color: #fff;
  background-color: #000;
  input,
  button {
    color: #fff;
    background-color: #000;
  }
}

.main {
  min-height: 40vh;
}
</style>
