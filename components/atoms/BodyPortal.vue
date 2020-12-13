<script lang="js">
/* eslint-disable nuxt/no-globals-in-created */
/* eslint-disable vue/require-render-return */
import Vue from 'vue'
export default Vue.component('to-body', {
  beforeCreate() {
    this._vm = new Vue({
      methods: {
        forceRender(slots) {
          this._slots = slots
          this.$forceUpdate()
        },
      },
      render() {
        if (this._slots) {
          return this._slots
        }
      },
    }).$mount()
    document.body.appendChild(this._vm.$el)
  },
  render() {
    this._vm.forceRender(this.$slots.default)
  },
})
</script>
