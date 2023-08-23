<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import TbUser from '../../ts/entity/UserInfo'

const title = '响应式'

const show = ref(false)
const strName = ref('')

function modifyName() {
  strName.value = new Date().toLocaleString()
}

const viewdata = reactive({
  user: { name: '', pwd: '' },
  info: '',
  usertype: new TbUser(),
  num1: '0',
  num2: '0',
})

const addnum = computed(() => {
  return parseInt(viewdata.num1) + parseInt(viewdata.num2)
})

function maddnum() {
  return parseInt(viewdata.num1) + parseInt(viewdata.num2)
}

function showViewData() {
  alert(JSON.stringify(viewdata, null, 2))
  alert(strName.value)
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <h1>数据响应</h1>
  <div>
    <label> <input type="checkbox" v-model="show" />勾选中显示 </label>
    <div v-show="show">显示控制</div>
    <hr />
    <input type="text" v-model="strName" />
    <button @click="modifyName">修改值</button>
    <div v-text="strName"></div>
    <hr />
    <input type="text" v-model="viewdata.user.name" />
    <input type="password" v-model="viewdata.user.pwd" />
    <input type="text" v-model="viewdata.info" />
    <hr />
    <input type="text" v-model="viewdata.usertype.username" />
    <input type="text" v-model="viewdata.usertype.nickname" />
    <button @click="showViewData">显示视图数据</button>
    <hr />
    {{ viewdata }}
    <br />
    <span v-text="viewdata.info"></span>
    <pre v-html="viewdata.info"></pre>

    <hr />
    <input type="number" v-model="viewdata.num1" />
    +
    <input type="number" v-model="viewdata.num2" />
    =
    {{ addnum }} | {{ maddnum() }} | {{ Math.random() }}
  </div>
</template>
