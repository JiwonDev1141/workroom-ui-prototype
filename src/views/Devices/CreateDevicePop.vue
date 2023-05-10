<template>
	<div id="createDevicePop">
		<div style="margin-bottom: 15px">
			<button class="p-0 btn btn-link text-dark fixed-plugin-close-button" style="position: absolute; right: 20px" @click="closeCreatePop">
				<i class="material-icons">clear</i>
			</button>
			<h5>디바이스 추가</h5>
		</div>

		<div>
			<!-- 
                기기식별번호	deviceId - O
                전화번호	deviceNumber - O
                유형	deviceType - O
                기업ID	companyID
                기업 코드	companyCode
                기업명	companyName
                서비스 코드	serviceCode
                서비스명	serviceName
                사용자 ID	userId
                사용자 이름	userName
                생성일	createdAt - O
                생성관리자	createdUser
                수정일	updatedAt 
                수정관리자	updatedUser
                상태 (기기 사용 / 미사용 여부)	use - O
            -->
			<form ref="formData" role="form" style="display: flex; flex-direction: column; width: 100%" @submit.prevent="submitDevice">
				<!-- <MaterialAvatar img="deviceList[0].deviceLogo" /> -->
				<div class="input-area">
					<span>기기식별번호</span>
					<MaterialInput id="deviceId" type="text" placeholder="device Id" />
				</div>

				<div class="input-area">
					<span>전화번호</span>
					<MaterialInput id="deviceNumber" type="text" placeholder="device Number" />
				</div>

				<span>유형</span>
				<div class="input-area">
					<!-- <MaterialInput id="deviceType" type="text" placeholder="W" /> -->
					<select id="deviceType">
						<option v-for="option in state.options" :key="option" :value="option">
							{{ option }}
						</option>
					</select>
				</div>
				<MaterialButton
					class="deletButton"
					full-width="false"
					variant="gradient"
					text="추가"
					size="sm"
					color="dark"
				/>
			</form>
		</div>
	</div>
	<div class="checkPopBg">
		<CheckPop v-if="state.showCheckPop == true" :handle-select="handleSelect" :modal="true" />
	</div>
</template>

<script>
import { ref, reactive } from 'vue';
import { postDevices } from '../../apis/deviceApis';
import MaterialInput from '../../components/MaterialInput.vue';
import MaterialButton from '../../components/MaterialButton.vue';
import CheckPop from './CheckPop.vue';
// import MaterialAvatar from '../../components/MaterialAvatar.vue';

// 디바이스 추가 팝업
export default {
    name: 'CreateDevicePop',

    components: {
        MaterialInput,
        MaterialButton,
        CheckPop,
        // MaterialAvatar,
    },

    props: {
        closeCreatePop: Function,
    },

    setup(props) {
        const state = reactive({
            options: {
                W: 'watch',
                G: 'gateway',
            },
            selectedButton: false, //확인 팝업에서 누른 버튼
            showCheckPop: false,
        });

        const formData = ref();

        const handleSelect = (selected) => {
            state.selectedButton = selected;
            state.showCheckPop = false;
            if (state.selectedButton == true) {
                submitDevice();
            }
        };

        const submitDevice = () => {
            state.showCheckPop = true;
            if (state.selectedButton) {
                const deviceCreateForm = {
                    deviceId: formData.value.deviceId.value,
                    deviceNumber: formData.value.deviceNumber.value,
                    deviceType: formData.value.deviceType.value,
                };

                postDevices(deviceCreateForm)
                    .then(({ data }) => {
                        // console.log(data);
                        if (data.result === true) {
                            // alert('디바이스 추가 성공!');
                            state.showCheckPop = false;
                            props.closeCreatePop();
                        } else {
                            alert(data.data);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        return {
            state,
            formData,
            handleSelect,
            submitDevice,
        };
    },
};
</script>
<style scoped>
.deleteButton {
    margin-top: 50px;
}

.input-area {
    margin: 5px 0 5px 0;
}

#createDevicePop {
    width: 400px;
    height: 50vh;
    overflow-x: hidden;
    z-index: 0;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 10px;
    border: solid 0px;
    padding: 15px;
}
.checkPopBg {
    position: absolute;
    top: 30%;

    z-index: 50;
}
</style>
