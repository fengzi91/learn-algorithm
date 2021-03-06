<template>
  <div
    class="md:ml-auto gap-2 text-sm grid grid-cols-3 md:grid-cols-5 md:col-span-3 items-center"
  >
    <button class="btn-primary" @click="generator" :disabled="sorting">
      重新生成
    </button>
    <button class="btn-primary" @click="sort('asc')" :disabled="sorting">
      正序
    </button>
    <button class="btn-primary" @click="sort('desc')" :disabled="sorting">
      倒序
    </button>
    <button class="btn-primary" @click="shuffle" :disabled="sorting">
      打乱
    </button>

    <button class="btn-primary" @click="start" :disabled="sorting">开始</button>
  </div>
</template>
<script>
export default {
  props: {
    sorting: {
      type: Boolean,
      default: false
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
