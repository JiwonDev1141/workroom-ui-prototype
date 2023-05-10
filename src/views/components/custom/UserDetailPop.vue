<template>
	<PopupBasic :show="props.show" :set-show="props.setShow" title="User Detail">
		<div>
			<form style="display: flex; flex-direction: column; width: 100%">
				<MaterialAvatar img="/img/team-2.90c40d0c.jpg" />
				<div class="input-area">
					<span>이메일</span>
					<MaterialInput
						type="email"
						:disabled="!state.isEditMode"
						:placeholder="email"
					/>
				</div>

				<div class="input-area">
					<span>사용자 이름</span>
					<MaterialInput
						type="username"
						:disabled="!state.isEditMode"
						:placeholder="username"
					/>
				</div>

				<div class="input-area">
					<span>계정 활성화 여부</span>
					<MaterialSwitch />
				</div>

				<div class="input-area">
					<span>사용 기기</span>
					<MaterialInput
						type="text"
						:disabled="!state.isEditMode"
						placeholder="Phone 1"
					/>
				</div>

				<span>회원 유형 </span>
				<div class="input-area">
					<select id="userType">
						<option value="dog">
							현장 관리자 (sysadmin)
						</option>
						<option value="cat">
							지역 담당자 (supervisor)
						</option>
						<option value="hamster">
							서비스 제공자 (manager)
						</option>
						<option value="parrot">
							플랫폼 운영자 (member)
						</option>
					</select>
				</div>

				<!-- <MaterialPagination size="lg" >
                      <MaterialPaginationItem label="현장 관리자" />
                      <MaterialPaginationItem  />
                      <MaterialPaginationItem />
                      <MaterialPaginationItem />
  
  
                  </MaterialPagination> -->

				<div class="input-area">
					<span>전화번호</span>
					<MaterialInput
						placeholder="010-0000-0000"
						:disabled="!state.isEditMode"
					/>
				</div>

				<div class="input-area">
					<span>소속 회사</span>
					<MaterialInput
						placeholder="녹원정보기술"
						:disabled="!state.isEditMode"
					/>
				</div>

				<div>
					<InvoiceCard
						title="소속 그룹"
						button-text="추가"
						:list="state.groupList"
					></InvoiceCard>
					<PaymentCard
						title="서비스"
						button-text="추가"
						:list="state.serviceList"
					/>
				</div>
				<material-button
					class="my-4 mb-2"
					variant="gradient"
					color="success"
					full-width
				>
					수정
				</material-button>
			</form>
		</div>
	</PopupBasic>
</template>

<script>
//   import { ref } from "vue";
import { reactive , watch } from "vue";
import MaterialAvatar from "../../../components/MaterialAvatar.vue";
import MaterialInput from "../../../components/MaterialInput.vue";
// import MaterialCheckbox from "../../components/MaterialCheckbox.vue"
// import MaterialRadio from "../../components/MaterialRadio.vue";
import MaterialSwitch from "../../../components/MaterialSwitch.vue";
// import MaterialPagination from "../../components/MaterialPagination.vue";
// import MaterialPaginationItem from "../../components/MaterialPaginationItem.vue"
import MaterialButton from "../../../components/MaterialButton.vue";
import InvoiceCard from "../InvoiceCard.vue";
import PaymentCard from "../PaymentCard.vue";
import { getUser } from "../../../apis/userApis";
import PopupBasic from "./common/PopupBasic.vue";
// 유저 상세 / 수정 팝업
export default {
  name: "UserDetail",
  components: {
    MaterialAvatar,
    MaterialInput,
    MaterialSwitch,
    MaterialButton,
    InvoiceCard,
    PaymentCard,
    PopupBasic,
  },
  props: {
    show: Boolean,
    setShow: Function,
    email: String,
    username: String,
    userId: String,
    profileImg: String,
  },
  setup(props) {
    const state = reactive({
      groupList: [
        {
          name: "플랫폼사업팀",
          description:
            "플랫폼사업팀은 DigitalTwin 시스템의 3D Web 시각화 및 플랫폼 Engineering 영역에 필요한 인프라 구축, 서비스 개발, 데이터 분석 관련 업무를 담당...",
        },
        {
          name: "클라이언트 팀",
          description: "...",
        },
      ],
      serviceList: [
        {
          name: "제주 해녀",
          imgSrc: "/img/jejuhanyeo_logo.png",
          description:
            "플랫폼사업팀은 DigitalTwin 시스템의 3D Web 시각화 및 플랫폼 Engineering 영역에 필요한 인프라 구축, 서비스 개발, 데이터 분석 관련 업무를 담당...",
        },
        {
          name: "미르 메타케어",
          imgSrc: "/img/mirmetacare_logo.png",
          description: "...",
        },
      ],
      isEditMode: false,
      editBtnText: "수정",
    });
    watch(
      () => props.show,
      () => {
        console.log(props);
        state.show = true;
        // your code
      },
      { deep: true }
    );
    const getUserInfo = () => {
      // id로 유저 찾기
      getUser().then((data) => {
        console.log(data);
      });
    };
    const closePop = () => {
      // const userDetailPop = ref("userDetailPop");
      console.log(props);
      props.setShow(false);
      // console.log(userDetailPop)
    };
    const toggleEditMode = () => {
      state.isEditMode = !state.isEditMode;
      state.editBtnText = state.isEditMode ? "저장" : "수정";
    };
    const handleEditBtn = () => {
      if (state.isEditMode) {
        // 수정 모드일 경우 form submit으로 데이터 서버에 전송
        return;
      }
      return;
    };
    return {
      getUserInfo,
      closePop,
      toggleEditMode,
      handleEditBtn,
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