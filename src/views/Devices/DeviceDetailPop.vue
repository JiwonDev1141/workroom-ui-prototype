<template>
	<div id="deviceDetailPop" ref="deviceDetailPop">
		<div style="margin-bottom: 15px">
			<button class="p-0 btn btn-link text-dark fixed-plugin-close-button" style="position: absolute; right: 20px" @click="closeDetailePop">
				<i class="material-icons">clear</i>
			</button>
			<h5>디바이스 상세정보</h5>
			<div class="input-area">
				<span>상태 </span>
				<span v-if="state.deviceInfo.deviceStatusCode" class="badge badge-sm bg-gradient-success"> 사용중 </span>
				<span v-if="!state.deviceInfo.deviceStatusCode" class="badge badge-sm bg-gradient-success"> 미사용중 </span>
			</div>
			<!-- { 

                "deviceId": "c3163f072f50745a", 
                "deviceNumber": "010-1111-1111", 
                "deviceType": "Watch", 
                "deviceStatusCode": true,
                "companyId": "companyID", 
                "companyCode": "companyCode", 
                "companyName": "companyName", 
                "serviceCode": "serviceCode", 
                "serviceName": "serviceName", 
                "userId": "userId", 
                "userName": "userName", 
                "createdAt": "2022-02-18T16:46:43.000Z", 
                "createdUser": "admin", 
                "updatedAt": null, 
                "updatedUser": "", 
                "use": true 
                "firstTime": 1680752782710, 
                "_id": "64194772abe8c8d8a399dc7c", 
            } -->
		</div>

		<div style="width: 56px; position: absolute; right: 20px; z-index: 2">
			<MaterialButton
				full-width="false"
				variant="gradient"
				:text="state.editBtnText"
				size="sm"
				color="dark"
				@click="toggleEditMode"
			/>
		</div>
		<div>
			<form ref="formData" style="display: flex; flex-direction: column; width: 100%" @submit.prevent="submitForm()">
				<!-- <MaterialAvatar :img="state.item[i].deviceLogo" /> -->
				<div class="input-area">
					<span>식별번호</span>
					<MaterialInput id="deviceId" type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.deviceId" :value="state.deviceInfo.deviceId" />
				</div>
				<div class="input-area">
					<span>전화번호</span>
					<MaterialInput id="deviceNumber" type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.deviceNumber" :value="state.deviceInfo.deviceNumber" />
				</div>
				<div class="input-area">
					<span>유형</span>
					<!-- <MaterialInput id="deviceType" type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.deviceType" :value="state.deviceInfo.deviceType" /> -->
					<select id="deviceType">
						<option v-for="option in state.options" id="deviceType" :key="option" :value="option" :selected="option === state.deviceInfo.deviceType">
							{{ option }}
						</option>
					</select>
				</div>

				<div v-if="state.deviceInfo.deviceStatusCode">
					<div class="input-area">
						<span>기업명 : </span>
						<span>{{ state.deviceInfo.companyName }}</span>
					</div>
					<div class="input-area">
						<span>서비스명 : </span>
						<span>{{ state.deviceInfo.serviceName }}</span>
						<!-- <MaterialInput type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.serviceName" /> -->
					</div>
					<div class="input-area">
						<span>사용자 ID : </span>
						<span>{{ state.deviceInfo.userId }}</span>
						<!-- <MaterialInput type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.userId" /> -->
					</div>
					<div class="input-area">
						<span>사용자 이름 : </span>
						<span>{{ state.deviceInfo.userName }}</span>
						<!-- <MaterialInput type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.userName" /> -->
					</div>
					<div class="input-area">
						<span>등록일 : </span>
						<span>{{ state.deviceInfo.createdAt }}</span>
						<!-- <MaterialInput type="text" :disabled="!state.isEditMode" :placeholder="state.deviceInfo.createdAt" /> -->
					</div>
				</div>
				<MaterialButton
					class="deleteButton"
					full-width="false"
					variant="gradient"
					text="삭제"
					size="sm"
					color="dark"
					@click="submitForm('삭제')"
				/>
			</form>
		</div>
	</div>
</template>

<script>
import { reactive, ref } from 'vue';
import MaterialInput from '../../components/MaterialInput.vue';
import MaterialButton from '../../components/MaterialButton.vue';
import { deleteDevice, editDevice } from '../../apis/deviceApis';

// 디바이스 상세 / 수정 팝업
export default {
    name: 'DeviceDetail',
    components: {
        // MaterialAvatar,
        MaterialInput,
        MaterialButton,
    },
    props: {
        deviceInfo: Object,
        closeDetailePop: Function,
    },

    setup(props) {
        const state = reactive({
            deviceInfo: props.deviceInfo,
            isEditMode: false,
            editBtnText: '수정',
            options: {
                W: 'watch',
                G: 'gateway',
            },
        });

        const formData = ref();

        const submitForm = (mode) => {
            if (mode == '저장') {
                console.log('저장 target 확인 :', formData.value);

                const deviceEditForm = {
                    docId: state.deviceInfo._id,
                    deviceId: formData.value.deviceId.value == '' ? state.deviceInfo.deviceId : formData.value.deviceId.value,
                    deviceNumber: formData.value.deviceNumber.value == '' ? state.deviceInfo.deviceNumber : formData.value.deviceNumber.value,
                    deviceType: formData.value.deviceType.value == '' ? state.deviceInfo.deviceType : formData.value.deviceType.value,
                };

                editDevice(deviceEditForm)
                    .then(({ data }) => {
                        console.log(data);
                        if (data.result === true) {
                            alert('디바이스 수정 성공!');
                            props.closeDetailePop();
                        } else {
                            alert(data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else if (mode == '삭제') {
                const deviceInfo = state.deviceInfo;
                const res = prompt(`${deviceInfo._id}정말 삭제 하시나요?`, '네');
                if (res == '네') {
                    deleteDevice(deviceInfo._id)
                        .then(({ data }) => {
                            console.log(data);
                            if (data.result === true) {
                                alert('디바이스 삭제 성공!');
                                props.closeDetailePop();
                            } else {
                                alert(data.data);
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }
        };

        const toggleEditMode = () => {
            if (state.isEditMode && state.editBtnText == '저장') {
                submitForm(state.editBtnText);
            }
            state.isEditMode = !state.isEditMode;
            state.editBtnText = state.isEditMode ? '저장' : '수정';
        };

        return {
            state,
            formData,
            submitForm,
            toggleEditMode,
        };
    },
    methods: {},
};
</script>

<style scoped>
.deleteButton {
    margin-top: 50px;
}

.input-area {
    margin: 5px 0 5px 0;
}

#deviceDetailPop {
    width: 400px;
    height: fit-content;
    overflow-x: hidden;
    z-index: 0;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    border: solid 0px;
    padding: 15px;
}
</style>
