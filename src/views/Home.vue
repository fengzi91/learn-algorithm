<template>
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        class="shadow-sm px-4 py-6 rounded-md text-center bg-white"
        v-for="(item, index) in items"
        :key="index"
      >
        <router-link
          :to="{ name: item.route }"
          class="text-2xl text-blue-500"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    items: [
      {
        name: '冒泡排序',
        link: '/sort/bubble',
        route: 'BubbleSort'
      },
      {
        name: '选择排序',
        link: '/sort/selection',
        route: 'SelectionSort'
      },
      {
        name: '插入排序',
        link: '/sort/insertion',
        route: 'InsertionSort'
      },
      {
        name: '快速排序',
        link: '/sort/quick',
        route: 'QuickSort'
      }
    ]
  })
}
</script>
