<template>
  <div :class="$style.wrap">
    <ScaleTransition :in="$props.in" :delay="100" :duration="400">
      <IndexLink to="/locate">いばしょ</IndexLink>
    </ScaleTransition>
    <div :class="$style.centerWrap">
      <ScaleTransition :in="$props.in" :delay="0" :duration="400">
        <IndexLink to="/photoList">いちらん</IndexLink>
      </ScaleTransition>
    </div>
    <ScaleTransition :in="$props.in" :delay="200" :duration="400">
      <IndexLink to="/profile">プロフィール</IndexLink>
    </ScaleTransition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import IndexLink from '@/components/atoms/IndexLink.vue'
import ScaleTransition from '@/components/atoms/transitions/ScaleTransition.vue'

export default Vue.extend({
  components: {
    IndexLink,
    ScaleTransition,
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
