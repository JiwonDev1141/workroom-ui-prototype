<template>
	<thead>
		<tr>
			<th v-for="(title, index) of list" :key="index" class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
				{{ title }}
			</th>
		</tr>
	</thead>
</template>
  
<script>

import { reactive , watch } from "vue";



// 목록 테이블의 분류 항목
export default {
    name: "TableHead",
    components: {},
    props: {
        list: Array
    },
    setup(props) {


        const state = reactive({

        });

        watch(() => props.show, () => {

        }, { deep: true });



        return {

            state,
            props
        };

    }
};
</script>
<style scoped></style>