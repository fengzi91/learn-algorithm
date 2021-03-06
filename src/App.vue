<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-top justify-center flex-wrap"
  >
    <div
      class="h-16 text-lg md:text-2xl shadow-lg bg-indigo-500 text-white flex items-center w-full"
    >
      <h1
        class="cursor-pointer ml-2 sm:ml-12 md:ml-36"
        @click="$route.name !== 'Home' ? $router.push('/') : null"
      >
        Learn Algorithm
      </h1>
      <div class="ml-auto text-base mr-2 md:mr-36 sm:mr-12">
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
import { debounce } from 'lodash'
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
  },
  created() {
    this.debounceResize = debounce(this.setIsMobile, 200)
    window.addEventListener('resize', this.debounceResize)
    this.setIsMobile()
  },
  destroyed() {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    setIsMobile() {
      const width = window.outerWidth
      if (width >= 650) {
        this.$store.commit('SET_GENERATOR_LENGTH', 10)
      } else if (width >= 520) {
        this.$store.commit('SET_GENERATOR_LENGTH', 8)
      } else {
        this.$store.commit('SET_GENERATOR_LENGTH', 5)
      }
    }
  }
}
</script>
