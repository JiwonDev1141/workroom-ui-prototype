<template>
	<div class="card mt-4 mb-2">
		<div class="card-header pb-0 p-3">
			<div class="row">
				<div class="col-6 d-flex align-items-center">
					<h6 class="mb-0">
						{{ title }}
					</h6>
				</div>
				<div class="col-6 text-end">
					<material-button color="dark" variant="gradient" size="sm">
						<!-- <i class="fas fa-plus me-0"></i> -->
						{{ buttonText }}
					</material-button>
				</div>
			</div>
		</div>
		<div class="card-body p-3">
			<div class="row">
				<!-- <div v-for="(value, index) in list" :key="index" class="col-md-6 mb-md-0 mb-4">
          <div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
            <img class="w-10 me-3 mb-0" :src="value.imgSrc" alt="logo" />
            <h6 class="mb-0">
              ****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;****&nbsp;&nbsp;&nbsp;7852
            </h6>
            <i class="fas fa-pencil-alt ms-auto text-dark cursor-pointer" data-bs-toggle="tooltip"
              data-bs-placement="top" title aria-hidden="true" data-bs-original-title="Edit Card"
              aria-label="Edit Card"></i>
            <span class="sr-only">Edit Card</span>
          </div>
        </div> -->

				<div v-for="(json, index) in list" :key="index">
					<div class="col-md-12">
						<div class="card card-body border card-plain border-radius-lg d-flex align-items-center flex-row">
							<img class="w-10 me-3 mb-0" :src="json.imgSrc" alt="logo" />
							<h6 class="mb-0">
								{{ json.name }}
							</h6>
							<i
								class="fas fa-pencil-alt ms-auto text-dark cursor-pointer"
								data-bs-toggle="tooltip"
								data-bs-placement="top"
								title
								aria-hidden="true"
								data-bs-original-title="Edit Card"
								aria-label="Edit Card"
							></i>
							<span class="sr-only">Edit Card</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import MaterialButton from "@/components/MaterialButton.vue";
import img1 from "@/assets/img/logos/mastercard.png";
import img2 from "@/assets/img/logos/visa.png";

export default {
  name: "PaymentCard",
  components: {
    MaterialButton,
  },
  props: {
    title: {
      type: String,
      default: "Payment Method"
    },
    buttonText: {
      type: String,

    },
    list: {
      type: Array,
      default: () => {
        [
          {
            imgSrc: "",
            name: "Text"
          }
        ]
      }
    }
  },
  data() {
    return {
      img1,
      img2,
    };
  },
};
</script>
