<template>
	<div class="bg-white">
		<div class="container top-0 position-sticky z-index-sticky">
			<div class="row">
				<div class="col-12">
					<navbar
						is-blur="blur my-3 py-2 mt-4 start-0 end-0 mx-4 shadow blur border-radius-lg"
						btn-background="bg-gradient-success"
						:dark-mode="true"
					/>
				</div>
			</div>
		</div>
		<main class="mt-0 main-content">
			<section>
				<div class="page-header min-vh-100">
					<div class="container">
						<div class="row">
							<div
								class="col-6 d-lg-flex d-none h-100 my-auto pe-0 ps-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
							>
								<div
									class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
									:style="{
										backgroundImage: 'url(' + '/img/meta_signup.png' + ')',
									}"
									style="
                    background-repeat: no-repeat;
                    height: 100%;
                    background-size: cover;
                  "
								></div>
							</div>
							<div
								class="col-xl-4 col-lg-5 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
							>
								<div class="card card-plain">
									<div class="pb-0 card-header bg-transparent mb-4">
										<h4 class="font-weight-bolder">
											회원가입
										</h4>
										<p class="mb-0">
											가입을 위해 이메일과 패스워드를 입력해주세요.
										</p>
									</div>
									<div class="card-body">
										<form role="form" @submit.prevent="submitSignUp">
											<div class="mb-3">
												<material-input
													id="name"
													type="text"
													label="Name"
													name="username"
													size="lg"
												/>
											</div>
											<div class="mb-3">
												<material-input
													id="email"
													type="email"
													label="Email"
													name="email"
													size="lg"
												/>
											</div>
											<div class="mb-3">
												<material-input
													id="password"
													type="password"
													label="Password"
													name="password"
													size="lg"
												/>
											</div>
											<div class="mb-3">
												<material-input
													id="password2"
													type="password"
													label="Verify Password"
													name="password2"
													size="lg"
												/>
											</div>
											<material-checkbox
												id="flexCheckDefault"
												color="success"
												class="font-weight-light"
												checked
											>
												<a
													href="../../../pages/privacy.html"
													class="text-dark font-weight-bolder"
												>이용 약관</a>
												에 동의합니다
											</material-checkbox>
											<div class="text-center">
												<material-button
													class="mt-4"
													variant="gradient"
													color="success"
													full-width
													size="lg"
												>
													회원가입
												</material-button>
											</div>
										</form>
									</div>
									<div class="px-1 pt-0 text-center card-footer px-lg-2">
										<p class="mx-auto mb-4 text-sm">
											계정이 있으신가요?
											<router-link
												:to="{ name: 'SignIn' }"
												class="text-success text-gradient font-weight-bold"
											>
												로그인
											</router-link>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</main>
	</div>
</template>

<script>
import { mapMutations } from "vuex";
import { postSignUp } from "../apis/authApis";
import router from "../router";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialCheckbox from "@/components/MaterialCheckbox.vue";
import MaterialButton from "@/components/MaterialButton.vue";
const body = document.getElementsByTagName("body")[0];

export default {
  name: "SignUp",
  components: {
    Navbar,
    MaterialInput,
    MaterialCheckbox,
    MaterialButton,
  },
  beforeMount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.toggleEveryDisplay();
    this.toggleHideConfig();
    body.classList.add("bg-gray-100");
  },
  methods: {
    ...mapMutations(["toggleEveryDisplay", "toggleHideConfig"]),

    submitSignUp: (e) => {
      postSignUp({
        email: e.target.email.value,
        password: e.target.password.value,
        password2: e.target.password2.value,
        username: e.target.username.value,
      })
        .then(({ data }) => {
          console.log(data);

          if (data.result === true) {
            alert("회원가입 완료!");
            router.push("sign-in");
          } else {
            alert(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
