<template>
	<div class="bg-gray-300 w-screen h-screen flex flex-column justify-center items-center">
		<img src="/img/work_room_logo.png" />
		<button class="mt-5 bg-red-500 text-white p-2 rounded-md px-4" @click="routeToNext">
			Sign in with Google
		</button>
	</div>
</template>

<script>
import router from '../../router';



export default {
  components: {
  
  },
  setup() {
    const routeToNext = () => {
      router.push('onboarding2')
    }
    return {
      routeToNext
    }
  }
};
</script>
