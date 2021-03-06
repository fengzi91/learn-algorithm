<template>
  <div class="container self-start">
    <div class="flex">
      <card
        @sort="sort"
        @shuffle="shuffle"
        @start="start"
        @generator="generator"
        :sorting="sorting"
        title="快速排序"
        :steps="showSteps"
        :badges="badges"
      >
        <div class="flex flex-wrap items-center" style="min-height: 20rem">
          <transition-group name="flip-list" tag="div" class="flex items-end">
            <div
              class="w-12 mx-2 transform rounded text-white inline-flex items-center justify-center select-none transition duration-200"
              v-for="(item, i) in array"
              :key="item > 0 ? `item-${item}` : `item-key-${i}`"
              :class="[
                `bg-gray-300`,
                {
                  'bg-indigo-400':
                    i > leftIndex &&
                    i < selectIndex &&
                    rightIndex !== i &&
                    leftIndex !== i,
                  'bg-red-500': selectIndex === i,
                  'bg-green-500': leftIndex === i,
                  'bg-yellow-500': rightIndex === i,
                  'bg-blue-500': sorted.indexOf(item) > -1 && selectIndex !== i,
                  [`item-${item}`]: true
                }
              ]"
            >
              <span class="text-xl font-medium">{{ item }}</span>
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
    leftIndex: -1,
    rightIndex: -1,
    selectIndex: -1,
    sortedIndex: -1,
    sorted: [],
    badges: [
      {
        text: '左指针',
        color: 'bg-green-500'
      },
      {
        text: '右指针',
        color: 'bg-yellow-500'
      },
      {
        text: '选中元素',
        color: 'bg-red-500'
      },
      {
        text: '选中区域',
        color: 'bg-indigo-500'
      },
      {
        text: '已排序',
        color: 'bg-blue-500'
      }
    ]
  }),
  methods: {
    init() {
      this.leftIndex = -1
      this.rightIndex = -1
      this.selectIndex = -1
      this.sorted = []
      this.totalSteps = 0
    },
    async start() {
      this.init()
      await this.quick(0, this.array.length - 1)
    },
    async par(leftIndex, rightIndex) {
      this.leftIndex = leftIndex
      this.selectIndex = rightIndex
      const position = rightIndex
      this.rightIndex = --rightIndex
      let run = true
      let currentSteps = 0
      while (run) {
        while (this.array[leftIndex] < this.array[position]) {
          await wait(this.timeout)
          this.leftIndex = ++leftIndex
          currentSteps++
        }
        while (this.array[rightIndex] > this.array[position]) {
          await wait(this.timeout)
          this.rightIndex = --rightIndex
          currentSteps++
        }
        if (leftIndex >= rightIndex) {
          run = false
        } else {
          currentSteps++
          await this.swap(leftIndex, rightIndex)
        }
      }
      currentSteps++
      await this.swap(leftIndex, position)
      this.sorted.push(leftIndex)
      this.totalSteps += currentSteps
      return leftIndex
    },
    /**
     * 操作一段数组
     *
     */
    async quick(left, right) {
      if (right - left <= 0) {
        this.leftIndex = -1
        this.rightIndex = -1
        this.selectIndex = -1
        this.sorted.push(this.array[right])
        return
      }
      const pivotIndex = await this.par(left, right)
      // 已排好序
      this.sorted.push(this.array[pivotIndex])
      await this.quick(left, pivotIndex - 1)
      await this.quick(pivotIndex + 1, right)
    }
  }
}
</script>
