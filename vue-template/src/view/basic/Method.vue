<script setup lang="ts">
import { reactive, onMounted, ref } from 'vue'
let divcolor: HTMLElement | null
const title = '事件处理和样式'
const color = reactive({
  red: 0,
  green: 0,
  blue: 0,
})
const mode = ref(1)

onMounted(() => {
  divcolor = document.getElementById('divcolor')
})

function changeColor() {
  if (divcolor) {
    divcolor.style.color = `rgb(${color.red},${color.green},${color.blue})`
  }
}
</script>

<template>
  <div>
    {{ title }}
  </div>
  <div>
    <span>
      红色:
      <select v-model="color.red" @change="changeColor">
        <option v-for="index in 256" :value="index - 1">{{ index - 1 }}</option>
      </select>
    </span>
    <span>
      绿色:
      <select v-model="color.green" @change="changeColor">
        <option v-for="index in 256" :value="index - 1">{{ index - 1 }}</option>
      </select>
    </span>
    <span>
      蓝色:
      <select v-model="color.blue" @change="changeColor">
        <option v-for="index in 256" :value="index - 1">{{ index - 1 }}</option>
      </select>
    </span>

    {{ color }}
  </div>
  <div id="divcolor">演示颜色变化</div>
  <hr />

  <div class="mystyle" :class="{ night: mode == 1, day: mode == 2, colorful: mode == 3 }">
    <span @click="mode = 1">黑暗骑士</span>
    <span @click="mode = 2">超人</span>
    <span @click="mode = 3">蜘蛛侠</span>
  </div>
  {{ mode }}
</template>
<style>
.night span {
  border-color: #000;
  background-color: #222;
  color: #fff;
}
.day span {
  border-color: #fff;
  background-color: #ddd;
  color: #000;
}
.colorful span {
  border-color: #921025;
  background-color: #d6314c;
  color: #ff0;
}

.mystyle span {
  display: inline-block;
  border-radius: 2rem;
  border: 1px solid;
  margin: 0.2rem 1rem;
  padding: 0.5rem 1rem;
}
</style>
