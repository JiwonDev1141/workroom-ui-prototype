<template>
	<div class="row">
		<div class="col-12">
			<div class="card my-4">
				<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
					<div class="create_tenant_button">
						<MaterialButton
							class="deletebutton"
							full-width="false"
							variant="gradient"
							text="추가"
							size=""
							color="dark"
							@click="clickCreatePop"
						/>
					</div>
					<div class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3">
						<h6 class="text-white text-capitalize ps-3">
							테넌트 목록
						</h6>
					</div>
				</div>
				<div class="card-body px-0 pb-2">
					<div class="table-responsive p-0">
						<table class="table align-items-center mb-0">
							<thead>
								<tr>
									<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
										테넌트 종류
									</th>
									<th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
										기업 코드
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
								<tr
									v-for="(tenant, index) in state.tenantList.slice(
										state.listFirstElement,
										state.listLastElement
									)"
									:key="index"
								>
									<td>
										<div class="d-flex px-2 py-1">
											<div>
												<img :src="tenant.tenantLogo" class="avatar avatar-sm me-3 border-radius-lg" alt="user1" />
											</div>
											<div class="d-flex flex-column justify-content-center">
												<h6 class="mb-0 text-sm">
													{{ tenant.tenantName }}
												</h6>
												<p class="text-xs text-secondary mb-0">
													{{ tenant.tenantId }}
												</p>
											</div>
										</div>
									</td>
									<td>
										<p class="text-xs font-weight-bold mb-0">
											{{ tenant.tenantOwner }}
										</p>
										<p class="text-xs text-secondary mb-0">
											{{ tenant.companyCode }}
										</p>
									</td>
									<td class="align-middle text-center text-sm">
										<span class="badge badge-sm bg-gradient-success">{{
											tenant.tenantStatus
										}}</span>
									</td>
									<td class="align-middle text-center">
										<span class="text-secondary text-xs font-weight-bold">{{
											tenant.createdAt
										}}</span>
									</td>
									<td class="align-middle">
										<a
											href="javascript:;"
											class="text-secondary font-weight-bold text-xs"
											data-toggle="tooltip"
											@click="clickDetailPop(tenant)"
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
	<div class="pagination_container">
		<Pagination
			:value="state.currentPage"
			:total-page-count="state.totalPageCount"
			:page-display-count="state.pageDisplayCount"
			:set-page="setPage"
		/>
	</div>
	<ModalContainer v-if="state.showCreatePop || state.showDetailPop == true" :is-modal="true" show="true">
		<CreateTenantPop v-if="state.showCreatePop == true" :setshow="setCreatePopShow" :setitems="setitems" />
		<TenantDetailPop
			v-if="state.showDetailPop == true"
			:item="state.selectedTenant"
			:setshow="setDetailPopshow"
			:setitems="setitems"
		/>
	</ModalContainer>
</template>

<script>
import { reactive, watch } from "vue";
import MaterialButton from "../../components/MaterialButton.vue";
import { getTenants } from "../../apis/tenantApis";
import Pagination from "../components/custom/Pagination.vue";
import ModalContainer from "../components/custom/common/ModalContainer.vue";
import CreateTenantPop from "./CreateTenantPop.vue";
import TenantDetailPop from "./TenantDetailPop.vue";

export default {
  components: {
    TenantDetailPop,
    MaterialButton,
    CreateTenantPop,
    Pagination,
    ModalContainer
},

  setup() {
    const state = reactive({
      tenantList: [],
      selectedTenant: {},
      showCreatePop: false,
      showDetailPop: false,
      currentPage: 1,  // 현재 선택된 페이지 
      totalPageCount: '', //페이지 리스트 갯수  
      pageDisplayCount: 5, //한번에 보여줄 페이지 버튼 수 
      pageItems: 1, // 한페이지에 보여줄 아이템 수 
      listFirstElement: '',
      listLastElement: '',
    })
    const pageing = () => {
      state.listFirstElement =
        state.currentPage * state.pageItems - state.pageItems;
      state.listLastElement = state.currentPage * state.pageItems;
    };
    pageing();

    const setPage = (setPageNumber) => {
      state.currentPage = setPageNumber;
      state.showDetailPop = false;
      state.showCreatePop = false;
    };

    watch(
      () => state.currentPage,
      () => {
        pageing();
      }
    );

    const setitems = () => {
      getTenants({ limit: 1000 }).then((data) => {
        state.tenantList = data.data.data;
        state.totalPageCount = Math.ceil(Object.keys(state.tenantList).length / state.pageItems);
      });
    }

    setitems()

    const clickDetailPop = (tenant) => {
      if (state.showDetailPop == false) {
        state.showDetailPop = true;
        state.showCreatePop = false;
        state.selectedTenant = tenant;
      } else {
        if (state.selectedTenant == tenant) {
          state.showDetailPop = false;
        }
        state.selectedTenant = tenant;
      }
    };

    const clickCreatePop = () => {
      state.showCreatePop = true;
      state.showDetailPop = false;
    };

    const setCreatePopShow = (newstate) => {
      state.showCreatePop = newstate;
      state.showDetailPop = false;

    };
    const setDetailPopshow = (newstate) => {
      state.showDetailPop = newstate;
      state.showCreatePop = false;
    };

    return {
      clickCreatePop,
      clickDetailPop,
      state,
      pageing,
      setPage,
      setitems,
      setCreatePopShow,
      setDetailPopshow,
    };
  },
};
</script>
<style scoped>

.create_tenant_button {
  position: absolute;
  width: 200px;
  height: 100px;
  z-index: 2;
  right: 2%;
  top: 20%;
}

.pagination_container {
  z-index: 2;
  bottom: 1%;
  display: flex;
  justify-content: center;
}
</style>
