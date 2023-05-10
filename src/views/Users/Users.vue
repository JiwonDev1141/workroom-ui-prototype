<template>
	<div class="container-fluid py-4" style="height: 85vh">
		<DataTable
			table-title="유저 관리"
			:show-detail-pop="state.showDetailPop"
			:set-show-detail-pop="setShowDetailPop"
		/>

		<ModalContainer :is-modal="true" :show="state.showDetailPop">
			<UserDetailPop
				:show="state.showDetailPop"
				:set-show="setShowDetailPop"
				:email="state.currentUserId"
				:username="state.username"
			/>
		</ModalContainer>
	</div>
</template>

<script>
import { reactive , ref } from "vue";
import UserDetailPop from "../components/custom/UserDetailPop.vue";
import ModalContainer from "../components/custom/common/ModalContainer.vue";
import DataTable from "../components/custom/common/DataTable.vue";
export default {
  name: "User",
  components: {
    UserDetailPop,
    ModalContainer,
    DataTable,
  },
  setup() {
    const sample = ref("sample text.");
    const state = reactive({
      showDetail: 0,
      email: false,
      currentUserId: "awesomedev3@rockwonitglobal.com",
      username: "Jiwon",
      profileImg: "/favicon.png",
      showDetailPop: false,
    });
    const setShowDetailPop = (newState) => {
      state.showDetailPop = newState;
    };
    const showDetail = () => {
      state.showDetail += 1;
      console.log(state);
    };
    return {
      showDetail,
      setShowDetailPop,
      state,
      sample,
    };
  },
};
</script>