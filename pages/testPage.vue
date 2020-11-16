<template>
  <div :class="$style.wrap">
    <button :class="$style.modalButton" @click="openNotifyModal()">
      notify modal
    </button>
    <NotifyModal
      :show-notify-modal="showNotifyModal"
      @close="closeNotifyModal()"
      @action="onNotifyModalAction()"
    />
    <button :class="$style.modalButton" @click="openActionModal()">
      action modal
    </button>
    <ActionModal
      :show-action-modal="showActionModal"
      @close="closeActionModal()"
      @action="onActionModalAction()"
    />
    <SplitLine />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CHANGE_HEADER_TITLE } from '@/store/index'
import SplitLine from '@/components/atoms/splitLine.vue'
import NotifyModal from '~/components/molecule/notifyModal.vue'
import ActionModal from '~/components/molecule/actionModal.vue'

type Data = {
  showNotifyModal: boolean
  showActionModal: boolean
}

export default Vue.extend({
  components: {
    NotifyModal,
    SplitLine,
    ActionModal,
  },
  data(): Data {
    return {
      showNotifyModal: false,
      showActionModal: false,
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
    onNotifyModalAction() {
      this.showNotifyModal = false
    },
    openActionModal() {
      this.showActionModal = true
    },
    closeActionModal() {
      this.showActionModal = false
    },
    onActionModalAction() {
      this.showActionModal = false
    },
  },
})
</script>
<style lang="scss" module>
.wrap {
  text-align: center;
}
.modalButton {
  width: 200px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 20px 0;
  background-color: #f6c521;
  text-align: center;
  color: #fff;
}
</style>
