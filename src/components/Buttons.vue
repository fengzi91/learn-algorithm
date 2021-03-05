<template>
  <div class="ml-auto flex gap-2 text-sm">
    <button
      class="text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
      @click="generator"
      :disabled="sorting"
    >
      重新生成
    </button>
    <button
      class="text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
      @click="sort('asc')"
      :disabled="sorting"
    >
      正序
    </button>
    <button
      class="text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
      @click="sort('desc')"
      :disabled="sorting"
    >
      倒序
    </button>
    <button
      class="text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
      @click="shuffle"
      :disabled="sorting"
    >
      打乱
    </button>

    <button
      class="text-indigo-400 ring-indigo-300 hover:text-white disabled:bg-gray-300 disabled:text-white active:ring hover:bg-indigo-400 rounded px-2 py-1 focus:outline-none transition ease-in-out duration-150"
      @click="start"
      :disabled="sorting"
    >
      开始
    </button>
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
