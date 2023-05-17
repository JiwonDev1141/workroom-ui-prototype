<template>
	<div class="w-screen h-screen flex flex-column justify-around sm:p-24">
		<div class="mb-4">
			<div class="mb-4">
				<h1 class="font-bold text-2xl mb-2">
					Welcom to Workroom!
				</h1>
				<span class="">You're signing up as racheldesign@gmail.com.</span>
			</div>

			<div>
				<h4 class="mb-3">
					What's your full name?
				</h4>
				<input class="bg-gray-300 w-72 h-8" type="text" />
			</div>
		</div>

		<div>
			<button class="bg-red-500 text-white p-2 rounded-md px-6" @click="routeToNext">
				Continue
			</button> 
		</div>
		<!-- <img src="/img/work_room_logo.png" /> -->
	</div>
</template>

<script>
import router from '../../router';



export default {
  components: {
  
  },
  setup() {
    const routeToNext = () => {
      router.push('onboarding3')
    }
    
    return {
        routeToNext
    }
  }
};
</script>
