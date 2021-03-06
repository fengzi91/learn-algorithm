<template>
  <div
    class="grid grid-cols-1 md:grid-cols-4 gap-6 justify-between mb-6 items-center"
  >
    <h3 class="text-yellow-500 text-center text-2xl md:text-left">
      {{ title }}
    </h3>
    <buttons
      @sort="sort"
      @shuffle="shuffle"
      @start="start"
      @generator="generator"
      :sorting="sorting"
    ></buttons>
  </div>
</template>
<script>
import Buttons from '@/components/Buttons'
export default {
  props: {
    title: {
      type: String,
      default: '排序'
    },
    sorting: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Buttons
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
