<template>
  <div class="container self-start">
    <div class="flex">
      <div
        class="m-4 bg-white rounded-md shadow-md mx-auto w-full max-w-2xl overflow-hidden"
      >
        <div class="px-4 py-6">
          <div class="flex justify-between mb-6 items-baseline">
            <h3 class="text-yellow-500">选择排序</h3>
            <buttons
              @sort="sort"
              @shuffle="shuffle"
              @start="start"
              @generator="generator"
              :sorting="sorting"
            ></buttons>
          </div>
          <div class="flex flex-wrap justify-center">
            <transition-group
              name="flip-list"
              tag="div"
              v-if="show"
              class="flex items-end"
            >
              <div
                class="w-12 h-12 mx-2 rounded text-white inline-flex items-end justify-center select-none transition duration-200"
                v-for="(item, i) in array"
                :key="`item-${item}`"
                :class="[
                  activeIndex === i && minIndex === i
                    ? 'bg-gradient-to-b to-red-500 from-green-300'
                    : activeIndex === i
                    ? 'bg-red-500'
                    : compareIndex === i
                    ? 'bg-yellow-500'
                    : minIndex === i
                    ? 'bg-green-500'
                    : sortedIndex >= i
                    ? 'bg-indigo-500'
                    : 'bg-gray-300',
                  `item-${item}`
                ]"
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
              class="h-6 px-1 bg-green-500 inline-flex items-center justify-center"
            >
              最小值
            </div>
            <div
              class="h-6 px-1 bg-red-500 inline-flex items-center text-center justify-center"
            >
              选中元素
            </div>
            <div
              class="h-6 px-1 bg-yellow-500 inline-flex items-center text-center justify-center"
            >
              正在对比
            </div>
            <div
              class="h-6 px-1 inline-flex items-center justify-center bg-gradient-to-br from-red-500 via-pink-400 to-green-300"
            >
              选中且最小
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
    activeIndex: -1,
    compareIndex: -1,
    minIndex: -1,
    sortedIndex: -1
  }),
  methods: {
    init() {
      this.sortedIndex = -1
    },
    async start() {
      this.init()
      this.totalSteps = 0
      this.sorting = true
      let min = null
      for (let i = 0; i < this.array.length; i++) {
        this.activeIndex = i
        min = this.array[i]
        this.minIndex = i
        let currentSteps = 0
        for (let j = i; j < this.array.length; j++) {
          this.compareIndex = j
          if (min > this.array[j]) {
            min = this.array[j]
            this.minIndex = j
          }
          await wait(this.timeout)
          currentSteps++
        }
        if (this.minIndex !== this.activeIndex) {
          currentSteps++
          const currentValue = this.array[i]
          this.$set(this.array, this.minIndex, currentValue)
          this.$set(this.array, i, min)
          this.$nextTick().then(async () => {
            await wait(this.timeout)
            this.totalSteps += currentSteps
          })
        } else {
          this.totalSteps += currentSteps
        }
        this.sortedIndex = i
      }
      this.activeIndex = -1
      this.compareIndex = -1
      this.minIndex = -1
      this.sorting = false
    }
  }
}
</script>
