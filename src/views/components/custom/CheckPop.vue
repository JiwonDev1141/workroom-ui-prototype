<template>
	<div class="checkpop">
		<div class="checkpop_title ">
			{{ title }}
		</div>
		<div class="checkpop_content ">
			{{ content }}
		</div>
		<div class="checkpop_button_area ">
			<button class="checkpop_button" @click="agree">
				{{ Yes }}
			</button>
			<button class="checkpop_button" @click="disagree">
				{{ No }}
			</button>
		</div>
	</div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: "Delete Tenant",
        },
        content: {
            type: String,
            default: " you're going to delete the tenant Project. Are you sure?",
        },
        Yes: {
            type: String,
            default: "Yes",
        },
        No: {
            type: String,
            default: "No",
        },
        handleSelect: {
            type: Function,
        }
    },
    setup(props) {
        const disagree = () => {
            props.handleSelect(false);
        };
        const agree = () => {
            props.handleSelect(true);
        };
        return {
            disagree,
            agree,
        };
    },
}
</script>

<style scoped>
.checkpop_title {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    font-weight: 600;
    font-size: 20px;
}

.checkpop_content {
    width: 80%;
    height: 42%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: black;
}

.checkpop_button_area {
    width: 100%;
    height: 33%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.checkpop_button {
    width: 40%;
    height: 70%;
    margin: 10px;
    border-radius: 30px;
    border: none;
    background-color: rgb(255, 99, 99);
    color: white;
}

.checkpop_button:last-child {
    background-color: rgb(224, 224, 224);
    color: black;
}

.checkpop {
    width: 20vw;
    height: 22vh;
    position: absolute;
    border-radius: 20px;
    z-index: 50;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: solid 1px black;
    background-color: rgb(255, 255, 255);
}
</style>