<template>
  <div :class="$style.qr">
    <qrcode
      :value="$props.value"
      :options="{
        width: $props.width,
        margin: 0,
        color: { dark: '#3c230d', light: '#f3ebd8' },
      }"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'

export default Vue.extend({
  name: 'Qr',
  components: {
    qrcode: VueQrcode,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    getUrl(): string {
      return location.href
    },
  },
})
</script>

<style module lang="scss">
@import '@/assets/scss/variables.scss';

.qr {
  border-radius: 8px;
  background-color: $dark-base-color;
  padding: 5px;
}
</style>
