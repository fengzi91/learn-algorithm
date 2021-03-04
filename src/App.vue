<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-top justify-center flex-wrap"
  >
    <div
      class="h-16 text-2xl shadow-lg bg-indigo-500 text-white flex items-center w-full"
    >
      <h1
        class="ml-5 cursor-pointer"
        @click="$route.name !== 'Home' ? $router.push('/') : null"
      >
        Learn Algorithm
      </h1>
      <div class="ml-auto text-base mr-36">
        <label for="speed">演示速度{{ speed * 100 }}ms</label>
        <div class="flex space-x-3">
          <input id="speed" type="range" min="1" max="10" v-model="speed" />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  computed: {
    speed: {
      get() {
        return this.$store.state.speed
      },
      set(value) {
        this.$store.commit('SET_SPEED', value)
      }
    }
  }
}
</script>
