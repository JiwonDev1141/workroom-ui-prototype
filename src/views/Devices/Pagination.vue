<template>
	<div class="pasinationsection">
		<div class="pagination-btn">
			<button v-if="buttonDisplay" class="pagination-btn" :disabled="previousButtonDisabled" @click="previousButtonClick">
				이전
			</button>
		</div>
		<ul class="pagination__inner">
			<li v-for="number in pageList" :key="number" class="pagination__btn-con">
				<button type="button" :class="['pagination__btn', { 'is-active': value === number }]" @click="change(number)">
					{{ number }}
				</button>
			</li>
		</ul>
		<button v-if="buttonDisplay" :class="['pagination-btn', { 'is-disabled': nextButtonDisabled }]" :disabled="nextButtonDisabled" @click="nextButtonClick">
			다음
		</button>
	</div>
</template>

<script>
import { computed } from 'vue';
export default {
    props: {
        // 현재 페이지
        value: {
            type: Number,
            default: 1,
        },
        // 총 페이지
        totalPageCount: {
            type: Number,
            default: 5,
        },
        // 보여줄 페이지 수
        pageDisplayCount: {
            type: Number,
            default: 5,
        },
        setPage: Function,
    },
    computed: {},
    setup(props) {
        // 총 페이지가 5개 이하면 이전/다음 버튼을 보여주지 않음
        const buttonDisplay = computed(() => props.totalPageCount > 5);
        // 현재 페이지의 그룹 번호 (현재 페이지 / 보여줄 페이지의 수)
        const currentPageGroup = computed(() => Math.ceil(props.value / props.pageDisplayCount));
        // 마지막 페이지 번호
        const lastPageNumber = computed(() => {
            const lastNumber = currentPageGroup.value * props.pageDisplayCount;
            if (lastNumber > props.totalPageCount) {return props.totalPageCount;}
            return lastNumber;
        });
        // 첫번째 페이지 번호
        const firstPageNumber = computed(() => {
            // 끝 번호가 26,27 이렇게 끝날 경우 페이지를 [26,27] 이렇게 보여줘야 하기에 존재하는 로직
            if (lastPageNumber.value == props.totalPageCount) {
                const multipleOfPageDisplayCount = lastPageNumber.value % props.pageDisplayCount === 0;
                return multipleOfPageDisplayCount ? lastPageNumber.value - props.pageDisplayCount + 1 : lastPageNumber.value - (lastPageNumber.value % props.pageDisplayCount) + 1;
            }
            return lastPageNumber.value - (props.pageDisplayCount - 1);
        });
        // 페이지 리스트 (pageDisplayCount가 5일 경우 [1~5], [6~10]...)
        const pageList = computed(() => {
            const list = [];
            for (let i = firstPageNumber.value; i <= lastPageNumber.value; i++) {
                list.push(i);
            }
            return list;
        });
        // 다음 버튼 비활성화 조건
        const nextButtonDisabled = computed(() => lastPageNumber.value >= props.totalPageCount);
        // 이전 버튼 비활성화 조건
        const previousButtonDisabled = computed(() => firstPageNumber.value <= 1);
        // 사용자가 번호를 변경하는 경우 상위 컴포넌트로 값 전달
        const change = (clickNumber) => {
            if (clickNumber === props.value) {return false;}
            props.setPage(clickNumber);
        };
        // 이전 버튼 클릭 시 이전 페이지의 첫번째 값으로 설정
        const previousButtonClick = () => {
            props.setPage(firstPageNumber.value - props.pageDisplayCount);
        };
        // 다음 버튼 클릭 시 이후 페이지의 첫번째 값으로 설정
        const nextButtonClick = () => {
            props.setPage(lastPageNumber.value + 1);
        };
        return {
            nextButtonClick,
            previousButtonClick,
            change,
            pageList,
            buttonDisplay,
            nextButtonDisabled,
            previousButtonDisabled,
            firstPageNumber,
            lastPageNumber,
            currentPageGroup,
        };
    },
};
</script>

<style>
.pasinationsection {
    display: flex;
    width: 800px;
    height: 70px;
    background-color: transparent;
}
.pagination__inner {
    display: flex;
    height: 5vh;
    padding: 0px;
    margin-top: 3px;
}
.pagination__btn-con {
    margin: 5px;
    list-style-type: none;
}
.pagination__btn {
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background-color: transparent;
}
.is-active {
    background-color: rgb(0, 0, 0);
    color: white;
}
.pagination-btn {
    width: 5vw;
    height: 100%;
    border: none;
    background-color: transparent;
}
</style>
