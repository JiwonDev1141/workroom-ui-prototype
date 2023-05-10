<template>
	<div
		id="setting_detailpop"
		style="width: 400px;overflow-x: hidden; z-index: 0; background-color: rgba(255, 255, 255, 1); box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; border-radius: 10px; border: solid 0px; padding: 15px 15px 40px 15px; "
	>
		<div style="margin-bottom: 15px">
			<button
				class="p-0 btn btn-link text-dark fixed-plugin-close-button"
				style="position: absolute; right: 20px"
				@click="setshow(false)"
			>
				<i class="material-icons">clear</i>
			</button>
			<h5>{{ settingInfo.settingCategory }}</h5>
		</div>


		<div>
			<div>
				<div v-for="(service, index) in settingInfo.datas" :key="index" class="service_cantainer">
					<div class="col-md-12">
						<div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
							<img class="w-10 me-3 mb-0" src="/img/jejuhanyeo_logo.png" alt=" logo" />
							<h6 class="mb-0">
								{{ service.serviceName }}
							</h6>
							<i
								class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title
								aria-hidden="true"
								data-bs-original-title="Edit Card"
								aria-label="Edit Card"
								@click="serviceDetail(service)"
							></i>
							<button class="deleteservice" type="button" @click="deleteService(service)">
								삭제
							</button>

							<span class="sr-only">Edit Card</span>
						</div>
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
			@click="addService"
		/>
	</div>
	<ModalContainer v-if="state.showCheckPop == true">
		<CheckPop :handle-select="setState" />
	</ModalContainer>
</template>

<script>

import { reactive } from "vue";
import MaterialButton from "../../components/MaterialButton.vue";
import { removeService } from "../../apis/settingApi";
import CheckPop from "../components/custom/CheckPop.vue";
import ModalContainer from "../components/custom/ModalContainer.vue";




export default {
    components: { MaterialButton, CheckPop, ModalContainer },
    props: {
        settingInfo: Object,
        setshow: Function,
        setitems: Function,
        addService: Function,
        serviceDetail: Function,

    },
    methods: {
    },

    setup(props) {
        const state = reactive({
            showCheckPop: false,
            selectedButton: false,
            serviceCode: "",
        });

        const deleteService = (service) => {
            state.showCheckPop = true;
            if (state.selectedButton == false) {
                state.serviceCode = service.serviceCode
            }
            console.log(state.serviceCode)
            if (state.selectedButton == true) {
                removeService({ docId: "6438a8a7870e6d054b730047", serviceCode: state.serviceCode }).then(() => {
                    props.setshow(false);
                    props.setitems();
                })
            }
        }
        const setState = (newstate) => {
            state.selectedButton = newstate;
            state.showCheckPop = false;
            if (state.selectedButton == true) {
                deleteService()
            }
        }


        return {
            deleteService,
            state,
            props,
            setState,
        };
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

.checkpop_container {
    position: absolute;
    top: 44%;
    left: -33%;
    z-index: 50;
}

.deleteservice {
    margin: 0px 0 0 10px;
}
</style>
