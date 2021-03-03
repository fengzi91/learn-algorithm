<template>
  <div class="container self-start">
    <div class="flex">
      <div
        class="m-4 bg-white rounded-md shadow-md mx-auto w-full max-w-2xl overflow-hidden"
      >
        <div class="px-4 py-6">
          <div class="flex justify-between mb-6 items-baseline">
            <h3 class="text-yellow-500">插入排序</h3>
            <div class="ml-auto">
              <button
                class="text-indigo-400 ring-indigo-300 hover:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
                @click="generator"
              >
                重新生成
              </button>
              <button
                class="text-indigo-400 ring-indigo-300 hover:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
                @click="handleShuffle"
              >
                打乱
              </button>
              <button
                class="text-indigo-400 ring-indigo-300 hover:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
                @click="start"
              >
                开始
              </button>
            </div>
          </div>
          <div class="flex h-36 flex-wrap items-center">
            <transition-group name="flip-list" tag="div" v-if="show">
              <div
                class="w-12 h-12 mx-2 transform rounded text-white inline-flex items-center justify-center select-none transition duration-200"
                v-for="(item, i) in array"
                :key="`item-${i}`"
                :class="
                  activeIndex === i && minIndex === i
                    ? 'bg-gradient-to-br from-red-500 via-pink-400 to-green-300'
                    : activeIndex === i
                    ? 'bg-red-500 transform -translate-y-12'
                    : compareIndex === i
                    ? 'bg-yellow-500'
                    : minIndex === i
                    ? 'bg-green-500'
                    : sortedIndex >= i
                    ? 'bg-indigo-500'
                    : 'bg-gray-300'
                "
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
import { generatorArray, wait } from '@/utils'
import _ from 'lodash'
import gsap from 'gsap'
export default {
  data: () => ({
    array: [],
    show: true,
    activeIndex: -1,
    compareIndex: -1,
    minIndex: -1,
    sortedIndex: -1,
    totalSteps: 0,
    steps: 0,
    timeout: 500
  }),
  computed: {
    showSteps() {
      return this.steps.toFixed(0)
    }
  },
  watch: {
    totalSteps(newValue) {
      gsap.to(this.$data, { duration: 0.5, steps: newValue })
    }
  },
  mounted() {
    this.generator()
  },
  methods: {
    async start() {
      this.sortedIndex = -1
      this.totalSteps = 0
      for (let i = 1; i < this.array.length; i++) {
        this.activeIndex = i
        let position = i
        const tempValue = this.array[i]
        while (position > 0 && this.array[position - 1] > tempValue) {
          this.compareIndex = position - 1
          await wait(this.timeout)
          this.$set(this.array, position, this.array[position - 1])
          position--
        }
        this.$set(this.array, position, tempValue)
        await wait(this.timeout)
        this.activeIndex = -1
        await wait(this.timeout)
      }
      this.activeIndex = -1
    },
    async generator() {
      this.show = false
      const newArray = generatorArray(10, 30)
      newArray.forEach((v, i) => {
        this.$set(this.array, i, v)
      })
      await wait(500)
      this.sortedIndex = -1
      this.activeIndex = -1
      this.show = true
    },
    handleShuffle() {
      this.array = _.shuffle(this.array)
      this.sortedIndex = -1
      this.activeIndex = -1
    }
  }
}
</script>
<style lang="scss" scoped>
.flip-list-move {
  transition: transform 0.3s;
}
</style>
