<template>
	<div class="w-screen h-screen flex flex-column justify-around sm:p-24">
		<div class="mb-4">
			<div class="mb-4">
				<h1 class="font-bold text-2xl mb-2">
					Congratulations!
				</h1>
				<h1 class="font-bold text-2xl mb-2">
					You've created your first Workroom.
				</h1>
			</div>
		</div>

		<div>
			<button class="bg-red-500 text-white p-2 rounded-md px-4" @click="routeToNext">
				Go To Workroom
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
      router.push('/')
    }
    
    return {
        routeToNext
    }
  }
};
</script>
