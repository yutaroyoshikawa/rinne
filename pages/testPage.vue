<template>
  <div>
    <button :class="$style.modalButton" @click="openNotifyModal()">
      モーダル１
    </button>
    <NotifyModal v-if="showNotifyModal" @close="closeNotifyModal()" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import NotifyModal from '~/components/molecule/notifyModal.vue'

type Data = {
  showNotifyModal: boolean
}

export default Vue.extend({
  components: {
    NotifyModal,
  },
  data(): Data {
    return {
      showNotifyModal: false,
    }
  },
  beforeCreate() {
    this.$store.dispatch(CHANGE_HEADER_TITLE, 'テスト用')
  },
  methods: {
    openNotifyModal() {
      this.showNotifyModal = true
    },
    closeNotifyModal() {
      this.showNotifyModal = false
    },
  },
})
</script>
<style lang="scss" module>
.modalButton {
  width: 200px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 0 auto 10px auto;
  background-color: #f6c521;
  text-align: center;
  color: #fff;
}
</style>
