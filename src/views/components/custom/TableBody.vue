<template>
	<!-- 
            직급 / 등급
            관리자 여부
            사용기기
            생년월일
            기업 ID
            기업 코드
            서비스 ID
            서비스 코드
            소속 그룹
            프로필 이미지
            수정일
            계정 활성화 / 비활성화 여부
            유저 index number 
        -->

        
        
	<td v-for="({ name, description, isBoolean = false, booleanText }, index) of list" :key="index" class="align-middle text-sm">
		<div>
			<p v-if="isBoolean === false" class="text-xs font-weight-bold mb-0">
				{{ name }}
			</p>
			<p v-if="isBoolean === false" class="text-xs text-secondary mb-0">
				{{ description }}
			</p>
			<span v-if="isBoolean === true" class="badge badge-sm bg-gradient-success">{{ booleanText ? booleanText : "TRUE" }}</span>
		</div>
	</td>
   
            
       
        
	<!-- <td>
                <p class="text-xs font-weight-bold mb-0">010-2180-1691</p>
                <p class="text-xs text-secondary mb-0">Organization</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">2022-10-05
                    11:58:46</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user" @click="showDetail">
                    상세 보기
                </a>
            </td>
        </tr>

        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../assets/img/team-3.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user2" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Alexa Liras</h6>
                        <p class="text-xs text-secondary mb-0">
                            alexa@creative-tim.com
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">Programator</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-secondary">Offline</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">11/01/19</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    상세 보기
                </a>
            </td>
        </tr>

        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user3" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Laurent Perrier</h6>
                        <p class="text-xs text-secondary mb-0">
                            laurent@creative-tim.com
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">Executive</p>
                <p class="text-xs text-secondary mb-0">Projects</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">19/09/17</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    상세 보기
                </a>
            </td>
        </tr>

        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../assets/img/team-3.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user4" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Michael Levi</h6>
                        <p class="text-xs text-secondary mb-0">
                            michael@creative-tim.com
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">Programator</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-success">Online</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">24/12/08</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    상세 보기
                </a>
            </td>
        </tr>

        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../assets/img/team-2.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user5" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Richard Gran</h6>
                        <p class="text-xs text-secondary mb-0">
                            richard@creative-tim.com
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">Manager</p>
                <p class="text-xs text-secondary mb-0">Executive</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-secondary">Offline</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">04/10/21</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    상세 보기
                </a>
            </td>
        </tr>

        <tr>
            <td>
                <div class="d-flex px-2 py-1">
                    <div>
                        <img src="../assets/img/team-4.jpg" class="avatar avatar-sm me-3 border-radius-lg" alt="user6" />
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">Miriam Eric</h6>
                        <p class="text-xs text-secondary mb-0">
                            miriam@creative-tim.com
                        </p>
                    </div>
                </div>
            </td>
            <td>
                <p class="text-xs font-weight-bold mb-0">Programator</p>
                <p class="text-xs text-secondary mb-0">Developer</p>
            </td>
            <td class="align-middle text-center text-sm">
                <span class="badge badge-sm bg-gradient-secondary">Offline</span>
            </td>
            <td class="align-middle text-center">
                <span class="text-secondary text-xs font-weight-bold">14/09/20</span>
            </td>
            <td class="align-middle">
                <a href="javascript:;" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip"
                    data-original-title="Edit user">
                    상세 보기
                </a>
            </td> -->
</template>
  
<script>

import { reactive } from "vue";

import { watch} from "vue";
import { ref } from 'vue'

// 목록 테이블의 분류 항목
export default {
    name: "TableBody",
    components: {},
    props: {
        list: Array
    },
    setup(props) {
  
        const document = ref(window.document);
        const state = reactive({

        });

        watch(() => props.show, () => {

        }, { deep: true });

        const parseToHTML = (string) => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(string, 'text/html');
            return doc
        }

        return {
            document,
            state,
            props,
            parseToHTML
        };

    }
};
</script>
<style scoped></style>