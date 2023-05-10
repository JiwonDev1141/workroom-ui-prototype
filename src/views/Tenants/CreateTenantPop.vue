<template>
	<PopupBasic :set-show="setshow" title="테넌트 생성">
		<form
			ref="formData"
			role="form"
			style="display: flex; flex-direction: column; width: 100%"
			@submit.prevent="submitTenant"
		>			
			<div class="input_area">
				<span>테넌트 이름</span>
				<MaterialInput
					:class="[{ 'input_button': state.inputError == 'category' }]"
					:is-required="true"
					name="tenantName"
					type="text"
					placeholder="Tenant Name"
					:minlength="4"
					:maxlength="10"
				/>
			</div>

			<div class="input_area">
				<span>테넌트 코드</span>
				<MaterialInput
					:class="[{ 'input_button': state.inputError == 'category' }]"
					name="tenantId"
					type="username"
					placeholder="Tenant Id"
					:minlength="4"
					:maxlength="10"
				/>
			</div>

			<div class="input_area">
				<span>기업정보 </span>
				<selectBox
					:class="[{ 'input_button': state.inputError == 'name' }]"
					name="companyName"
					:input-value="state.conpanyName"
					:output-value="state.conpanyName"					
					@input="search($event.target.value)"
				/>
			</div>

			<div class="input_area">
				<span>기업 코드</span>
				<MaterialInput
					:value="state.conpanyCode"
					name="companyCode"
					type="username"
					placeholder="Company Code"
					:disabled="true"
				/>
			</div>

			<div class="input_area" style="display: flex; justify-content: space-between; margin: 10px 0px;">
				<span>테넌트 상태</span>
				<MaterialSwitch name="tenantStatus" :checked="handleStatusChecked" @click="change" />
			</div>

			<div class="input_area">
				<span>테넌트 타입</span>
				<selectBox
					:class="[{ 'input_button': state.inputError == 'type' }]"
					name="tenantType"
					:output-value="['P', 'O']"
					:input-value="['Public', 'On-Prem']"
				/>
			</div>

			<MaterialButton
				class="delete_button"
				full-width="false"
				variant="gradient"
				text="추가"
				size="sm"
				color="dark"				
			/>
		</form>
	</PopupBasic>
	
	<ModalContainer v-if="state.showCheckPop == true" :is-modal="true" show="true">
		<CheckPop :handle-select="setState" />
	</ModalContainer>
</template>

<script>
import { reactive, ref } from 'vue';
import MaterialInput from "../../components/MaterialInput.vue";
import MaterialButton from "../../components/MaterialButton.vue";
import { postCreateTenant } from "../../apis/tenantApis";
import selectBox from "../components/custom/SelectBox.vue";
import toast from "../../utils/setToast"
import CheckPop from "../components/custom/CheckPop.vue";
import MaterialSwitch from "../../components/MaterialSwitch.vue";
import PopupBasic from '../components/custom/common/PopupBasic.vue';
import ModalContainer from '../components/custom/common/ModalContainer.vue';
import companyInfo from "./companyInfo.json"


export default {
  name: "TenantDetail",
  components: { MaterialInput, MaterialButton, selectBox, MaterialSwitch, PopupBasic, CheckPop, ModalContainer },
  props: {
    tenantList: Object,
    setshow: Function,
    setitems: Function,
  },

  setup(props) {
    const state = reactive({
      companyInfo,
      newcompanyInfo: [],
      conpanyCode: "",
      conpanyName: "",
      inputError: "",
      selectedCheckPopButton: false, //확인 팝업에서 누른 버튼 
      showCheckPop: false,
      defaultChecked: false,
      handleStatusChecked: false, // ON,OFF 토글 버튼 클릭 여부 
    });

    const change = () => {
      state.handleStatusChecked = !state.handleStatusChecked
    }

    const itemfiter = () => {
      state.conpanyName = state.companyInfo.map(row => row.companyName);
    }
    itemfiter()

    const search = (searchKey) => {
      const searchcompanyInfo = state.companyInfo.filter((companyInfo) => {
        return companyInfo.companyName.match(new RegExp(searchKey, "i"));
      });
      state.newcompanyInfo = searchcompanyInfo;
      state.conpanyCode = state.newcompanyInfo[0].companyCode;
    }
    const setState = (newstate) => {
      state.selectedCheckPopButton = newstate
      state.showCheckPop = false
      if (state.selectedCheckPopButton == true) {
        submitTenant()
      }
    }
    const formData = ref();

    const submitTenant = () => {
      state.showCheckPop = true;
      if (state.selectedCheckPopButton == true) {
        postCreateTenant({
          tenantName: formData.value.tenantName.value,
          tenantId: formData.value.tenantId.value,
          companyName: formData.value.companyName.value,
          companyCode: formData.value.companyCode.value,
          tenantStatus: state.handleStatusChecked == false ? 'OFF' : 'ON',
          tenantType: formData.value.tenantType.value
          // tenantOwner: e.target["tenantOwner"].value,
          // tenantLogo: e.target["tenantLogo"].value,
        }).then(() => {
          props.setshow(false);
          props.setitems();
        }).catch((error) => {
          state.showCheckPop = false;
          state.selectedCheckPopButton = false;
          if (error.code == "ERR_BAD_RESPONSE") {
            toast({ title: '오류', description: '항목을 입력해 주세요', type: 'danger' });
            state.inputError = 'category'
          }
          if (error.response.data.errors[0]?.message == "should be equal to one of the allowed values: O, P") {
            toast({ title: '오류', description: '테넌트 타입을 선택해주세요', type: 'danger' });
            state.inputError = 'type'
          } if (error.response.data.errors[0]?.message ==
            "should match pattern \"^[A-Z]{2}-[0-9]{5}$\"") {
            toast({ title: '오류', description: '기업정보를 선택해주세요', type: 'danger' });
            state.inputError = 'name'
          }
          else if (error.response.data.errors[0].message == "should be equal to one of the allowed values: ON, OFF") {
            toast({ title: '오류', description: '테넌트 상태를 선택해주세요', type: 'danger' });
            state.inputError = 'state'
          }
        }
        )
      }
    }

    return {
      toast,
      submitTenant,
      state,
      search,
      itemfiter,
      setState,
      formData,
      change,
    }
  },
};
</script>
<style scoped>
.delete_button {
  margin-top: 50px;
}

.input_area {
  margin: 5px 0 5px 0;
}


</style>
