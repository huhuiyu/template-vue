<script setup lang="ts">
import CompProp from '../../ts/entity/CompProp'
import MyComp from '../../components/MyComp.vue'
import { Dept, Employee } from '../../ts/entity/Dept'

import { reactive, ref } from 'vue'

const title = '组件知识点'

const mycomp = ref()

const viewdata = reactive({
  prop: new CompProp(),
  title: '自定义组件',
  deptInfo: new Dept(),
  empInfo: new Employee(),
  visible: true,
})

const changeDept = (info: Dept) => {
  viewdata.deptInfo = info
}

const changeEmp = (info: Employee) => {
  viewdata.empInfo = info
}

const touchComp = () => {
  mycomp.value.touch()
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <button @click="touchComp">触发子组件方法</button>
    <label> <input type="checkbox" v-model="viewdata.visible" />是否显示组件 </label>
    模式：
    <select v-model="viewdata.prop.mode">
      <option value="dept">部门信息模式</option>
      <option value="emp">员工信息信息模式</option>
      <option value="other">其它模式</option>
    </select>
    风格：
    <select v-model="viewdata.prop.style">
      <option value="day">白天</option>
      <option value="night">晚上</option>
    </select>
    <input type="text" v-model="viewdata.title" />
  </div>
  <hr />
  <div v-if="viewdata.visible">
    <MyComp :prop="viewdata.prop" :title="viewdata.title" @dept-info="changeDept" @employee-info="changeEmp" ref="mycomp">
      <div>组件自定义区域</div>
      <template #end> 组件命名自定义区域 </template>
    </MyComp>
    <hr />
    <div>
      {{ viewdata.deptInfo }}
      <br /><br />
      {{ viewdata.empInfo }}
    </div>
  </div>
</template>
