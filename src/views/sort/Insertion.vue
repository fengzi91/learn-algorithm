<template>
  <div class="container self-start">
    <div class="flex">
      <card
        title="插入排序"
        @sort="sort"
        @shuffle="shuffle"
        @start="start"
        @generator="generator"
        :sorting="sorting"
        :steps="showSteps"
        :badges="badges"
      >
        <div
          class="flex h-36 flex-wrap justify-center items-center relative pt-12"
        >
          <template v-for="(i, index) in animateArray">
            <div
              :key="`item-${index}`"
              class="w-12 h-12 duration-500 transform text-white select-none transition ease-out absolute"
              style="left: 0; top: 3rem"
              :style="`transform: translate(${i.css.x}rem, ${i.css.y}rem)`"
            >
              <div
                class="w-12 h-12 p-2 rounded inline-flex items-center justify-center"
                :class="[
                  `bg-gray-300`,
                  {
                    'bg-red-500': index === activeIndex,
                    'bg-yellow-500': i.value === array[compareIndex],
                    'bg-indigo-500': sorted
                  }
                ]"
              >
                {{ i.value }}
              </div>
            </div>
          </template>
        </div>
      </card>
    </div>
  </div>
</template>
<script>
import { wait } from '@/utils'
import Sort from '@/mixins/Sort'
// import gsap from 'gsap'
export default {
  mixins: [Sort],
  data: () => ({
    activeIndex: -1,
    compareIndex: -1,
    minIndex: -1,
    sortedIndex: -1,
    animateArray: [], // 用于展示动画的数组
    badges: [
      {
        text: '选中元素',
        color: 'bg-red-500'
      },
      {
        text: '正在对比',
        color: 'bg-yellow-500'
      },
      {
        text: '已排序',
        color: 'bg-indigo-500'
      }
    ]
  }),
  methods: {
    afterSort() {
      this.fillAnimateArray()
      this.sorted = false
    },
    afterGenerator() {
      this.fillAnimateArray()
      this.sorted = false
    },
    afterShuffle() {
      this.fillAnimateArray()
      this.sorted = false
    },
    fillAnimateArray() {
      this.animateArray = []
      this.array.map((v, i) => {
        this.animateArray.push({
          id: i,
          value: v,
          css: { x: i * 4, y: 0 }
        })
      })
    },
    async start() {
      this.sortedIndex = -1
      this.totalSteps = 0
      this.sorting = true
      this.totalSteps = 0

      for (let i = 1; i < this.array.length; i++) {
        let currentSteps = 0
        // 取数据
        this.activeIndex = i
        await this.moveTo(i, { x: 0, y: 1 })
        let position = i
        // 取出数据
        currentSteps++
        const tempValue = this.array[i]
        while (position > 0 && this.array[position - 1] > tempValue) {
          this.compareIndex = position - 1
          currentSteps++
          // 左移
          this.$set(this.array, position, this.array[position - 1])
          const _index = this.animateArray.findIndex(
            (i) => i.value === this.array[position - 1]
          )
          await this.moveTo(_index, { x: 1, y: 0 })
          position--
        }
        // 修改数据
        currentSteps++
        await this.moveTo(i, {
          x: position - i,
          y: -1
        })
        this.$set(this.array, position, tempValue)
        this.compareIndex = -1
        // await this.moveTo(position, { x: i - position, y: 0 })
        this.activeIndex = -1
        this.totalSteps += currentSteps
      }
      this.activeIndex = -1
      this.sorting = false
      this.sorted = true
    },
    async moveTo(i, { x, y }) {
      // 取得已经移动的格子数
      const css = this.animateArray[i].css
      this.$set(this.animateArray[i], 'css', {
        x: x * 4 + css.x,
        y: y * 4 + css.y
      })
      await wait(this.timeout)
    }
  }
}
</script>
