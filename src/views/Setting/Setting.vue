<template>
	<div class="setting_background">
		<div class="container-fluid py-4">
			<div class="row">
				<div class="col-12">
					<div class="card my-4">
						<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
							<div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
								<h6 class="text-white text-capitalize ps-3">
									설정 목록
								</h6>
							</div>
						</div>
						<div class="card-body px-0 pb-2">
							<div class="table-responsive p-0">
								<table class="table align-items-center mb-0">
									<thead>
										<tr>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												기기ID
											</th>
											<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
												기기 전화번호
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												상태
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												등록일
											</th>
											<th class="text-secondary opacity-7"></th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(setting, index) in state.settingList" :key="index">
											<td>
												<div class="d-flex px-2 py-1">
													<div>
														<img :src="setting.tenantLogo" class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
													</div>
													<div class="d-flex flex-column justify-content-center">
														<h6 class="mb-0 text-sm">
															{{ setting.settingCategory }}
														</h6>
														<p class="text-xs text-secondary mb-0">
															{{ setting.settingId }}
														</p>
													</div>
												</div>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ setting.settingOwner }}RWIT
												</p>
												<p class="text-xs text-secondary mb-0">
													{{ setting.settingCode }} Roc-0112
												</p>
											</td>
											<td class="align-middle text-center text-sm">
												<span class="badge badge-sm bg-gradient-success">{{ setting.settingStatus }} ON</span>
											</td>
											<td class="align-middle text-center">
												<span class="text-secondary text-xs font-weight-bold">{{
													setting.createdAt
												}}</span>
											</td>
											<td class="align-middle">
												<a
													href="javascript:;"
													class="text-secondary font-weight-bold text-xs"
													data-toggle="tooltip"
													@click="clickSettingCategoryDetailPop(setting)"
												>
													상세 보기
												</a>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<ModalContainer v-if="state.showSettingCategoryDetailPop || state.showCreateServicePop || state.showServiceDetailPop == true" :is-modal="true" show="true">
			<SettingDetailPop
				v-if="state.showSettingCategoryDetailPop == true"
				:setting-info="state.handleSettingCategory"
				:setshow="setsettingDetailPopshow"
				:add-service="clickCreateServicePop"
				:service-detail="clickServiceDetailPop"
				:setitems="setitems"
			/>
			<CreateServicePop v-if="state.showCreateServicePop == true" :setshow="setCreatePopShow" :setitems="setitems" />
			<ServiceDetailPop
				v-if="state.showServiceDetailPop == true"
				:setshow="setserviceDetailPopshow"
				:setitems="setitems"
				:serviceinfo="state.handleServiceInfo"
			/>
		</ModalContainer>
	</div>
</template>

<script>
import { reactive } from "vue";
import { getSettings } from "../../apis/settingApi";
import ModalContainer from "../components/custom/common/ModalContainer.vue";
import SettingDetailPop from "./SettingDetailPop.vue";
import CreateServicePop from './CreateServicePop.vue';
import ServiceDetailPop from './ServiceDetailPop.vue';

export default {
  components: {
    SettingDetailPop,
    CreateServicePop,
    ServiceDetailPop,
    ModalContainer
},

  setup() {
    const state = reactive({
      settingList: [],
      handleSettingCategory: {},
      handleServiceInfo: {},
      showCreateServicePop: false,
      showSettingCategoryDetailPop: false,
      showServiceDetailPop: false,
      currentPage: 1, // 현재 선택된 페이지
      totalPageCount: "", //페이지 리스트 갯수
      pageDisplayCount: 5, //한번에 보여줄 페이지 버튼 수
      pageItems: 10, // 한페이지에 보여줄 아이템 수
      listFirstElement: "",
      listLastElement: "",
    });



    const clickSettingCategoryDetailPop = (setting) => {
      if (state.showSettingCategoryDetailPop == false) {
        state.showSettingCategoryDetailPop = true;
        state.showCreateServicePop = false;
        state.showServiceDetailPop = false;
        state.handleSettingCategory = setting;

      } else {
        if (state.handleSettingCategory == setting) {
          state.showSettingCategoryDetailPop = false;
        }
        state.handleSettingCategory = setting;
      }
    };

    const setitems = () => {
      getSettings().then((data) => {
        state.settingList = data.data.data;
      });
    };
    setitems();



    const clickCreateServicePop = () => {
      state.showCreateServicePop = true;
      state.showSettingCategoryDetailPop = false;
    };

    const clickServiceDetailPop = (service) => {
      state.showServiceDetailPop = true;
      state.showSettingCategoryDetailPop = false;
      state.handleServiceInfo = service
    };

    const setCreatePopShow = (newstate) => {
      state.showCreateServicePop = newstate;
    };
    const setsettingDetailPopshow = (newstate) => {
      state.showSettingCategoryDetailPop = newstate;
    };
    const setserviceDetailPopshow = (newstate) => {
      state.showServiceDetailPop = newstate;
    };

    return {
      clickCreateServicePop,
      clickSettingCategoryDetailPop,
      setserviceDetailPopshow,
      state,
      setitems,
      setCreatePopShow,
      setsettingDetailPopshow,
      clickServiceDetailPop,
    };
  },
};
</script>
<style scoped>
.setting_background {
  height: 90vh;
  display: flex;
  position: relative;
}


</style>