<template>
	<div class="modal_container">
		<slot />
	</div>
</template>

<script>
export default {
    props: {
    }
}
</script>

<style scoped>
.modal_container {
    position: fixed;
    background-color: rgba(0, 0, 0, 0.3);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>