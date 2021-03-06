import gsap from 'gsap'
import { generatorArray, wait } from '@/utils'
import _ from 'lodash'
import Card from '@/components/Card'
export default {
  components: {
    Card
  },
  mounted() {
    this.generator()
  },
  computed: {
    timeout() {
      return this.$store.state.speed * 100
    },
    showSteps() {
      return this.steps.toFixed(0)
    }
  },
  watch: {
    totalSteps(newValue) {
      gsap.to(this.$data, { duration: 0.5, steps: newValue })
    }
  },
  data: () => ({
    totalSteps: 0,
    steps: 0,
    array: [],
    show: true,
    sorting: false,
    sorted: false
  }),
  methods: {
    init() {},
    async generator() {
      if (typeof this.beforeGenerator === 'function') {
        await this.beforeGenerator()
      }
      this.show = false
      const length = this.$store.state.count
      const newArray = generatorArray(length, 10)
      // newArray.forEach((v, i) => {
      //   this.$set(this.array, i, v)
      // })
      this.array = newArray
      await wait(this.timeout)
      this.init()
      this.show = true
      if (typeof this.afterGenerator === 'function') {
        await this.afterGenerator()
      }
      return newArray
    },
    async swap(left, right) {
      await wait(this.timeout)
      const tempValue = this.array[left]
      this.$set(this.array, left, this.array[right])
      this.$set(this.array, right, tempValue)
    },
    shuffle() {
      this.array = _.shuffle(this.array)
      this.init()
      if (typeof this.afterShuffle === 'function') {
        this.afterShuffle()
      }
    },
    /**
     * 将预排序数组以正序排好
     */
    sort(order = 'asc') {
      const array = _.orderBy(this.array, (i) => i, order)
      console.log(array)
      this.array.map((v, i) => {
        this.$set(this.array, i, array[i])
      })
      this.init()
      if (typeof this.afterSort === 'function') {
        this.afterSort()
      }
    }
  }
}
