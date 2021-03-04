<template>
  <div class="container self-start">
    <div class="flex">
      <div
        class="m-4 bg-white rounded-md shadow-md mx-auto w-full max-w-2xl overflow-hidden"
      >
        <div class="px-4 py-6">
          <div class="flex justify-between mb-6 items-baseline">
            <h3 class="text-yellow-500">冒泡排序</h3>
            <buttons
              @sort="sort"
              @shuffle="shuffle"
              @start="start"
              @generator="generator"
              :sorting="sorting"
            ></buttons>
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
        <div
          class="h-12 mt-2 p-2 w-full bg-gray-100 flex justify-between items-center"
        >
          <div class="inline-flex items-center">
            复杂度：<span class="text-yellow-500 text-lg font-medium">{{
              this.showSteps
            }}</span>
          </div>
          <div class="ml-auto text-white text-xs grid grid-cols-4 items-center">
            <div
              class="h-6 px-1 bg-gray-300 inline-flex items-center justify-center"
            >
              待排序
            </div>
            <div
              class="h-6 px-1 bg-yellow-500 inline-flex items-center justify-center"
            >
              正在对比
            </div>
            <div
              class="h-6 px-1 bg-red-500 inline-flex items-center text-center justify-center"
            >
              正在对比
            </div>
            <div
              class="h-6 px-1 bg-indigo-500 inline-flex items-center text-center justify-center"
            >
              已排序
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { wait } from '@/utils'
import Sort from '@/mixins/Sort'
export default {
  mixins: [Sort],
  data: () => ({
    activeLeft: -1,
    activeRight: -1,
    sortedIndex: -1
  }),
  methods: {
    init() {
      this.sortedIndex = this.array.length
      this.totalSteps = 0
    },
    async start() {
      let unsorted = this.array.length - 1
      let sorted = false
      this.init()
      this.sorting = true
      while (!sorted) {
        sorted = true
        let currentSteps = 0
        for (let i = 0; i < unsorted; i++) {
          await wait(this.timeout)
          this.activeLeft = i
          this.activeRight = i + 1
          currentSteps++
          if (this.array[i] > this.array[i + 1]) {
            sorted = false
            // const left = this.array[i]
            // const right = this.array[i + 1]
            currentSteps++
            await this.swap(i, i + 1)
          }
        }
        this.sortedIndex = unsorted
        this.$nextTick(() => {
          unsorted = unsorted - 1
        })
        this.totalSteps += currentSteps
        if (sorted) {
          this.activeLeft = -1
          this.activeRight = -1
          this.sortedIndex = -1
          this.sorting = false
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
