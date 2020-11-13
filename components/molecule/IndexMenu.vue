<template>
  <div :class="$style.wrap">
    <IndexLink to="/locate">いばしょ</IndexLink>
    <div :class="$style.centerWrap">
      <IndexLink to="/photoList">アルバム</IndexLink>
    </div>
    <IndexLink to="/cleanliness">たいちょう</IndexLink>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IndexLink from '@/components/atoms/IndexLink.vue'

export default Vue.extend({
  components: {
    IndexLink,
  },
  props: {
    in: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style lang="scss" module>
.wrap {
  display: flex;
  justify-content: center;
}

.centerWrap {
  padding: 50px 10px 0 10px;
}
</style>
