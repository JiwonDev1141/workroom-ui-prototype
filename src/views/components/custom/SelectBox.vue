<template>
	<Select class="combo_boxs " :required="required" :disabled="disabled">
		<option :value="Initialvalue">
			{{ initialValue }}
		</option>
		<option v-for="(item, index) in inputValue" :key="index" :value="outputValue[index]">
			{{ inputValue[index] }}
		</option>
	</Select>
</template>

<script>
export default {
    props: {
        initialValue: {
            type: String,
            default: "선택",
        },
        required: {
            type: String,
            default: "",
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        outputValue: Array,        
        inputValue: Array,
    },
}
</script>

<style scoped>
Select :first-child {
    display: none;
}

.combo_boxs:focus {
    border-color: rgb(149, 255, 0)
}

.combo_boxs {
    padding: 8px 5px;
    color: rgba(0, 0, 0);
    border: solid 1px rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    width: 99.9%;
}

.combo_boxs[disabled] {
    cursor: not-allowed;
}
</style>