<template>
	<PopupBasic title="테넌트 수정" :set-show="setshow">
		<div style="width: 56px; position: relative;  left: 300px; z-index: 2">
			<MaterialButton
				:name="state.editButtonid"
				full-width="false"
				form="state.formid"
				variant="gradient"
				:text="state.editBtnText"
				size="sm"
				color="dark"
				@click="toggleEditMode(state, props.item._id)"
			/>
		</div>
		
		<form
			ref="formData"
			style="display: flex; flex-direction: column; width: 100%"
			@submit.prevent="submitEditTenant, submitDeleteTenant(props.item._id)"
		>
			<MaterialAvatar :img="props.item.tenantLogo" />
			<div class="input_area">
				<span>테넌트 이름
				</span>
				<MaterialInput
					name="tenantName"
					type="text"
					:disabled="!state.isEditMode"
					:value="props.item.tenantName"
					:minlength="4"
					:maxlength="10"
				/>
			</div>

			<div class="input_area">
				<span>테넌트 ID</span>
				<MaterialInput
					name="tenantId"
					type="username"
					:disabled="!state.isEditMode"
					:value="props.item.tenantId"
					:minlength="4"
					:maxlength="10"
				/>
			</div>
			<div class="input_area">
				<span>기업정보</span>
				
				<selectBox
					:class="[{ 'input_buttom': state.inputError == 'name' }]"
					name="companyName"
					:disabled="!state.isEditMode"
					:initial-value="props.item.companyName"
					:value="state.companyName"
					:textvalue="state.companyName"
					@input="search($event.target.value)"
				/>
			</div>

			<div class="input_area">
				<span>기업 코드 </span>
				<MaterialInput
					:value="props.item.companyCode"
					name="companyCode"
					type="username"
					:placeholder="props.item.companyCode"
					:disabled="true"
				/>
			</div>

			<div class="input_area" style="display: flex; justify-content: space-between; margin: 10px 0px;">
				<span>테넌트 상태</span>
				<MaterialSwitch
					name="tenantStatus"
					:checked="state.handleStatusChecked"
					:disabled="!state.isEditMode"
					@click="change"
				/>
			</div>

			<div class="input_area">
				<span>테넌트 타입</span>
				<br>
				<selectBox
					name="tenantType"
					:value="['P', 'O']"
					:textvalue="['Public', 'On-Prem']"
					:초기값="props.item.tenantType"
					:disabled="!state.isEditMode"
				/>
			</div>
			<MaterialButton
				class="delete_button"
				full-width="false"
				variant="gradient"
				text="삭제"
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

import { reactive, ref, watch } from "vue";
import MaterialInput from "../../components/MaterialInput.vue";
import MaterialButton from "../../components/MaterialButton.vue";
import { deleteTenant, editTenant } from "../../apis/tenantApis";
import MaterialAvatar from "../../components/MaterialAvatar.vue";
import selectBox from "../components/custom/SelectBox.vue";
import CheckPop from "../components/custom/CheckPop.vue";
import MaterialSwitch from "../../components/MaterialSwitch.vue";
import PopupBasic from "../components/custom/common/PopupBasic.vue";
import ModalContainer from "../components/custom/common/ModalContainer.vue";
import companyInfo from "./companyInfo.json";

// 유저 상세 / 수정 팝업
export default {
    name: "TenantDetail",
    components: { MaterialAvatar, MaterialInput, MaterialButton, selectBox, CheckPop, MaterialSwitch, ModalContainer, PopupBasic, },
    props: {
        item: Object,
        setshow: Function,
        setitems: Function,
    },
    methods: {
    },
    setup(props) {
        const state = reactive({
            isEditMode: false,
            editBtnText: "수정",
            editButtonid: 'edit',
            companyInfo,
            newCompanyInfo: [],
            companyCode: "",
            companyName: "",
            selectedButton: false, //확인 팝업에서 누른 버튼 
            showCheckPop: false,
            submitStatus: '',
            handleStatusChecked: false,
        });


        const handleStatusChecked = () => {
            if (props.item.tenantStatus == 'OFF') {
                state.handleStatusChecked = false;
            } else {
                state.handleStatusChecked = true;
            }
        }
        watch(() => props.item.tenantStatus, () => {
            handleStatusChecked()
        })
        handleStatusChecked()

        const change = () => {
            if (state.isEditMode == true) {
                state.handleStatusChecked = !state.handleStatusChecked
            }
        }

        const itemfiter = () => {
            state.companyName = state.companyInfo.map(row => row.companyName);
        }
        itemfiter()

        const search = (searchKey) => {
            const searchCompanyInfo = state.companyInfo.filter((a) => {
                return a.companyName.match(new RegExp(searchKey, "i"));
            });
            state.newCompanyInfo = searchCompanyInfo;
            state.companyCode = state.newCompanyInfo[0].companyCode;
        }

        const formData = ref();

        const toggleEditMode = () => {
            if (state.editButtonid == 'edit') {
                state.isEditMode = true;
                state.editBtnText = "저장";
                state.editButtonid = 'save';
            } else {
                submitEditTenant();
            }
        }
        const submitDeleteTenant = (docId) => {
            state.showCheckPop = true;
            state.submitStatus = "Delete"
            if (state.selectedButton == true) {
                deleteTenant(docId).then(() => {
                    props.setshow(false);
                    props.setitems();
                });
            }
        }

        const submitEditTenant = () => {
            state.showCheckPop = true;
            state.submitStatus = "Edit"
            if (state.selectedButton == true) {
                editTenant(props.item._id, {
                    tenantName: formData.value.tenantName.value == "" ? props.item.tenantName : formData.value.tenantName.value,
                    tenantId: formData.value.tenantId.value == "" ? props.item.tenantId : formData.value.tenantId.value,
                    companyName: formData.value.companyName.value == "" ? props.item.companyName : formData.value.companyName.value,
                    companyCode: formData.value.companyCode.value,
                    tenantStatus: state.handleStatusChecked == false ? 'OFF' : 'ON',
                    tenantType: formData.value.tenantType.value,
                    // tenantLogo: formData.value.tenantLogo.value,
                }).then(() => {
                    props.setshow(false);
                    props.setitems();
                })
            }
        }
        const setState = (newstate) => {
            state.selectedButton = newstate;
            state.showCheckPop = false;
            if (state.selectedButton == true) {
                if (state.submitStatus == "Delete") {
                    submitDeleteTenant(props.item._id)
                } if (state.submitStatus == "Edit") {
                    submitEditTenant()
                }
            }
        }

        return {
            toggleEditMode,
            state,
            submitEditTenant,
            submitDeleteTenant,
            formData,
            search,
            setState,
            change,
            handleStatusChecked,
            props,
        };
    },
};
</script>
<style scoped>
input:disabled {
    cursor: not-allowed;
}

.delete_button {
    margin-top: 50px;
}

.input_area {
    margin: 5px 0 5px 0;
}

</style>
