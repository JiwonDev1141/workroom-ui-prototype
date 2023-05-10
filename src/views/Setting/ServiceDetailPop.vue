<template>
	<div id="setting_create_pop" class="setting_create_pop">
		<div style="margin-bottom: 15px">
			<button
				class="p-0 btn btn-link text-dark fixed-plugin-close-button"
				style="position: absolute; right: 390px"
				@click="setshow(false)"
			>
				<i class="material-icons">clear</i>
			</button>
			<h5 @click="itemfiter">
				서비스 정보 수정
			</h5>
		</div>

		<form
			ref="formData"
			role="form"
			style="display: flex; flex-direction: column; width: 100%"
			@submit.prevent="submitService"
		>
			<div class="create_service_container">
				<section class="create_service_left">
					<div class="service_img" style="border: solid 1px black;">
						<MaterialAvatar class="service_img" img="/img/jejuhanyeo_logo.png" />
					</div>
					<div class="input_area">
						<span>서비스 이름</span>
						<MaterialInput
							:class="[{ 'input_button': state.inputError == 'category' }]"
							:is-required="true"
							name="serviceName"
							type="text"
							placeholder="Service Name"
							:minlength="4"
							:maxlength="10"
							:value="serviceinfo.serviceName"
						/>
					</div>

					<div class=" input_area">
						<span>서비스 코드</span>
						<MaterialInput
							:class="[{ 'input_button': state.inputError == 'category' }]"
							name="serviceCode"
							type="text"
							placeholder="Service Code"
							:minlength="4"
							:maxlength="10"
							:value="serviceinfo.serviceCode"
						/>
					</div>

					<div class="input_area">
						<span class="span_range">심박수 범위</span>
						<div class="input_heartRate_container">
							<label for="warningMax">경고 최댓값</label>
							<input
								class="input_rate"
								name="warningMax"
								type="number"
								:value="serviceinfo.datas[3].heartRate.경고최대값"
								@input="numberMaxLength"
							>

							<label for="warningMin">경고 최저값</label>
							<input
								class="input_rate"
								name="warningMin"
								type="number"
								:value="serviceinfo.datas[3].heartRate.경고최소값"
								@input="numberMaxLength"
							>
						</div>
						<div class="input_heartRate_container">
							<label for="normalMax">정상 최댓값</label>
							<input
								class="input_rate"
								name="normalMax"
								type="number"
								:value="serviceinfo.datas[3].heartRate.정상최대값"
								@input="numberMaxLength"
							>

							<label for="normalMin">정상 최저값</label>
							<input
								class="input_rate"
								name="normalMin"
								type="number"
								:value="serviceinfo.datas[3].heartRate.정상최대값"
								@input="numberMaxLength"
							>
						</div>
					</div>

					<div class="input_area">
						<span class="span_range">산소포화도 범위</span>
						<div class="input_heartRate_container">
							<label for="ox_warningMax">경고 최댓값</label>
							<input
								class="input_rate"
								name="ox_warningMax"
								type="number"
								:value="serviceinfo.datas[4].oxygen.경고최대값"
								@input="numberMaxLength"
							>

							<label for="ox_warningMin">경고 최저값</label>
							<input
								class="input_rate"
								name="ox_warningMin"
								type="number"
								:value="serviceinfo.datas[4].oxygen.경고최소값"
								@input="numberMaxLength"
							>
						</div>
						<div class="input_heartRate_container">
							<label for="ox_normalMax">정상 최댓값</label>
							<input
								class="input_rate"
								name="ox_normalMax"
								type="number"
								:value="serviceinfo.datas[4].oxygen.정상최대값"
								@input="numberMaxLength"
							>

							<label for="ox_normalMin">정상 최소값</label>
							<input
								class="input_rate"
								name="ox_normalMin"
								type="number"
								:value="serviceinfo.datas[4].oxygen.정상최소값"
								@input="numberMaxLength"
							>
						</div>
					</div>
				</section>

				<section class="create_service_right">
					<div class="input_area service_list">
						<span>관리 범위</span>
						<div style="display: flex;">
							<MaterialInput
								:class="['area_input', { 'input_button': state.inputError == 'category' }]"
								:is-required="true"
								name="serviceArea"
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
								:class="['area_input', { 'input_button': state.inputError == 'category' }]"
								:is-required="true"
								name="serviceGrade"
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
				</section>
			</div>
			<MaterialButton
				class="delete_button"
				full-width="false"
				variant="gradient"
				text="수정사항 저장"
				size="sm"
				color="dark"
			/>
		</form>
	</div>
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
import { editService } from "../../apis/settingApi";
import ModalContainer from '../components/custom/common/ModalContainer.vue';
export default {
    components: { MaterialAvatar, MaterialInput, MaterialButton, CheckPop, ModalContainer },
    props: {
        settingList: Object,
        setshow: Function,
        setitems: Function,
        serviceinfo: Object,

    },
    setup(props) {
        const state = reactive({
            showCheckPop: false,
            selectedButton: false,
            areaList: [],
            areaListToObject: [],
            gradeList: [],
            gradeListToObject: [],
            serviceCode: props.serviceinfo.serviceCode
        });

    

        const gradeListToObject = () => {
            state.gradeListToObject = state.gradeList.map((garde, index) => {
                return {
                    grade: garde,
                    code: "bb" + index,
                };
            });
        }

        const areaListToObject = () => {
            state.areaListToObject = state.areaList.map((range, index) => {
                return {
                    range,
                    code: "aa" + index,
                };
            });
        }



        const objectToArray = () => {
            state.gradeList = props.serviceinfo.datas[0].grade.map(obj => obj.grade);
            state.areaList = props.serviceinfo.datas[1].managementRange.map(obj => (obj.range));
            gradeListToObject()
            areaListToObject()
        };
        objectToArray()


        const addArea = () => {
            if (formData.value.serviceArea.value == "") {
                console.log("값을 입력하세요")
            } else if (!state.areaList.includes(formData.value.serviceArea.value)) {
                state.areaList.push(formData.value.serviceArea.value)
                formData.value.serviceArea.value = "";
                areaListToObject()
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
                gradeListToObject()

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
                editService({ docId: "6438a8a7870e6d054b730047", serviceCode: state.serviceCode }, {
                    // settingCategory: formData.value.settingCategory.value,
                    datas: [{
                        serviceName: formData.value.serviceName.value,
                        serviceCode: formData.value.serviceCode.value,
                        datas: [
                            {
                                grade: state.gradeListToObject
                            },
                            {
                                managementRange: state.areaListToObject
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
            objectToArray,
            gradeListToObject,
            areaListToObject,
        }
    },
};
</script>
<style scoped>
.delete_button {
    margin-top: 50px;
}

.input_area {
    margin: 10px 0px;
}

.setting_create_pop {
    width: 1000px;
    padding: 15px 15px 40px 15px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    overflow-x: hidden;
    z-index: 0;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 10px;
    border: solid 0px;
}

.create_service_container {
    display: flex;
    border: solid 1px black;
}

.create_service_left {
    border: solid 1px black;
    width: 50%;
    padding: 10px;
    height: 600px;
}

.create_service_right {
    border: solid 1px black;
    width: 50%;
    padding: 10px;
}

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
    height: 45%;
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
    width: 28%;
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