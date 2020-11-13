<template>
  <div :class="$style.transitionWrapper">
    <transition
      :enter-class="$style.slideEnter"
      :leave-to-class="$style.slideLeaveTo"
      :enter-active-class="$style.slideEnterActive"
      :leave-active-class="$style.slideLeaveActive"
      :appear="true"
    >
      <div v-show="headerTitle" :class="$style.container">
        <transition
          mode="out-in"
          :enter-class="$style.fadeEnter"
          :leave-to-class="$style.fadeLeaveTo"
          :enter-active-class="$style.fadeEnterActive"
          :leave-active-class="$style.fadeLeaveActive"
          :appear="false"
        >
          <h2
            v-if="currentPosition === 'first'"
            key="first"
            :class="$style.header"
          >
            {{ firstTitle }}
          </h2>
          <h2
            v-else-if="currentPosition === 'second'"
            key="second"
            :class="$style.header"
          >
            {{ secondTitle }}
          </h2>
          <h2 v-else key="default" :class="$style.header"></h2>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

type Data = {
  firstTitle: string
  secondTitle: string
  currentPosition: 'first' | 'second' | null
}

export default Vue.extend({
  data(): Data {
    return {
      firstTitle: '',
      secondTitle: '',
      currentPosition: null,
    }
  },
  computed: {
    headerTitle() {
      const title = this.$store.state.headerTitle
      this.updateTitle(title)
      return !!title
    },
  },
  methods: {
    updateTitle(newTitle?: string) {
      if (!newTitle) {
        this.currentPosition = null
      } else if (this.currentPosition === 'second' || !this.currentPosition) {
        this.currentPosition = 'first'
        this.firstTitle = newTitle
      } else {
        this.currentPosition = 'second'
        this.secondTitle = newTitle
      }
    },
  },
})
</script>

<style lang="scss" module>
@import '@/assets/scss/variables.scss';

.transitionWrapper {
  width: 100%;
  height: $header-height;
}
.container {
  width: 100%;
  height: 100%;
  padding: 0 20px;
  background-color: $dark-base-color;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.header {
  max-width: calc(100vw - 40px);
  width: 100%;
  text-align: center;
  font-size: 24px;
  color: $base-color;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: absolute;
}

.slideEnterActive,
.slideLeaveActive {
  transition: transform 0.5s ease;
}

.slideEnter,
.slideLeaveTo {
  transform: translateY(-100%);
}

.fadeEnterActive,
.fadeLeaveActive {
  transition: opacity 0.5s, transform 0.5s;
}

.fadeEnter {
  opacity: 0;
  transform: translateX(100px);
}
.fadeLeaveTo {
  opacity: 0;
  transform: translateX(-100px);
}
</style>
