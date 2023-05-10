<template>
	<div class="form-check form-switch d-flex">
		<input
			:id="id"
			class="form-check-input check_disabled"
			:class="$attrs.class"
			type="checkbox"
			:name="name"
			:checked="checked"
			:disabled="disabled"
		/>
		<label class="form-check-label ms-3" :class="labelClass" :for="id">
			<slot />
		</label>
	</div>
</template>

<script>
export default {
  name: "MaterialSwitch",
  props: {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    labelClass: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style scoped>
.check_disabled[disabled] {
  cursor: not-allowed;
}
</style>