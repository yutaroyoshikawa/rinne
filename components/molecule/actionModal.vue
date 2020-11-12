<template>
  <transition
    :enter-class="$style.modalEnter"
    :leave-to-class="$style.modalLeaveTo"
    :enter-active-class="$style.modalEnterActive"
    :leave-active-class="$style.modalLeaveActive"
  >
    <div v-if="showActionModal" :class="$style.modalMask">
      <div :class="$style.modalWrapper" @click.self="$emit('close')">
        <div :class="$style.modalContainer">
          <div :class="$style.modalTitle">
            <p>{{ modalTitle }}</p>
          </div>
          <div :class="$style.textWrap">
            <slot />
          </div>
          <div :class="$style.buttonCenter">
            <button :class="$style.modalCancelButton" @click="$emit('close')">
              Cancel
            </button>
            <button :class="$style.modalButton" @click="$emit('action')">
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
type Data = {
  title: String
}
export default {
  name: 'ActionModal',
  props: {
    modalTitle: { type: String, default: 'modalTitle' },
    showActionModal: { type: Boolean, default: false },
  },
}
</script>
<style lang="scss" module>
@import '@/assets/scss/variables.scss';
.modalMask {
  position: fixed;
  z-index: $modal-zindex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}
.modalWrapper {
  display: table-cell;
  vertical-align: middle;
}
.modalContainer {
  width: 70%;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}
.modalTitle {
  width: 100%;
  height: 30px;
  background-color: $primary-color;
  display: table;
  text-align: center;
  & > p {
    color: $base-color;
    display: table-cell;
    vertical-align: middle;
    line-height: normal;
  }
}
.textWrap {
  width: 80%;
  margin: 0 auto;
  padding: 30px 0;
  overflow-wrap: break-word;
}
.modalButton {
  width: 100px;
  padding: 10px 0;
  border-radius: 30px;
  margin: 0 auto 20px auto;
  background-color: $secondary-color;
  text-align: center;
  color: #fff;
}
.modalCancelButton {
  width: 98px;
  padding: 10px 0;
  border: solid 1px $dark-base-color;
  border-radius: 30px;
  margin: 0 auto 20px auto;
  background-color: #fff;
  text-align: center;
  color: $dark-base-color;
}
.buttonCenter {
  text-align: center;
}
.modalEnterActive,
.modalLeaveActive {
  transition: opacity 0.4s;
  .modalContainer {
    transition: opacity 0.4s, transform 0.4s;
  }
}
.modalLeaveActive {
  transition: opacity 0.6s ease 0.4s;
}
.modalEnter,
.modalLeaveTo {
  opacity: 0;
  .modalContainer {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>
