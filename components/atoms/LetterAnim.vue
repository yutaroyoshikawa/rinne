<template>
  <transition-group
    tag="p"
    :class="$props.className"
    :enter-class="$style.enter"
    :enter-to-class="$style.enterTo"
    :leave-class="$style.leave"
    :leave-to-class="$style.leaveTo"
    :enter-active-class="$style.enterActive"
    :leave-active-class="$style.leaveActive"
  >
    <div
      v-for="(atom, index) in atoms"
      :key="atom"
      :class="$style.atom"
      :style="{ '--duration': '200ms', '--delay': `${100 * index}ms` }"
    >
      {{ atom }}
    </div>
  </transition-group>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LetterAnim',
  props: {
    text: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
    in: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    atoms(): string[] {
      if (!this.$props.in) {
        return []
      }
      return (this.$props.text as string).split('')
    },
  },
})
</script>

<style lang="scss" module>
.atom {
  display: inline-block;
}

.enter,
.leaveTo {
  transform: scale(0);
}

.enterTo,
.leave {
  transform: scale(1);
}

.enterActive {
  transition: transform ease;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}

.leaveActive {
  transition: transform ease;
  transition-delay: var(--delay);
  transition-duration: var(--duration);
}
</style>
