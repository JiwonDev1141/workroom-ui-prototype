<template>
	<PopupBasic :set-show="setshow" title="서비스 생성">
		<form
			ref="formData"
			role="form"
			style="display: flex; flex-direction: column; width: 100%"
			@submit.prevent="submitService"
		>
			<div class="service_img" style="border: solid 1px black;">
				<MaterialAvatar class="service_img" img="/img/jejuhanyeo_logo.png" />
			</div>
			<div class="input_area">
				<span>서비스 이름</span>
				<MaterialInput
					id="serviceName"
					:class="[{ 'input_button': state.inputError == 'category' }]"
					:is-required="true"
					type="text"
					placeholder="Service Name"
					:minlength="4"
					:maxlength="10"
				/>
			</div>
  
			<div class="input_area">
				<span>서비스 코드</span>
				<MaterialInput
					id="serviceCode"
					:class="[{ 'input_button': state.inputError == 'category' }]"
					type="text"
					placeholder="Service Code"
					:minlength="4"
					:maxlength="10"
				/>
			</div>
  
			<div class="input_area">
				<span class="span_range">심박수 범위</span>
				<div class="input_heartRate_container">
					<label for="warningMax">경고 최댓값</label>
					<input id="warningMax" class="input_rate" type="number" @input="numberMaxLength">
  
					<label for="warningMin">경고 최저값</label>
					<input id="warningMin" class="input_rate" type="number" @input="numberMaxLength">
				</div>
				<div class="input_heartRate_container">
					<label for="normalMax">정상 최댓값</label>
					<input id="normalMax" class="input_rate" type="number" @input="numberMaxLength">
  
					<label for="normalMin">정상 최저값</label>
					<input id="normalMin" class="input_rate" type="number" @input="numberMaxLength">
				</div>
			</div>
  
			<div class="input_area">
				<span class="span_range">산소포화도 범위</span>
				<div class="input_heartRate_container">
					<label for="ox_warningMax">경고 최댓값</label>
					<input id="ox_warningMax" class="input_rate" type="number" @input="numberMaxLength">
  
					<label for="ox_warningMin">경고 최저값</label>
					<input id="ox_warningMin" class="input_rate" type="number" @input="numberMaxLength">
				</div>
				<div class="input_heartRate_container">
					<label for="ox_normalMax">정상 최댓값</label>
					<input id="ox_normalMax" class="input_rate" type="number" @input="numberMaxLength">
  
					<label for="ox_normalMin">정상 최소값</label>
					<input id="ox_normalMin" class="input_rate" type="number" @input="numberMaxLength">
				</div>
			</div>
				
  
				
			<div class="input_area service_list">
				<span>관리 범위</span>
				<div style="display: flex;">
					<MaterialInput
						id="serviceArea"
						:class="['area_input', { 'input_button': state.inputError == 'category' }]"
						:is-required="true"
						type="text"
						placeholder="Service Area"
						:minlength="4"
						:maxlength="10"
					/>
					<button type="button" class="area_button" @click="addArea()">
						추가
					</button>
				</div>
				<div class="area_list">
					<div v-for=" (area, index) in state.areaList" :key="index" class="areas">
						<div class="area_content">
							{{ area }}
						</div>
						<div class="area_delete_icon" @click="deleteArea(index)">
							<i class="material-icons">clear</i>
						</div>
					</div>
				</div>
			</div>
  
			<div class="input_area service_list">
				<span>관리 등급</span>
				<div style="display: flex;">
					<MaterialInput
						id="serviceGrade"
						:class="['area_input', { 'input_button': state.inputError == 'category' }]"
						:is-required="true"
						type="text"
						placeholder="Service Grade"
						:minlength="4"
						:maxlength="10"
					/>
					<button type="button" class="area_button" @click="addGrade">
						추가
					</button>
				</div>
				<div class="area_list">
					<div v-for=" (grade, index) in state.gradeList" :key="index" class="areas">
						<div class="area_content">
							{{ grade }}
						</div>
						<div class="area_delete_icon" @click="deleteGrade(index)">
							X
						</div>
					</div>
				</div>
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
	<ModalContainer v-if="state.showCheckPop ==true" :is-modal="true" show="true">
		<CheckPop :handle-select="setState" />
	</ModalContainer>
</template>
  
  <script>
  import { reactive, ref, } from 'vue';
  import MaterialInput from "../../components/MaterialInput.vue";
  import MaterialButton from "../../components/MaterialButton.vue";
  import MaterialAvatar from "../../components/MaterialAvatar.vue";
  import CheckPop from "../components/custom/CheckPop.vue";
  import { createService } from "../../apis/settingApi";
  import PopupBasic from '../components/custom/common/PopupBasic.vue';
  import ModalContainer from '../components/custom/common/ModalContainer.vue';

  export default {
	components: { MaterialAvatar, MaterialInput, MaterialButton, CheckPop, ModalContainer, PopupBasic },
	props: {
	  settingList: Object,
	  setshow: Function,
	  setitems: Function,
	},
	setup(props) {
	  const state = reactive({
		showCheckPop: false,
		selectedButton: false,
		areaList: [],
		gradeList: [],
	  });
	  const addArea = () => {
		if (formData.value.serviceArea.value == "") {
		  console.log("값을 입력하세요")
		} else if (!state.areaList.includes(formData.value.serviceArea.value)) {
		  state.areaList.push(formData.value.serviceArea.value)
		  formData.value.serviceArea.value = "";
		} else {
		  console.log(`${formData.value.serviceArea.value}은 이미있는값`)
		}
	  }
	  const deleteArea = (index) => {
		state.areaList.splice(index, 1)
	  }
	  const addGrade = () => {
		if (formData.value.serviceGrade.value == "") {
		  console.log("값을 입력하세요")
		} else if (!state.gradeList.includes(formData.value.serviceGrade.value)) {
		  state.gradeList.push(formData.value.serviceGrade.value)
		  formData.value.serviceGrade.value = "";
		} else {
		  console.log(`${formData.value.serviceGrade.value}은 이미있는값`)
		}
	  }
	  const deleteGrade = (index) => {
		state.gradeList.splice(index, 1)
	  }
	  const numberMaxLength = (e) => {
		if (e.target.value.length > 3) {
		  e.target.value = e.target.value.slice(0, 3);
		}
		console.log(e.target.value.length)
	  }
	  const setState = (newstate) => {
		state.selectedButton = newstate;
		state.showCheckPop = false;
		if (state.selectedButton == true) {
		  submitService()
		}
	  }
	  const formData = ref();
	  const submitService = () => {
		state.showCheckPop = true;
		if (state.selectedButton == true) {
		  createService("6438a8a7870e6d054b730047", {
			// settingCategory: formData.value.settingCategory.value,
			datas: [{
			  serviceName: formData.value.serviceName.value,
			  serviceCode: formData.value.serviceCode.value,
			  datas: [
				{
				  diverGrade: state.gradeList
				},
				{
				  diverArea: state.areaList
				},
				{
				  deviceCategory: [
					{ deviceName: "watch", code: "a001" },
					{ deviceName: "gateway", code: "a002" }
				  ]
				},
				{
				  heartRate: {
					경고최대값: formData.value.warningMax.value,
					경고최소값: formData.value.warningMin.value,
					정상최대값: formData.value.normalMax.value,
					정상최소값: formData.value.normalMin.value,
				  }
				},
				{
				  oxygen: {
					경고최대값: formData.value.ox_warningMax.value,
					경고최소값: formData.value.ox_warningMin.value,
					정상최대값: formData.value.ox_normalMax.value,
					정상최소값: formData.value.ox_normalMin.value,
				  }
				}
			  ]
			}]
		  }).then(() => {
			props.setshow(false);
			props.setitems();
		  })
		}
	  }
	  return {
		submitService,
		state,
		formData,
		addArea,
		deleteArea,
		addGrade,
		deleteGrade,
		numberMaxLength,
		setState,
	  }
	},
  };
  </script>,
	  ModalComponent
  <style scoped>
  .delete_button {
	margin-top: 50px;
  }
  
  .input_area {
	margin: 10px 0px;
  }
  
/*   
  .create_service_container {
	display: flex;
	border: solid 1px black;
  }
  
  .create_service_left {
	border: solid 1px black;
	width: 100%;
	padding: 10px;
	height: 600px;
  }
  
  .create_service_right {
	border: solid 1px black;
	width: 50%;
	padding: 10px;
  }
   */
  .input_rate {
	width: 20%;
	margin: 2px 5px;
	border-radius: 5px;
	border: solid 1px rgba(0, 0, 0, 0.2);
	outline: none;
  }
  
  .input_rate:focus {
	font-size: 15px;
	border-color: #4caf50 !important;
	box-shadow: inset 1px 0 #4caf50, inset -1px 0 #4caf50, inset 0 -1px #4caf50, inset 1px 0 #4caf50;
  }
  
  .input_heartRate_container {
	margin: 5px 0px;
	padding: 2px;
  }
  
  .span_range {
	display: inline-block;
	margin: 5px 0px;
	font-size: 18px;
	color: black;
  }
  
  .service_list {
	height: 200px;
  }
  
  .service_img {
	width: 130px;
	height: 130px;
  }
  
  .area_list {
	margin-top: 10px;
	width: 100%;
	border: solid 1px black;
	height: 70%;
	display: flex;
	flex-wrap: wrap;
	overflow-x: hidden;
  }
  
  .area_input {
	width: 50%;
  }
  
  .area_button {
	margin: 0px 10px;
	width: 15%;
	border-radius: 10px;
  }
  
  .areas {
	border: solid 1px black;
	width: 27%;
	margin: 5px 10px;
	height: 20%;
	display: flex;
  }
  
  .area_content {
	width: 75%;
	display: flex;
	justify-content: center;
	align-items: center;
  }
  
  .area_delete_icon {
	border: solid 1px black;
	width: 25%;
	display: flex;
	justify-content: center;
	align-items: center;
  }
  </style>