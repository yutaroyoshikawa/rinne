<template>
  <div>
    <ArAlbum @reality-ready="onRealityReady" @reality-error="onRealityError" />
    <template v-if="!isReadyReality">
      <Loading />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import ArAlbum from '@/components/organisms/ArAlbum.vue'
import Loading from '@/components/organisms/loading.vue'

type Data = {
  isReadyReality: boolean
}

export default Vue.extend({
  name: 'Presentation',
  components: {
    ArAlbum,
    Loading,
  },
  data(): Data {
    return {
      isReadyReality: false,
    }
  },
  created() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, undefined)
  },
  methods: {
    onRealityReady() {
      this.isReadyReality = true
    },
    onRealityError() {
      this.isReadyReality = true
    },
  },
})
</script>
