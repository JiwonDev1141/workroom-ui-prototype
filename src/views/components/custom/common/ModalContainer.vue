<template>
	<div
		v-show="show"
		:class="[{ modal_container: isModal == true }]"
		:style="cssVars"
	>
		<slot />
	</div>
</template>

<script>
export default {
  props: {
    isModal: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    setShow: Function,
    zIndex: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    cssVars() {
      return {
        "--zindex": this.zIndex,
      };
    },
  },
};
</script>

<style scoped>
.modal_container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: var(--zindex);
}
</style>