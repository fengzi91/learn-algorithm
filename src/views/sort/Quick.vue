<template>
  <div class="container self-start">
    <div class="flex">
      <div
        class="m-4 bg-white rounded-md shadow-md mx-auto w-full max-w-2xl overflow-hidden"
      >
        <div class="px-4 py-6">
          <div class="flex justify-between mb-6 items-baseline">
            <h3 class="text-yellow-500">快速排序</h3>
            <buttons
              @sort="sort"
              @shuffle="shuffle"
              @start="start"
              @generator="generator"
              :sorting="sorting"
            ></buttons>
          </div>
          <div class="flex flex-wrap items-center">
            <transition-group
              name="flip-list"
              tag="div"
              v-if="show"
              class="flex items-end"
            >
              <div
                class="relative w-12 mx-2 transform rounded text-white inline-flex items-center justify-center select-none transition duration-200"
                v-for="(item, i) in array"
                :key="`item-${item}`"
                :class="[
                  `bg-gray-300`,
                  `item-${item}`,
                  {
                    'bg-indigo-400':
                      i > leftIndex &&
                      i < selectIndex &&
                      rightIndex !== i &&
                      leftIndex !== i,
                    'bg-red-500': selectIndex === i,
                    'bg-green-500': leftIndex === i,
                    'bg-yellow-500': rightIndex === i,
                    'bg-blue-500':
                      sorted.indexOf(item) > -1 && selectIndex !== i
                  }
                ]"
              >
                <span class="text-xl font-medium">{{ item }}</span
                ><span
                  class="text-xs text-pink-500 absolute"
                  style="right: 0; bottom: 0"
                  >{{ i }}</span
                >
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
          <div class="ml-auto text-white text-xs grid grid-cols-5 items-center">
            <div
              class="h-6 px-1 bg-green-500 inline-flex items-center justify-center"
            >
              左指针
            </div>
            <div
              class="h-6 px-1 bg-yellow-500 inline-flex items-center justify-center"
            >
              右指针
            </div>
            <div
              class="h-6 px-1 bg-red-500 inline-flex items-center text-center justify-center"
            >
              选中元素
            </div>
            <div
              class="h-6 px-1 bg-indigo-500 inline-flex items-center text-center justify-center"
            >
              选中区域
            </div>
            <div
              class="h-6 px-1 bg-blue-500 inline-flex items-center text-center justify-center"
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
    leftIndex: -1,
    rightIndex: -1,
    selectIndex: -1,
    sortedIndex: -1,
    sorted: []
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
