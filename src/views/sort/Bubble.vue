<template>
  <div class="container self-start">
    <div class="flex">
      <div
        class="px-4 py-6 m-4 bg-white rounded-md shadow-md max-w-6xl mx-auto"
      >
        <div class="flex justify-between mb-6 items-baseline">
          <h3 class="text-yellow-500">冒泡排序</h3>
          <div class="ml-auto">
            <button
              class="mx-1 text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
              @click="generator"
              :disabled="sorting"
            >
              重新生成
            </button>
            <button
              class="mx-1 text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
              @click="handleShuffle"
              :disabled="sorting"
            >
              打乱
            </button>
            <button
              class="mx-1 text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
              @click="start"
              :disabled="sorting"
            >
              开始
            </button>
          </div>
        </div>
        <div class="flex">
          <transition-group name="flip-list" tag="div" class="flex items-end">
            <div
              class="w-12 mx-2 rounded text-white inline-flex items-center justify-center select-none transition duration-150"
              v-for="(item, i) in array"
              :key="item"
              :class="{
                'bg-indigo-500': sortedIndex <= i,
                'bg-gray-300': sortedIndex > i,
                'bg-red-500': activeLeft === i,
                'bg-yellow-500': activeRight === i,
                [`item-${item}`]: true
              }"
            >
              {{ item }}
            </div>
          </transition-group>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  data: () => ({
    array: [],
    activeLeft: -1,
    activeRight: -1,
    sortedIndex: -1,
    sorting: false
  }),
  mounted() {
    this.generator()
  },
  methods: {
    async generator() {
      let length = 8
      this.array = []
      this.sortedIndex = length
      await this.$nextTick()
      while (length > 0) {
        const value = parseInt(Math.random() * 12) + 1
        if (this.array.indexOf(value) < 0) {
          this.array.push(value)
          length--
        }
      }
    },
    async start() {
      let unsorted = this.array.length - 1
      let sorted = false
      this.sortedIndex = this.array.length
      this.sorting = true
      while (!sorted) {
        sorted = true
        for (let i = 0; i < unsorted; i++) {
          await this.wait()
          this.activeLeft = i
          this.activeRight = i + 1
          if (this.array[i] > this.array[i + 1]) {
            sorted = false
            const left = this.array[i]
            const right = this.array[i + 1]
            this.$set(this.array, i, right)
            this.$set(this.array, i + 1, left)
          }
        }
        this.sortedIndex = unsorted
        this.$nextTick(() => {
          unsorted = unsorted - 1
        })
        if (sorted) {
          this.activeLeft = -1
          this.activeRight = -1
          this.sortedIndex = -1
          this.sorting = false
        }
      }
    },
    async wait() {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 500)
      })
    },
    async exchange(i, j) {
      return new Promise(resolve => {
        setTimeout(() => {
          this.activeLeft = i
          this.activeRight = j
          resolve()
        }, 500)
      })
    },
    handleShuffle() {
      this.sortedIndex = this.array.length
      this.array = _.shuffle(this.array)
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
