<template>
	<div class="row">
		<div class="col-12">
			<div class="card my-4">
				<div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
					<div
						class="bg-gradient-success shadow-success border-radius-lg pt-4 pb-3"
					>
						<h6 class="text-white text-capitalize ps-3">
							{{ props.tableTitle }}
						</h6>
					</div>
				</div>
				<div class="card-body px-0 pb-2">
					<div class="table-responsive p-0">
						<table class="table align-items-center mb-0">
							<thead>
								<tr>
									<!-- <th
										class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
									>
										아이디
									</th>
									<th
										class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
									>
										휴대전화번호
									</th>
									<th
										class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
									>
										SMS 수신 여부
									</th>
									<th
										class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
									>
										수정일
									</th> -->
									<th v-for="(data, index) in props.data" :key="index" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
										{{ data.columnName }}
									</th>
									<th class="text-secondary opacity-7"></th>
								</tr>
							</thead>

							<tbody>
								<tr>
									<td v-for="(data, index) in props.data" :key="index">
										<div v-if="data.type === 2" class="d-flex py-1">
											<div>
												<img
													:src="data.imgSrc"
													class="avatar avatar-sm me-3 border-radius-lg mx-2"
													alt="user1"
												/>
											</div>
											<div class="">
												<h6 class="mb-0 text-sm">
													{{ data.text }}
												</h6>
												<p class="text-xs text-secondary mb-0">
													{{ data.description }}
												</p>
											</div>
										</div>
                    
										<div v-if="data.type === 1" class="d-flex py-1">
											<div class="">
												<h6 class="mb-0 text-sm">
													{{ data.text }}
												</h6>
												<p class="text-xs text-secondary mb-0">
													{{ data.description }}
												</p>
											</div>
										</div>

										<div v-if="data.type === 3" class="d-flex py-1" style="padding-left: 16px">
											<div class="">
												<span
													class="badge badge-sm"
													:class="'bg-gradient-'+ data.status"
												>{{ data.text }}</span>
											</div>
										</div>

										<div v-if="data.type=== 0" class="d-flex py-1">
											<div class="">
												<h6 class="mb-0 text-sm">
													{{ data.text }}
												</h6>
											</div>
										</div>
									</td>
								

					
								
								
									<td class="align-middle">
										<a
											href="javascript:;"
											class="text-secondary font-weight-bold text-xs"
											data-toggle="tooltip"
											data-original-title="Edit user"
											@click="setShowDetailPop"
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
</template>
<script>
export default {
  props: {
    showDetailPop: Boolean,
    setShowDetailPop: Function,
	tableTitle: String,
    data: {
      type: Array,
      // type 0: value 하나만 표현
      // type 1: value와 description을 표현
      // type 2: image와 value와 description을 표현
      // type 3: Boolean (status)와 text를 배지 형태로 표현
      default: () => [
        {
          columnName: "아이디",
          text: '2b9ca54e2db89315',
          description: 'john@creative-tim.com',
          imgSrc: "@/assets/img/team-2.jpg",
          type: 2,
        },
        {
          columnName: "휴대전화번호",
          text: '010-2180-1691',
          description: 'Organization',
          type: 1,
        },
        {
          columnName: "SMS 수신 여부",
          text: 'online',
          status: 'success',
          type: 3,
        },
        {
          columnName: "수정일",
          text: '2022-10-05 11:58:46',
          type: 0,
        },
      ],
    }
  },
  setup(props) {
    return {
      props,
    };
  },
  computed: {
    cssVars() {
      return {
        "--zindex": this.zIndex,
      };
    },
  },
};
</script>

<style scoped></style>
