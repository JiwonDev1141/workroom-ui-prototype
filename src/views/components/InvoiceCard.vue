<template>
	<div class="card mt-2">
		<div class="card-header pb-0 p-3">
			<div class="row">
				<div class="col-6 d-flex align-items-center">
					<h6 class="mb-0">
						{{ title }}
					</h6>
				</div>
				<div class="col-6 text-end">
					<!-- <material-button color="primary" size="sm" variant="outline"
            >{{ buttonText }}</material-button
          > -->

          
					<material-button color="dark" variant="gradient" size="sm">
						<!-- <i class="fas fa-plus me-0"></i> -->
            
						{{ buttonText }}
					</material-button>
				</div>
			</div>
		</div>
		<div class="card-body p-3 mb-0">
			<ul class="list-group">
				<li
					v-for="(json, index) in list"
					:key="index"
					class="list-group-item border-0 d-flex justify-content-between ps-0 mb-0 border-radius-lg"
					style="padding: 20px;"
				>
					<div class="d-flex flex-column">
						<h6 class="mb-0 text-dark font-weight-bold text-sm">
							{{ json.name }}
						</h6>
						<span class="text-xs">{{ json.description }}</span>
					</div>
					<div class="d-flex align-items-center text-sm">
						<button class="btn btn-link text-dark text-sm mb-0 px-0 ms-4 " style="width: 50px;">
							<i class="fas fa-trash-alt"></i>
							제거
						</button>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";

export default {
  name: "InvoiceCard",
  components: {
    MaterialButton,
  },
  props: {
    title: {
      type: String,
      default: "Title"
    },
    buttonText: {
      type: String,
      default: "+"
    },
    list: {
      type: Array,
      default: () => [
        {
          name: "제주 해녀",
          description: ""
        },
        {
          name: "미르 메타케어",
          description: ""
        }
      ]
    }
  }
};
</script>
