<template>
	<div class="Dbg">
		<div class="container-fluid py-4">
			<div class="row">
				<div class="col-12">
					<div class="card my-4">
						<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
							<div class="createDeviceButton">
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
							<div class="bg-gradient-info shadow-success border-radius-lg pt-4 pb-3">
								<h6 class="text-white text-capitalize ps-3">
									디바이스 목록
								</h6>
							</div>
						</div>
						<div class="card-body px-0 pb-2">
							<div class="table-responsive p-0">
								<table class="table align-items-center mb-0">
									<thead>
										<tr>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												기기식별번호
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												전화번호
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												유형
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												기업 코드
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												기업명
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												서비스 코드
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												서비스명
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												사용자 ID
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												사용자 이름
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												생성일
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												수정일
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												상태
											</th>
											<th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
												상세보기
											</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="(item, i) in state.items.slice(state.listFirstElement, state.listLastElement)" :key="i">
											<td class="align-middle">
												<p class="text-xs font-weight-bold mb-0">
													{{ item.deviceId }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.deviceNumber }}
												</p>
											</td>
											<td class="align-middle text-center text-sm">
												<span class="badge badge-sm bg-gradient-success">
													{{ item.deviceType }}
												</span>
											</td>
											<td class="align-middle">
												<p class="text-xs font-weight-bold mb-0">
													{{ item.companyCode }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.companyName }}
												</p>
											</td>
											<td class="align-middle">
												<p class="text-xs font-weight-bold mb-0">
													{{ item.serviceCode }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.serviceName }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.userId }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.userName }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.createdAt }}
												</p>
											</td>
											<td>
												<p class="text-xs font-weight-bold mb-0">
													{{ item.updatedAt }}
												</p>
											</td>
											<td class="align-middle text-center text-sm">
												<span v-if="item.deviceStatusCode" class="badge badge-sm bg-gradient-success"> 사용중 </span>
												<span v-if="!item.deviceStatusCode" class="badge badge-sm bg-gradient-secondary"> 미사용중 </span>
											</td>
											<td>
												<span class="badge badge-sm bg-gradient-success" style="cursor: pointer" @click="clickDetailPop(item)"> 상세보기 </span>
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
				<Pagination :value="state.currentPage" :total-page-count="state.totalPageCount" :page-display-count="state.pageDisplayCount" :set-page="setPage" />
			</div>
		</div>
		<div class="MD">
			<DeviceDetailPop v-if="state.detailPop == true" :close-detaile-pop="closeDetailePop" :device-info="state.deviceInfo" />
			<CreateDevicePop v-if="state.createPop == true" :close-create-pop="closeCreatePop" />
		</div>
	</div>
</template>

<script>
import { reactive, watch } from 'vue';
import { getDevices } from '../../apis/deviceApis';
import MaterialButton from '../../components/MaterialButton.vue';
import CreateDevicePop from './CreateDevicePop.vue';
import DeviceDetailPop from './DeviceDetailPop.vue';
import Pagination from './Pagination.vue';
// import Button from '../../components/custom/Button.vue';

export default {
    name: 'Devices',
    components: {
        CreateDevicePop,
        MaterialButton,
        DeviceDetailPop,
        Pagination,
        // Button,
    },
    data() {
        return {};
    },
    setup() {
        const state = reactive({
            detailPop: false,
            items: [],
            createPop: false,
            deviceInfo: '',
            currentPage: 1, // 현재 선택된 페이지
            totalPageCount: '', // 페이지 리스트 갯수
            pageDisplayCount: 5, // 한번에 보여줄 페이지 버튼 수
            pageItems: 10, // 한페이지에 보여줄 아이템 수
            listFirstElement: '',
            listLastElement: '',
        });

        const paging = () => {
            state.listFirstElement = state.currentPage * state.pageItems - state.pageItems;
            state.listLastElement = state.currentPage * state.pageItems;
            console.log(`state.listFirstElement 확인 : ${state.listFirstElement}`);
            console.log(`state.listLastElement 확인 : ${state.listLastElement}`);
        };

        const setPage = (setPageNumber) => {
            state.currentPage = setPageNumber;
            state.detailPop = false;
            state.createPop = false;
        };

        const setItems = () => {
            getDevices({ limit: 1000 }).then((data) => {
                state.items = data.data.data;
                state.totalPageCount = Math.ceil(Object.keys(state.items).length / state.pageItems);
            });
        };

        const clickCreatePop = () => {
            state.createPop = true;
        };

        const closeCreatePop = () => {
            state.createPop = false;
            getDevices().then((data) => {
                state.items = data.data.data;
            });
        };

        const clickDetailPop = (deviceInfo) => {
            state.detailPop = true;
            state.deviceInfo = deviceInfo;
        };

        const closeDetailePop = () => {
            state.detailPop = false;
            getDevices().then((data) => {
                state.items = data.data.data;
            });
        };

        paging();
        setItems();

        watch(
            () => state.currentPage,
            () => {
                paging();
            }
        );

        return {
            state,
            clickCreatePop,
            closeCreatePop,
            clickDetailPop,
            closeDetailePop,
            pageing: paging,
            setPage,
            setItems,
        };
    },

    mounted() {},

    created() {
        getDevices().then((data) => {
            console.log('데이터 확인0 : ', data);
            this.state.items = data.data.data;
        });
    },
    // methods: {},
};
</script>

<style scoped>
.Dbg {
    height: 90vh;
    display: flex;
    position: relative;
}

.createDeviceButton {
    position: absolute;
    width: 200px;
    height: 100px;
    z-index: 2;
    right: 2%;
    top: 20%;
}

.pagination_container {
    position: absolute;
    z-index: 2;
    left: 34%;
    bottom: 1%;
}
.MD {
    position: absolute;
    left: 38.5%;
    z-index: 2;
}
</style>
