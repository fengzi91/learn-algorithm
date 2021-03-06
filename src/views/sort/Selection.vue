<template>
  <div class="container self-start">
    <div class="flex">
      <card
        title="选择排序"
        @sort="sort"
        @shuffle="shuffle"
        @start="start"
        @generator="generator"
        :sorting="sorting"
        :steps="showSteps"
        :badges="badges"
      >
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
                  ? 'bg-gradient-to-br from-red-500 via-pink-400 to-green-300'
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
    activeIndex: -1,
    compareIndex: -1,
    minIndex: -1,
    sortedIndex: -1,
    badges: [
      {
        text: '最小值',
        color: 'bg-green-500'
      },
      {
        text: '选中元素',
        color: 'bg-red-500'
      },
      {
        text: '正在对比',
        color: 'bg-yellow-500'
      },
      {
        text: '选中且最小',
        color: 'bg-gradient-to-br from-red-500 via-pink-400 to-green-300'
      }
    ]
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
