import { defineStore } from 'pinia'

const store = defineStore('main', {
  state: () => {
    return {
      count: 0,
    }
  },
  actions: {
    increment() {
      this.count++
    },
  },
})

export default store
