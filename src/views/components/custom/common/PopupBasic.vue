<!-- 팝업의 공통 부분을 모듈화한 component -->
<template>
	<div
		v-show="props.show"
		style="
      width: 400px;
      overflow-x: auto;
      z-index: 0;
      background-color: rgba(255, 255, 255, 1);
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      border-radius: 10px;
      border: solid 0px; 
      padding: 20px;
      max-height: 80vh;
    "
	>
		<div
			style="margin-bottom: 15px; display: flex; justify-content: space-between"
		>
			<h5>{{ props.title }}</h5>
			<button
				class="p-0 btn btn-link text-dark fixed-plugin-close-button"
				style="top: 3px"
				@click="closePop"
			>
				<i class="material-icons">clear</i>
			</button>
		</div>

		<div>
			<!-- 팝업 메인 내용 -->
			<slot />
		</div>
	</div>
</template>

<script>
import { reactive } from "vue";
export default {
  components: {
    // MaterialAvatar,
  },
  props: {
    show: {
      type: Boolean,
      default: true,
    },
    setShow: Function,
    title: {
      type: String,
      default: "Popup Title Here",
    },
  },
  setup(props) {
    const state = reactive({});
    const closePop = () => {
      // const userDetailPop = ref("userDetailPop");
      console.log(props);
      props.setShow(false);
      // console.log(userDetailPop)
    };
    return {
      closePop,
      state,
      props,
    };
  },
};
</script>
<style scoped>
.input-area {
  margin: 5px 0 5px 0;
}
</style>
