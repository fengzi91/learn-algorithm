<template>
  <div class="container self-start">
    <div class="flex">
      <card
        title="冒泡排序"
        @sort="sort"
        @shuffle="shuffle"
        @start="start"
        @generator="generator"
        :sorting="sorting"
        :badges="badges"
        :steps="showSteps"
      >
        <div class="flex justify-center">
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
      </card>
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
    sortedIndex: -1,
    badges: [
      {
        text: '待排序',
        color: 'bg-gray-300'
      },
      {
        text: '正在对比',
        color: 'bg-yellow-500'
      },
      {
        text: '正在对比',
        color: 'bg-red-500'
      },
      {
        text: '已排序',
        color: 'bg-indigo-500'
      }
    ]
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
