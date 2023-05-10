<template>
	<button
		class="btn mb-0"
		:class="getClasses(variant, color, size, fullWidth, active)"
	>
		<slot />
	</button>
</template>

<script>
export default {
  name: "MaterialButton",
  props: {
    color: {
      type: String,
      default: "success",
    },
    size: {
      type: String,
      default: "md",
    },
    variant: {
      type: String,
      default: "fill",
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
   
  },
};
</script>
