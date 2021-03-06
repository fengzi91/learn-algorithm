<template>
  <div
    class="m-4 bg-white md:rounded-md md:shadow-md mx-auto w-full max-w-2xl overflow-hidden"
  >
    <div class="px-4 py-6">
      <card-bar
        @sort="sort"
        @shuffle="shuffle"
        @start="start"
        @generator="generator"
        :sorting="sorting"
        :title="title"
      ></card-bar>
      <slot></slot>
    </div>
    <div
      class="h-12 mt-2 p-2 w-full bg-gray-200 flex justify-between items-center"
    >
      <!--div class="inline-flex items-center text-pink-500">
        <span class="text-sm">复杂度:</span
        ><span class="text-lg">{{ steps }}</span>
      </div-->
      <div
        class="ml-auto text-white text-xs grid items-center"
        :class="`grid-cols-${badges.length}`"
      >
        <template v-for="(badge, index) in badges">
          <div
            :key="`badge-${index}`"
            class="h-6 px-1 inline-flex items-center text-center justify-center"
            :class="badge.color"
          >
            {{ badge.text }}
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import CardBar from '@/components/CardBar'
export default {
  components: {
    CardBar
  },
  props: {
    title: {
      type: String,
      default: '排序'
    },
    sorting: {
      type: Boolean,
      default: false
    },
    steps: {
      type: [Number, String],
      default: 0
    },
    badges: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    generator() {
      this.$emit('generator')
    },
    sort(order) {
      this.$emit('sort', order)
    },
    start() {
      this.$emit('start')
    },
    shuffle() {
      this.$emit('shuffle')
    }
  }
}
</script>
