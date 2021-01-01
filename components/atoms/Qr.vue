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
    <p :class="$style.value">{{ $props.value }}</p>
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
  text-align: center;
}

.value {
  font-size: 12px;
  opacity: 0.7;
  margin-top: 5px;
}
</style>
