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
const menu = ref(1)

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

  <div class="mystyle" :class="{ 'night-style': mode == 1, 'day-style': mode == 2, colorful: mode == 3 }">
    <span @click="mode = 1">黑暗骑士</span>
    <span @click="mode = 2">超人</span>
    <span @click="mode = 3">蜘蛛侠</span>
  </div>
  {{ mode }}
  <hr />

  <div class="menus tc">
    <span :class="{ active: menu == 1 }" @click="menu = 1">面版一</span>
    <span :class="{ active: menu == 2 }" @click="menu = 2">面版二</span>
    <span :class="{ active: menu == 3 }" @click="menu = 3">面版三</span>
  </div>
  <div class="infos tc">
    <div>
      <Transition name="one">
        <div v-if="menu == 1">内容一</div>
      </Transition>
      <Transition name="one">
        <div v-if="menu == 2">内容二</div>
      </Transition>
      <Transition name="one">
        <div v-if="menu == 3">内容三</div>
      </Transition>
    </div>
  </div>
  <div>
    {{ menu }}
  </div>
</template>
<style lang="scss" scoped>
@import '../../style/var.scss';
.night-style {
  span {
    background-color: #222;
    color: #fff;
  }
}
.day-style {
  span {
    background-color: #ddd;
    color: #000;
  }
}
.colorful {
  span {
    background-color: #d6314c;
    color: #ff0;
  }
}

.mystyle {
  span {
    display: inline-block;
    border-radius: 2rem;
    margin: 0.2rem 1rem;
    padding: 0.5rem 1rem;
  }
}

.menus {
  padding: 1rem;
  > span {
    display: inline-block;
    margin: 0px 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid $primary-text-color;
    border-radius: 0.5rem;
    cursor: pointer;
    &:hover {
      color: $primary-text-color;
    }
  }
  .active {
    color: $primary-text-color;
  }
}

.infos {
  position: relative;
  height: 10vh;
  overflow: hidden;
  > div > div {
    height: calc(100% - 1rem);
    box-sizing: border-box;
    border: 1px solid $primary-text-color;
    position: absolute;
    width: calc(100% - 1rem);
    margin: 0.5rem;
  }
}

.one-leave-active,
.one-leave-to {
  animation: moveout 1s ease-in-out;
}

.one-enter-active,
.one-enter-from {
  animation: movein 1s ease-in-out;
}

@keyframes movein {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
@keyframes moveout {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
